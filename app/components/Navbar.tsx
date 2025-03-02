import Image from "next/image"
import Logo from "../../public/assets/Logo.svg"
import User from "../../public/assets/User.svg"
import Menu from "../../public/assets/Menu.svg"

const navLinks = [
    {name: 'Features'},
    {name: 'Pricing'},
    {name: 'About us'},
    {name: 'Contact us'}
];

export function Navbar() {
    return (
        <nav className="flex w-full items-center justify-between px-[20px] py-[16px] lg:container lg:mx-auto lg:px-20">
            <div className="flex items-center">
                <Image src={Logo} alt="Logo" />

                <div className="hidden lg:flex pl-[74px] gap-x-[56]">
                    {navLinks.map((item, index) =>(
                        <p className="text-[red] font-medium" key={index}>{item.name}</p>
                    ))}
                </div>
            </div>

            <div className="flex gap-x-5">
                <div className="flex items-center gap-x-2">
                    <Image src={User} alt="User Profile" />
                    <span className="hidden font-medium text-[red] lg:block">Sign in</span>
                </div>

                <Image src={Menu} alt="Menu Button" className="lg:hidden"/>
            </div>
        </nav>
    )
}