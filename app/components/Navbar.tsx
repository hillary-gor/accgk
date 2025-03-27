import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/accgk_navbar_logo.svg";
import User from "@/public/assets/User.svg";
import Menu from "@/public/assets/Menu.svg";

const navLinks = [
  { name: "Membership", href: "/membership" },
  { name: "Courses & Certification", href: "/courses" },
  { name: "Community", href: "/community" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between px-5 py-4 lg:container lg:mx-auto lg:px-20">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image src={Logo} alt="Logo" className="w-[100px] h-auto" priority />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex pl-10 gap-x-10">
          {navLinks.map((item, index) => (
            <Link key={index} href={item.href} className="text-[#0049AB] font-medium hover:text-blue-700">
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Right Side: User Profile & Menu */}
      <div className="flex items-center gap-x-5">
        <Link href="/register" className="hidden lg:block text-[#240449] font-medium pr-10 hover:text-gray-700">
          Register
        </Link>

        <div className="flex items-center gap-x-2">
          <Image src={User} alt="User Profile" />
          <Link href="/login" className="hidden font-medium text-red-600 lg:block hover:text-red-700">
            Sign in
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden">
          <Image src={Menu} alt="Menu Button" />
        </button>
      </div>
    </nav>
  );
}
