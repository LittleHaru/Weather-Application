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

export async function getGeocodeData(searchName) {
    const params = new URLSearchParams({
        name: searchName,
        count: 10,
        language: 'en',
        format: 'json'
    });

    const url = `https://geocoding-api.open-meteo.com/v1/search?${params}`

    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json()

        if(!data.results) {
            console.warn(`No Location Found for: ${searchName}`);
            return []
        }
        return await data.results;

    } catch (error) {
        showErrorMessage(`Search error: ${error}`)
        throw error
    }
}

export async function getReverseGeocode(lat, long) {
    try {
        const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
        );
        if (!response.ok) throw new Error("Reverse Geocode Fail");
        const data = await response.json()
        console.log(data)

        return {
            name: data.city || data.locality || "Unknown Location",
            country: data.countryName
        };
    } catch (error) {
        console.error("Reverse Geocode error:", error)
        return null;
    }
}   
