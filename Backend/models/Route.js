import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
    route_id: { type: String, required: true },
    route_name: { type: String, required: true },
    route_short_name: { type: String, required: false },
    route_type: { type: String, required: true },
    route_description: { type: String, required: false },
    busStops: [{ name: String, position: [Number] }],
});

const Route = mongoose.model('Route', routeSchema, 'routedetails');

export default Route;
