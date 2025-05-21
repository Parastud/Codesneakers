const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const StopSchema = new mongoose.Schema({
  stop_code: String,
  stop_id: String,
  stop_lat: String,
  stop_lon: String,
  stop_name: String,
  zone_id: String,
});

const StopTimeSchema = new mongoose.Schema({
  trip_id: String,
  arrival_time: String,
  departure_time: String,
  stop_id: String,
  stop_sequence: String,
});

const Stop = mongoose.model('Stop', StopSchema);
const StopTime = mongoose.model('StopTime', StopTimeSchema);

router.get('/', async (req, res) => {
  const { stop_name } = req.query;

  if (!stop_name) {
    return res.status(400).json({ error: 'Stop name is required' });
  }

  try {
    const stop = await Stop.findOne({ stop_name: new RegExp(stop_name, 'i') });

    if (!stop) {
      return res.status(404).json({ error: 'Stop not found' });
    }

    const etaDetails = await StopTime.find({ stop_id: stop.stop_id });

    res.json(etaDetails);
  } catch (error) {
    console.error('Error fetching ETA details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
