'use client'

import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark, experimental__simple } from "@clerk/themes";

export default function Page() {
  const { resolvedTheme } = useTheme();
  return (
    <SignUp
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : experimental__simple,
      }}
    />
  );
}
