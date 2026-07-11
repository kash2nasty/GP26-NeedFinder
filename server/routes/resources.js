import { Router } from 'express';
import { resources } from '../data/resources.js';

const router = Router();

router.get('/', (req, res) => {
  const { state, city, category } = req.query;

  let filtered = [...resources];

  if (state) {
    filtered = filtered.filter(r =>
      r.state.toLowerCase() === state.toLowerCase()
    );
  }

  if (city) {
    filtered = filtered.filter(r =>
      r.city.toLowerCase().includes(city.toLowerCase()) ||
      r.county.toLowerCase().includes(city.toLowerCase())
    );
  }

  if (category) {
    filtered = filtered.filter(r => r.category === category);
  }

  res.json({ success: true, resources: filtered });
});

router.get('/nearby', (req, res) => {
  const { lat, lng, state, limit = 20 } = req.query;

  let filtered = state
    ? resources.filter(r => r.state.toLowerCase() === state.toLowerCase())
    : [...resources];

  if (lat && lng) {
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    filtered = filtered
      .map(r => ({
        ...r,
        distance: haversineDistance(userLat, userLng, r.lat, r.lng),
      }))
      .sort((a, b) => a.distance - b.distance);
  }

  res.json({
    success: true,
    resources: filtered.slice(0, parseInt(limit, 10)),
  });
});

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 3959;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

export default router;
