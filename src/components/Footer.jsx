import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-night text-indigo-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <p className="font-serif text-2xl font-semibold text-white">
            Life<span className="text-gold">Lessons</span>
          </p>
          <p className="mt-3 text-sm">
            A place to keep the lessons life teaches you, and to learn from
            the lessons of others.
          </p>
        </div>

        <div>
          <p className="font-semibold text-white">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/public-lessons" className="hover:text-gold">Public Lessons</Link></li>
            <li><Link to="/terms" className="hover:text-gold">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>hello@lifelessons.com</li>
            <li>+44 20 7946 0123</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-night-light">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row">
          <p className="text-sm">© 2026 LifeLessons. All rights reserved.</p>
          <div className="flex gap-5 text-xl text-white">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-gold"><FaFacebookF /></a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="hover:text-gold"><FaXTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-gold"><FaLinkedinIn /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-gold"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;