document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("gasolineras");
    const form = document.getElementById("search-form");
    const mapSection = document.getElementById("map-section");

    // Inicializar el mapa con un centro genérico
    const map = L.map("map-section").setView([40.416775, -3.70379], 6); // Vista inicial en España

    // Cargar las baldosas del mapa
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Intentar obtener la ubicación del usuario al cargar
navigator.geolocation.getCurrentPosition(
    (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        // Centrar el mapa en la ubicación del usuario
        map.setView([userLat, userLon], 12);

        // Añadir un marcador para la ubicación del usuario
        L.marker([userLat, userLon])
            .addTo(map)
            .bindPopup("Tu ubicación"); // Aquí solo se enlaza el popup, no se abre automáticamente
    },
    (error) => {
        console.error("No se pudo obtener la ubicación del usuario:", error);
        alert("No se pudo obtener tu ubicación. Por favor, habilita la geolocalización en tu navegador.");
    }
);


    // Función para calcular distancia usando la fórmula de Haversine
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radio de la Tierra en km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const distance = parseFloat(document.getElementById("distance").value);
        if (isNaN(distance) || distance <= 0) {
            alert("Por favor, introduce un radio válido en kilómetros.");
            return;
        }

        container.innerHTML = "<p>Cargando datos de las gasolineras...</p>";

        try {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;

                map.setView([userLat, userLon], 12);

                const response = await fetch(
                    "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/"
                );
                const data = await response.json();

                if (!data || !data.ListaEESSPrecio) {
                    container.innerHTML = "<p>Error al obtener los datos de la API.</p>";
                    return;
                }

                map.eachLayer((layer) => {
                    if (layer instanceof L.Marker) map.removeLayer(layer);
                });

                const bounds = [];
                const gasolineras = data.ListaEESSPrecio
                    .map((gasolinera) => {
                        const lat = parseFloat(gasolinera["Latitud"].replace(",", "."));
                        const lon = parseFloat(gasolinera["Longitud (WGS84)"].replace(",", "."));
                        const distancia = calculateDistance(userLat, userLon, lat, lon);

                        if (distancia <= distance) {
                            bounds.push([lat, lon]);
                        }

                        return {
                            ...gasolinera,
                            distancia,
                            precio: parseFloat(gasolinera["Precio Gasolina 95 E5"]?.replace(",", ".") || "NaN"),
                            lat,
                            lon,
                        };
                    })
                    .filter((g) => g.distancia <= distance && !isNaN(g.precio))
                    .sort((a, b) => a.precio - b.precio);

                container.innerHTML = "";

                if (gasolineras.length === 0) {
                    container.innerHTML = "<p>No se encontraron gasolineras en el radio especificado.</p>";
                    return;
                }

                gasolineras.forEach((gasolinera) => {
                    const nombre = gasolinera["Rótulo"];
                    const direccion = gasolinera["Dirección"];
                    const precio = gasolinera.precio.toFixed(2);
                    const distancia = gasolinera.distancia.toFixed(2);

                    // Añadir marcador al mapa
                    const marker = L.marker([gasolinera.lat, gasolinera.lon])
                        .addTo(map)
                        .bindPopup(`
                            <h3>${nombre}</h3>
                            <p><strong>Dirección:</strong> ${direccion}</p>
                            <p><strong>Precio Gasolina 95:</strong> ${precio} €/L</p>
                            <p><strong>Distancia:</strong> ${distancia} km</p>
                        `);

                    // Crear tarjeta con el botón "Cómo llegar"
                    const card = document.createElement("div");
                    card.className = "gasolinera-card";
                    card.innerHTML = `
                        <h2>${nombre}</h2>
                        <p><strong>Dirección:</strong> ${direccion}</p>
                        <p><strong>Precio Gasolina 95:</strong> ${precio} €/L</p>
                        <p><strong>Distancia:</strong> ${distancia} km</p>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=${gasolinera.lat},${gasolinera.lon}" 
                           target="_blank" 
                           class="btn-route">Cómo llegar</a>
                    `;
                    container.appendChild(card);
                });

                if (bounds.length > 0) {
                    const boundsLayer = L.latLngBounds(bounds);
                    map.fitBounds(boundsLayer, { padding: [20, 20] });
                }
            }, (error) => {
                container.innerHTML = "<p>No se pudo obtener tu ubicación. Por favor, habilita la geolocalización en tu navegador.</p>";
            });
        } catch (error) {
            container.innerHTML = "<p>Error al cargar los datos. Inténtalo más tarde.</p>";
            console.error("Error al consumir la API:", error);
        }
    });
});
