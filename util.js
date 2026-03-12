const weatherCodeToIcon = {
  0: 'icon-sunny',           
  1: 'icon-partly-cloudy',  
  2: 'icon-partly-cloudy',   
  3: 'icon-overcast',          
  45: 'icon-fog',
  48: 'icon-fog',
  51: 'icon-drizzle',
  53: 'icon-drizzle',
  55: 'icon-drizzle',
  61: 'icon-rain',
  63: 'icon-rain',
  65: 'icon-rain',
  71: 'icon-snow',      
  73: 'icon-snow',     
  75: 'icon-snow',     
  77: 'icon-snow',     
  80: 'icon-rain',      
  81: 'icon-rain',     
  82: 'icon-rain',      
  85: 'icon-snow',      
  86: 'icon-snow',      
  95: 'icon-storm',
  96: 'icon-storm',
  99: 'icon-storm',   
};

export function formatShortDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString([], {
      weekday: "short"
  });
}

export function getFullDate(dateString) {
  const date = dateString ? new Date(dateString) : new Date();
  const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date);
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date);
  return { day, weekday, month, year };
}


export function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    hour12: true
  });
}

export function weatherIconName(weatherCode, isDay) {
  const base = weatherCodeToIcon[weatherCode] || 'unknown';
  return isDay ? `${base}` : `${base}`;
}

export function getISODate(dateString = new Date()) {
  const offset = dateString.getTimezoneOffset();
  const localDate = new Date(dateString.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().split('T')[0];
}

export function getDayName(dateString) {
  const date = new Date(dateString + 'T00:00'); 
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
}

export function getSymbols(unitSettings) {
  return {
    temp: unitSettings.temperature === 'celsius' ? '°C' : '°F',
    wind: unitSettings.windSpeed === 'kmh' ? 'km/h' : 'mph',
    precip: unitSettings.percipitation === 'mm' ? 'mm' : 'inch'
  }
}

export function getCoordinatesFromLocation(data) {
  if (!data || !Array.isArray(data) || data.length === 0) return null;
    const firstResult = data[0]
    return {
      lat: firstResult.latitude,
      long: firstResult.longitude,
    };
}

export function getNameFromLocation(data) {
  if (!data || !Array.isArray(data) || data.length === 0) return null;
    const firstResult = data[0]
    return {
      country: firstResult.country,
      name: firstResult.name
    };
}
