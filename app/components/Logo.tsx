"use client";
import Image from "next/image";
//import { useEffect, useState } from "react";
import Link from "next/link";
//const [width] = useState(0);
const Logo = () => {
  return (
    <div>
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={"150"}
          height={"75"}
          className="relative"
        />
      </Link>
    </div>
  );
};

export default Logo;