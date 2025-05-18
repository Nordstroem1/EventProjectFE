import "../../index.css";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h1>Eventis</h1>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 The Council V.3</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;