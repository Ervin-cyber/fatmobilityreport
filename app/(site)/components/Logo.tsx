"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
const logoDark = "/images/logo.png";
const logoLight = "/images/logo-white.png";
const Logo = () => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <Link href="/">
        <Image
          src={logoDark}
          alt="Logo"
          width={"130"}
          height={"70"}
          className="relative"
        />
      </Link>
    </div>
  );
};

export default Logo;