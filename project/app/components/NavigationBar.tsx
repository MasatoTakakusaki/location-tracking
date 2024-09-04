import React from "react";
import Link from "next/link";
import Image from "next/image";

function NavigationBar() {
  return (
    <nav className="bg-white mb-3 border-b border-gray-300">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src="/images/logo.svg" alt="Logo" width={32} height={32} />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-auto flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium"
              >
                About
              </Link>
              <Link
                href="/user-locations"
                className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium"
              >
                User Locations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
