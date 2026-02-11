import React, { useState, useEffect } from "react";
import "./AuthModal.css"; // Make sure modal styling exists

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLogin: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, isLogin }) => {
  const [loginMode, setLoginMode] = useState(isLogin);

  useEffect(() => {
    setLoginMode(isLogin);
  }, [isOpen, isLogin]);

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{loginMode ? "Sign In" : "Register"}</h2>
        <form>
          {!loginMode && <input type="text" placeholder="Name" required />}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
        <p onClick={() => setLoginMode(!loginMode)}>
          {loginMode ? "Don't have an account? " : "Already have an account? "}
          <span className="toggle-text">{loginMode ? "Register" : "Sign In"}</span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
