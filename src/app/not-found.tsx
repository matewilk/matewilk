import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "../components/elements/Breadcrumb";
import { FC } from "react";
import { Metadata } from "next";

const NotFound: FC = () => {
  return (
    <section className="section-notfound">
      <Breadcrumb title="Page not found" blurred={false} paths={false} />
      <div className="not-found-wrapper pb-24 pt-10 lg:pt-14 lg:pb-28 xl:pt-16 xl:pb-32">
        <div className="container mx-auto">
          <div className="not-found text-center">
            <Image
              unoptimized={true}
              src="/images/notfound.svg"
              height={500}
              width={500}
              alt="not found"
            />
            <div>
              <Link href="/">
                <a className="btn btn-large">
                  <span>Back to home</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

export const metadata: Metadata = {
  title: "Not Found - matewilk portfolio website",
  description: "Page not found",
};
