import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoTwitter,
} from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="bg-[#ea2e0e] text-white py-2">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-4">
          <a href="https://facebook.com" className="hover:text-gray-300">
            <IoLogoFacebook className="h-5 w-5" />
          </a>
          <a href="https://instagram.com" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="https://twitter.com" className="hover:text-gray-300">
            <IoLogoTwitter className="h-5 w-5" />
          </a>
        </div>

        <p className="text-sm">
          We ship worldwide - Fast and reliable shipping!
        </p>

        <div className="flex items-center gap-2">
          <FaPhoneAlt className="h-4 w-4" />
          <span>+1 (234) 567-890</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
