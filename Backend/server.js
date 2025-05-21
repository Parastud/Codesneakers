import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import authMiddleware from './middleware/authMiddleware.js';
import crewRoutes from './routes/crew.js';
import path from 'path';
import http from 'http';
import { Server as SocketIO } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));

app.set('view engine', 'ejs');

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('send-location', (data) => {
        io.emit('receive-location', { id: socket.id, ...data });
    });

    socket.on('disconnect', () => {
        io.emit('user-disconnected', socket.id);
        console.log('User disconnected');
    });
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    code: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '10m' },
});

const OTP = mongoose.model('OTP', otpSchema);

const stopSchema = new mongoose.Schema({
    stop_code: String,
    stop_id: String,
    stop_lat: String,
    stop_lon: String,
    stop_name: String,
    zone_id: String,
});

const stopTimeSchema = new mongoose.Schema({
    trip_id: String,
    arrival_time: String,
    departure_time: String,
    stop_id: String,
    stop_sequence: String,
});

const Stop = mongoose.model('Stop', stopSchema);
const StopTime = mongoose.model('StopTime', stopTimeSchema);

const busStopSchema = new mongoose.Schema({
    name: String,
    location: {
        type: { type: String },
        coordinates: [Number],
    },
    routes: [String],
});

busStopSchema.index({ location: '2dsphere' });

const BusStop = mongoose.model('BusStop', busStopSchema);

const routeSchema = new mongoose.Schema({
    route_name: String,
    route_short_name: String,
    'Ticket fee': String,
    Conductor: String,
    Driver: String,
    route_type: String,
    route_description: String,
    bus_stops: [String],
    bus_id: String
});

const RouteDetails = mongoose.model('RouteDetails', routeSchema);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Failed to connect to MongoDB Atlas:", error.message);
        process.exit(1);
    }
};
connectDB();

app.get('/crew/trace', (_req, res) => {
    res.render('index');
});

app.use('/api/crew', crewRoutes);

app.get('/api/bus-stops/nearby', async (req, res) => {
    const { lat, lng, radius } = req.query;
    const maxDistance = parseFloat(radius) || 300;

    try {
        const busStops = await BusStop.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lng, lat], maxDistance / 6378.1],
                },
            },
        });
        res.json(busStops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/stops', async (req, res) => {
    const query = req.query.query;
  
    try {
      const stops = await Stop.find({ stop_name: { $regex: query, $options: 'i' } });
  
      if (!stops.length) {
        return res.status(404).json({ message: 'No bus stops found' });
      }
  
      res.json(stops);
    } catch (error) {
      console.error('Error fetching bus stops:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  

app.get('/api/eta', async (req, res) => {
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

app.get('/api/routes/:busId', async (req, res) => {
    try {
        const busId = req.params.busId;
        const route = await RouteDetails.findOne({ bus_id: busId });

        if (route) {
            res.json(route);
        } else {
            res.status(404).json({ message: 'No details found for this bus ID.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from the server.' });
    }
});

app.get('/api/routes/:route_short_name', async (req, res) => {
    try {
        const routeDetails = await RouteDetails.findOne({ route_short_name: req.params.route_short_name });
        if (!routeDetails) {
            return res.status(404).json({ message: 'Route not found' });
        }
        res.json(routeDetails);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: "Login Successfully", token });
        } else {
            res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already Registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "Successfully Registered" });
    } catch (error) {
        res.status(500).json({ message: "Signup failed", error: error.message });
    }
});

app.get("/Home", authMiddleware, (_req, res) => {
    res.status(200).json({ message: "Welcome to the home page" });
});

app.post("/api/forgot-password/request-otp", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
        const hashedOtp = await bcrypt.hash(otpCode, 10);

        const otp = new OTP({ email, code: hashedOtp });
        await otp.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${otpCode}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        res.status(500).json({ message: "Error sending OTP", error: error.message });
    }
});

app.post("/api/forgot-password/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    try {
        const storedOtp = await OTP.findOne({ email });
        if (!storedOtp) {
            return res.status(400).json({ message: "OTP not found" });
        }

        const isMatch = await bcrypt.compare(otp, storedOtp.code);
        if (isMatch) {
            await OTP.deleteOne({ email });
            res.status(200).json({ message: "OTP verified" });
        } else {
            res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error verifying OTP", error: error.message });
    }
});

app.post("/api/forgot-password/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ email }, { password: hashedPassword });

        await OTP.deleteOne({ email });

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Error resetting password", error: error.message });
    }
});

app.use((_req, res, _next) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 9002;
server.listen(PORT,'0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
