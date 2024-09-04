import Link from "next/link";
import { getInformation } from "../../fetchers";
import SocialIcons from "../elements/SocialIcons";

const Footer = async () => {
  const data = await getInformation();

  if (!data) return null;

  return (
    <footer className="footer relative z-20 border-t border-white border-opacity-10 bg-grey bg-opacity-95 backdrop-blur backdrop-filter">
      <div className="container mx-auto">
        <div className="footer-content flex flex-wrap items-center justify-between gap-y-5 gap-x-7 py-5 text-center md:flex-nowrap">
          <div className="w-full md:w-auto">
            <SocialIcons data={data.socialAddress} />
          </div>
          <p className="mb-0 w-full md:w-auto">
            &copy; {new Date().getFullYear()}, All right reserved
            <Link legacyBehavior href="/">
              <a className="pl-1.5 font-medium text-heading no-underline hover:text-primary">
                Mateusz Wilk Ltd
              </a>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
