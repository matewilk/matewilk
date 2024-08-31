import Link from "next/link";

const FullscreenMenu = ({ fullMenuHandler }) => {
  return (
    <ul className="fullscreen-menulist mb-0 flex h-screen items-center justify-between pl-0">
      <li className="section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5">
        <Link legacyBehavior href="/homepage1">
          <a
            className="flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl"
            onClick={(e) => fullMenuHandler(false)}
          >
            <span className="fullmenuitem rotate-180">Home</span>
          </a>
        </Link>
      </li>
      <li className="section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5">
        <Link legacyBehavior href="/about">
          <a
            className="flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl"
            onClick={(e) => fullMenuHandler(false)}
          >
            <span className="fullmenuitem rotate-180">About</span>
          </a>
        </Link>
      </li>
      <li className="section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5">
        <Link legacyBehavior href="/resume">
          <a
            className="flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl"
            onClick={(e) => fullMenuHandler(false)}
          >
            <span className="fullmenuitem rotate-180">Resume</span>
          </a>
        </Link>
      </li>
      <li className="section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5">
        <Link legacyBehavior href="/projects">
          <a
            className="flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl"
            onClick={(e) => fullMenuHandler(false)}
          >
            <span className="fullmenuitem rotate-180">Projects</span>
          </a>
        </Link>
      </li>
      <li className="section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5">
        <Link legacyBehavior href="/blogs/1">
          <a
            className="flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl"
            onClick={(e) => fullMenuHandler(false)}
          >
            <span className="fullmenuitem rotate-180">Blogs</span>
          </a>
        </Link>
      </li>
      <li className="section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5">
        <Link legacyBehavior href="/contact">
          <a
            className="flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl"
            onClick={(e) => fullMenuHandler(false)}
          >
            <span className="fullmenuitem rotate-180">Contact</span>
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default FullscreenMenu;
