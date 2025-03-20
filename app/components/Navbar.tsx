import Image from "next/image"
import Logo from "../../public/assets/accgk_navbar_logo.svg"
import User from "../../public/assets/User.svg"
import Menu from "../../public/assets/Menu.svg"

const navLinks = [
    {name: 'Membership'},
    {name: 'Courses & Certification'},
    {name: 'Community'},
    {name: 'Resources'},
    {name: 'About'}
];

export function Navbar() {
    return (
        <nav className="flex w-full items-center justify-between px-[20px] py-[16px] lg:container lg:mx-auto lg:px-20">
            <div className="flex items-center">
                <Image src={Logo} alt="Logo" className="w-[100px] h-auto"/>

                <div className="hidden lg:flex pl-[74px] gap-x-[56px]">
                    {navLinks.map((item, index) =>(
                        <p className="text-[#0049AB] font-medium" key={index}>{item.name}</p>
                    ))}
                </div>
            </div>

            <div className="flex gap-x-5"> 
                <p className="hidden lg:block text-[#240449] font-medium pr-[56px]" >Register</p>
                <div className="flex items-center gap-x-2">
                    <Image src={User} alt="User Profile" />
                    <span className="hidden font-medium text-[red] lg:block">Sign in</span>
                </div>

                <Image src={Menu} alt="Menu Button" className="lg:hidden"/>
            </div>
        </nav>
    )
}