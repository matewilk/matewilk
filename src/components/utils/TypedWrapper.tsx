"use client";

import React from "react";
import { ReactTyped } from "react-typed";

export const Typed: React.FC<React.ComponentProps<typeof ReactTyped>> = (
  props
) => {
  return <ReactTyped {...props} />;
};
