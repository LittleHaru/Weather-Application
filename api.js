export async function getWeatherData(lat, long, tempUnit, windUnit, prepUnit) { //data provider
    const params = new URLSearchParams({
        latitude : lat,
        longitude : long,
        current: "temperature_2m,weather_code,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation",
        daily: "temperature_2m_max,temperature_2m_min,weather_code",
        hourly: "temperature_2m,weather_code",
        forecast_days: 7,
        timezone: 'auto',
        temperature_unit: tempUnit,
        wind_speed_unit: windUnit,
        precipitation_unit: prepUnit 
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


