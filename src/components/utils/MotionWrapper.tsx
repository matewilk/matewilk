"use client";

import { motion, MotionProps } from "framer-motion";
import React from "react";

type MotionComponentProps<Tag extends React.ElementType> = {
  type: Tag;
  children?: React.ReactNode;
  className?: string;
} & MotionProps &
  Omit<React.ComponentPropsWithoutRef<Tag>, keyof MotionProps>;

export const Motion = <Tag extends keyof JSX.IntrinsicElements>({
  type,
  children,
  className,
  ...props
}: MotionComponentProps<Tag>) => {
  const Component = (motion as any)[type];

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};
