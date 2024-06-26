import "../styles/Footer.scss"
import { LocalPhone, Email } from "@mui/icons-material"
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <div className="footer">
      {/* <div className="footer_left">
        <a href="/"><img src="/assets/logo.png" alt="logo" /></a>
      </div> */}

      <div className="footer_center">
        <h3>Useful Links</h3>
        <ul>
          <li>About Us</li>
          <li>Terms and Conditions</li>
          <li>Return and Refund Policy</li>
        </ul>
      </div>

      <div className="footer_right">
        <Link to = "/contactus"><h3>Contact Us</h3></Link>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+91 99999 88888</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>trivia@support.com</p>
        </div>
        <img src="/assets/payment.png" alt="payment" />
      </div>
    </div>
  )
}

export default Footer