import { FaDiscord, FaTiktok, FaYoutube } from "react-icons/fa";
import { SiHiveBlockchain } from "react-icons/si";

const socialLinks = [
  {
    icon: <SiHiveBlockchain />,
    href: "#",
    bg: "bg-gray-800 hover:bg-gray-700",
  },
  {
    icon: <FaTiktok />,
    href: "#",
    bg: "bg-gray-800 hover:bg-gray-700",
  },
  {
    icon: <FaYoutube />,
    href: "#",
    bg: "bg-gray-800 hover:bg-gray-700",
  },
  {
    icon: <FaDiscord />,
    href: "#",
    bg: "bg-gray-800 hover:bg-gray-700",
  },
];

const Footer = () => {
  return (
    <footer className=' text-white py-10'>
      {/* My Socials */}
      <div className='text-center mb-8'>
        <h2 className='text-lg font-semibold mb-4'>My Socials</h2>
        <div className='flex justify-center gap-4'>
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target='_blank'
              rel='noopener noreferrer'
              className={`p-3 rounded-full ${social.bg} transition-colors duration-200`}>
              <span className='text-xl'>{social.icon}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Socials + Copyright */}
      <div className='border-t border-gray-700 pt-6 text-center flex flex-col items-center gap-4'>
        <div className='flex justify-center gap-4'>
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target='_blank'
              rel='noopener noreferrer'
              className={`p-3 rounded-full ${social.bg} transition-colors duration-200`}>
              <span className='text-xl'>{social.icon}</span>
            </a>
          ))}
        </div>
        <p className='text-gray-400 text-sm mt-2'>© 2026 Colzys Tweaks</p>
      </div>
    </footer>
  );
};

export default Footer;
