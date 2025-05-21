import { Router } from 'express';
const router = Router();
import { findOne } from '../models/Route';

router.get('/:route_id', async (req, res) => {
  try {
    const route = await findOne({ route_id: req.params.route_id });
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.json(route);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
