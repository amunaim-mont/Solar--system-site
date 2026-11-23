const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const planets = [
  { name: 'Mercury', slug: 'mercury', type: 'Terrestrial planet', order: '01', color: '#a7a7a7', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg', description: 'The smallest planet and the closest to the Sun, Mercury is a cratered world of dramatic temperatures.', distanceFromSun: '57.9 million km', diameter: '4,879 km', radius: '2,439.7 km', mass: '3.3011 × 10²³ kg', gravity: '3.70 m/s²', day: '58.6 Earth days', year: '88 Earth days', moons: 0, atmosphere: 'A very thin exosphere of oxygen, sodium, hydrogen, helium, and potassium', temperature: '167°C average (day/night extremes: 430°C to −180°C)' },
  { name: 'Venus', slug: 'venus', type: 'Terrestrial planet', order: '02', color: '#e8b46a', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg', description: 'A cloud-shrouded planet with a runaway greenhouse effect, Venus is the hottest planet in the solar system.', distanceFromSun: '108.2 million km', diameter: '12,104 km', radius: '6,051.8 km', mass: '4.8675 × 10²⁴ kg', gravity: '8.87 m/s²', day: '243 Earth days', year: '224.7 Earth days', moons: 0, atmosphere: '96.5% carbon dioxide and 3.5% nitrogen, with sulfuric acid clouds', temperature: '464°C average surface temperature' },
  { name: 'Earth', slug: 'earth', type: 'Terrestrial planet', order: '03', color: '#3c88c6', image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg', description: 'Our home world is the only known planet with liquid surface oceans and life.', distanceFromSun: '149.6 million km', diameter: '12,742 km', radius: '6,371 km', mass: '5.9722 × 10²⁴ kg', gravity: '9.81 m/s²', day: '23.9 hours', year: '365.25 days', moons: 1, atmosphere: '78% nitrogen, 21% oxygen, and 1% other gases', temperature: '15°C average surface temperature' },
  { name: 'Mars', slug: 'mars', type: 'Terrestrial planet', order: '04', color: '#c75b39', image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg', description: 'The red planet is a cold desert world with volcanoes, canyons, polar ice, and a rich exploration history.', distanceFromSun: '227.9 million km', diameter: '6,779 km', radius: '3,389.5 km', mass: '6.4171 × 10²³ kg', gravity: '3.71 m/s²', day: '24.6 hours', year: '687 Earth days', moons: 2, atmosphere: '95.3% carbon dioxide, 2.7% nitrogen, and traces of argon', temperature: '−63°C average surface temperature' },
  { name: 'Jupiter', slug: 'jupiter', type: 'Gas giant', order: '05', color: '#d39b68', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg', description: 'The largest planet is a banded gas giant famous for its Great Red Spot and powerful magnetic field.', distanceFromSun: '778.5 million km', diameter: '139,820 km', radius: '69,911 km', mass: '1.8982 × 10²⁷ kg', gravity: '24.79 m/s²', day: '9.9 hours', year: '11.86 Earth years', moons: 95, atmosphere: 'Hydrogen and helium, with clouds of ammonia and water', temperature: '−110°C average cloud-top temperature' },
  { name: 'Saturn', slug: 'saturn', type: 'Gas giant', order: '06', color: '#e7c889', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg', description: 'Saturn is a pale gold gas giant encircled by the most spectacular ring system in the solar system.', distanceFromSun: '1.43 billion km', diameter: '116,460 km', radius: '58,232 km', mass: '5.6834 × 10²⁶ kg', gravity: '10.44 m/s²', day: '10.7 hours', year: '29.45 Earth years', moons: 146, atmosphere: 'Hydrogen and helium, with traces of methane and ammonia', temperature: '−140°C average cloud-top temperature' },
  { name: 'Uranus', slug: 'uranus', type: 'Ice giant', order: '07', color: '#7bd6dc', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg', description: 'An ice giant tipped dramatically on its side, Uranus rotates beneath a faint blue-green atmosphere.', distanceFromSun: '2.87 billion km', diameter: '50,724 km', radius: '25,362 km', mass: '8.6810 × 10²⁵ kg', gravity: '8.69 m/s²', day: '17.2 hours', year: '84 Earth years', moons: 28, atmosphere: 'Hydrogen, helium, and methane', temperature: '−195°C average cloud-top temperature' },
  { name: 'Neptune', slug: 'neptune', type: 'Ice giant', order: '08', color: '#467bd1', image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg', description: 'The most distant major planet, Neptune is a deep blue ice giant with the fastest winds known on a planet.', distanceFromSun: '4.50 billion km', diameter: '49,244 km', radius: '24,622 km', mass: '1.0241 × 10²⁶ kg', gravity: '11.15 m/s²', day: '16.1 hours', year: '164.8 Earth years', moons: 16, atmosphere: 'Hydrogen, helium, and methane', temperature: '−200°C average cloud-top temperature' }
];

const backgrounds = [
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2200&q=85',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2200&q=85',
  'https://images.unsplash.com/photo-1534791547706-6c7e6f7e72e2?auto=format&fit=crop&w=2200&q=85',
  'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=2200&q=85'
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => { res.locals.planets = planets; res.locals.currentPath = req.path; next(); });

app.get('/', (req, res) => res.render('home', { background: backgrounds[Math.floor(Math.random() * backgrounds.length)] }));
app.get('/planets', (req, res) => res.render('planets', { title: 'Planet Index' }));
app.get('/planet/:slug', (req, res) => {
  const planet = planets.find((item) => item.slug === req.params.slug);
  if (!planet) return res.status(404).render('404', { title: 'Planet not found' });
  res.render('planet', { planet });
});
app.get('/nasa', async (req, res) => {
  const endpoint = 'https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=2026-11-22';
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`NASA request failed: ${response.status}`);
    res.render('nasa', { pod: await response.json(), error: null });
  } catch (error) {
    res.render('nasa', { pod: { title: "NASA's Picture of the Day", date: '2026-11-22', explanation: 'NASA’s Picture of the Day is temporarily unavailable. Please try again shortly.' }, error: error.message });
  }
});

app.listen(PORT, () => console.log(`Solar System app running on port ${PORT}`));
