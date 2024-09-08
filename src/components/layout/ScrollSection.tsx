"use client";
import { FC, ReactNode } from "react";

export const Section: FC<{
  name: string;
  className: string;
  children?: ReactNode;
}> = ({ name, className, children }) => {
  return (
    <section id={name} className={className}>
      {children}
    </section>
  );
};
