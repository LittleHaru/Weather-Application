async function getWeatherData(latitude, longitude) {
    const params = new URLSearchParams({
        latitude,
        longitude,
        daily: "temperature_2m_max,temperature_2m_min",
        timezone: 'auto'
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params}`;

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        renderWeather(data.daily)
    } catch (error) {
        console.error("Fetch error:", error)
    }
}

getWeatherData(52.52, 13.41);