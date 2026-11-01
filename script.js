const $ = id => document.getElementById(id);

function tick() {
  const d = new Date();
  $('clock').textContent = d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit' });
  const h = d.getHours();
  $('greet').textContent = h < 12? 'Good morning': h < 18? 'Good afternoon':'Good evening';

}

tick();
setInterval(tick, 1000);

async function weather(lat, lon) {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`);
    const {current: c} = await res.json();
    $('weather').textContent = `${Math.round(c.temperature_2m)}°C and wind ${Math.round(c.wind_speed_10m)} km/h`;
  } catch {
    $('weather').textContent = 'Not working :(';
  }
}
 
navigator.geolocation.getCurrentPosition(
  p=> weather(p.coords.latitude, p.coords.longitude), () => weather(-33.87, 151.21) //fallback random thing
);
 