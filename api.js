async function getWeatherData(lat, long) { //data provider
    const params = new URLSearchParams({
        latitude : lat,
        longitude : long,
        current: "temperature_2m,weather_code,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation",
        daily: "temperature_2m_max,temperature_2m_min,weather_code",
        timezone: 'auto'
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params}`;

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return await response.json()
    } catch (error) {
        showErrorMessage(`Fetch Erorr: ${error}`)
        throw error;
    }
}

async function updateDashboard(lat, long) { // orchestrator
    try {
        const data = await getWeatherData(lat,long)
        renderDailyWeather(data.daily)
        renderCurrent(data.current)
        renderCurrentInfo(data.current)
    } catch (error) {
        showErrorMessage(`Failed To Update Dashboard: ${error}`)
        throw error;
    }
}

updateDashboard(3.1292, 101.6165);


