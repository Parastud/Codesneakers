import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '10m' }, 
});

const OTP = mongoose.model('OTP', otpSchema);
export default OTP;
