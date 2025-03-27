import "./Settings.css";
import { FaLock, FaCheckCircle } from "react-icons/fa";

export default function Settings() {
  return (
    <div className="settings-container">
      <h1 className="settings-title">Change Password</h1>
      <div className="settings-card">
        <form className="settings-form">
          <div className="form-group">
            <label htmlFor="current_password">
              <FaLock className="input-icon" /> Current Password
            </label>
            <input
              type="password"
              name="current_password"
              id="current_password"
              placeholder="Enter current password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new_password">
              <FaLock className="input-icon" /> New Password
            </label>
            <input
              type="password"
              name="new_password"
              id="new_password"
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm_password">
              <FaLock className="input-icon" /> Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm new password"
              required
            />
          </div>
          <button className="settings-button">
            <FaCheckCircle className="button-icon" /> Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
