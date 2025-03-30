"use client";
import Image from "next/image";
//import { useEffect, useState } from "react";
import Link from "next/link";
//const [width] = useState(0);
const Logo = () => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <Link href="/">
        <Image
          src="/images/logo.png"
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