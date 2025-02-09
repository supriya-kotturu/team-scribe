import React from "react";
import { ModeToggle } from "./ui/mode-toggle";
import Link from "next/link";

const Header = () => {
  return (
    <div className="container w-full max-w-3xl mx-auto p-8 flex justify-between items-center">
      <header>
        <h1 className="outline-dashed p-2 font-extrabold text-2xl shadow-sm text-decoration-none">
          <Link href={"/"}>Team Scribe</Link>
        </h1>
      </header>
      <ModeToggle />
    </div>
  );
};

export default Header;
