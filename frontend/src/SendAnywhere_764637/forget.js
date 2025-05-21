
import React,{useState} from 'react';
import ReactDOM from "react-dom/client";
import './forget.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faKey,faLock} from '@fortawesome/free-solid-svg-icons';

let root=ReactDOM.createRoot(document.querySelector("div.main"));

const ForgotPassword = () => {
  const [step, setStep] = useState('email'); 
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRequestOTP = (e) => {
    e.preventDefault();
    console.log('Sending OTP to:', email);
    setStep('otp');
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    console.log('Verifying OTP for:', email, 'OTP:', otp);
    setStep('new-password');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      console.log('Resetting password for:', email, 'New Password:', newPassword);
      setStep('success');
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-title">
        {step === 'success' ? 'Password Reset Successful' : step === 'new-password' ? 'Set New Password' : step === 'otp' ? 'Verify OTP' : 'Forgot Password'}
      </div>
      <div className="forgot-form-container">
        {step === 'email' && (
          <form className="forgot-form" onSubmit={handleRequestOTP}>
            <div className="forgot-field">
              <FontAwesomeIcon icon={faEnvelope} className="forgot-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="forgot-btn">
              <div className="forgot-btn-layer"></div>
              <input type="submit" value="Send OTP" />
            </div>
            <div className="back-to-login">
              Remembered? <a href="/login">Back to Login</a>
            </div>
          </form>
        )}

        {step === 'otp' && (
          <div className="otp-wrapper">
            <form className="otp-form" onSubmit={handleVerifyOTP}>
              <div className="otp-field">
                <FontAwesomeIcon icon={faKey} className="otp-icon" />
                <input
                  type="text"
                  placeholder="Enter OTP"
                  maxLength="4"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, ''); 
                  }}
                  className="otp-input"
                />
              </div>
              <div className="otp-btn">
                <div className="otp-btn-layer"></div>
                <input type="submit" value="Verify OTP" />
              </div>
              <div className="back-to-forgot">
                <a href="/forgot-password">Back to Forgot Password</a>
              </div>
            </form>
          </div>
        )}

        {step === 'new-password' && (
          <div className="new-password-wrapper">
            <form className="new-password-form" onSubmit={handleResetPassword}>
              <div className="new-password-field">
                <FontAwesomeIcon icon={faLock} className="new-password-icon" />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="confirm-password-field">
                <FontAwesomeIcon icon={faLock} className="confirm-password-icon" />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="new-password-btn">
                <div className="new-password-btn-layer"></div>
                <input type="submit" value="Reset Password" />
              </div>
              <div className="back-to-forgot">
                <a href="/forgot-password">Back to Forgot Password</a>
              </div>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="success-message">
            Your password has been reset successfully. <a href="/login" className='login'>Login</a>
          </div>
        )}
      </div>
    </div>
  );
};



root.render(
  <>
    <ForgotPassword/>
  </>
)