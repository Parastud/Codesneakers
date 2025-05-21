import mongoose from 'mongoose';
mongoose.set('debug', true);

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://dtc:Aman2003@cluster0.76mqa.mongodb.net/DTC`);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

connectDB();
