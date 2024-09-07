import Link from "next/link";

const Logo = ({ url = "/", text = "" }) => {
  return (
    <Link legacyBehavior href={url}>
      <a className="sitelogo py-2">
        {text ? (
          <span className="text-3xl font-bold uppercase leading-none text-primary xl:text-4xl">
            {text}
            <span className="text-white">.</span>
          </span>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-8 max-h-full w-auto"
              src="/images/logo.png"
              alt="matewilk"
            />
          </>
        )}
      </a>
    </Link>
  );
};

export default Logo;
