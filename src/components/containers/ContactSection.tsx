import Link from "next/link";
import { RiMailLine, RiPhoneLine } from "react-icons/ri";

import { Motion } from "../utils/MotionWrapper";
import { getInformation } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
import ContactForm from "./ContactForm";

const ContactSection = async () => {
  const data = await getInformation();

  if (!data) return null;

  return (
    <div className="grid grid-cols-12 gap-7">
      <Motion
        type="div"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        variants={childrenAnimation}
        className="col-span-12 xl:col-span-10 xl:col-start-2"
      >
        <div className="contact-information">
          <h4>Contact Information</h4>
          <p>
            Please get in touch for quotes, questions, or just to say hello. I
            will get back to you as soon as possible.
          </p>
          <span className="inline-block h-1 w-20 rounded-full bg-primary bg-opacity-20"></span>
          <div className="contact-blocks mt-5 space-y-5">
            <div className="contact-block card flex p-4 md:p-5">
              <span className="icon mr-4 inline-flex h-16 w-16 shrink-0 grow-0 basis-16 items-center justify-center rounded-full bg-primary bg-opacity-10 text-3xl text-primary">
                <RiPhoneLine />
              </span>
              <div className="content">
                <h5 className="mb-2">Contact number</h5>
                {data.phoneNumbers.map((number, index) => (
                  <p className="mb-0" key={index}>
                    <Link
                      href={`tel:${number.split("-").join("")}`}
                      className="no-underline"
                    >
                      {number}
                    </Link>
                  </p>
                ))}
              </div>
            </div>
            <div className="contact-block card flex p-4 md:p-5">
              <span className="icon mr-4 inline-flex h-16 w-16 shrink-0 grow-0 basis-16 items-center justify-center rounded-full bg-primary bg-opacity-10 text-3xl text-primary">
                <RiMailLine />
              </span>
              <div className="content">
                <h5 className="mb-2">Contact mail</h5>
                {data.emailAddress.map((email, index) => (
                  <p className="mb-0" key={index}>
                    <Link href={`mailto:${email}`} className="no-underline">
                      {email}
                    </Link>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Motion>
      <Motion
        type="div"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
        variants={childrenAnimation}
        className="col-span-12 xl:col-span-10 xl:col-start-2"
      >
        <ContactForm />
      </Motion>
    </div>
  );
};

export default ContactSection;
