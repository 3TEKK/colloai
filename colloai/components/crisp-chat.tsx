"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("abaea823-1f65-4e6c-afa0-0d49c9943588");
  }, []);

  return null;
};
