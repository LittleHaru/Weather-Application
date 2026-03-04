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

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString([], {
        weekday: "short"
    });
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
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
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