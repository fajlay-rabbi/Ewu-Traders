import { useState } from "react";
import Image from "next/image"
import icon from '../../public/logo.png';
import setting from '../../public/sett.png';
import logout from '../../public/log.png';
import post from '../../public/pos.png';
import avatar from '../../public/man.png';
import Link from "next/link";
import axios from 'axios';



function Navbar({ username }) {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };






    const logoutHandler = () => {
        axios.get('http://localhost:4000/logout',
            { withCredentials: true }).then((res) => {
                if (res.status === 200 && res.data === 'success') {
                    window.location.assign("/signIn");
                }
            });
        window.location.reload();
    }



    return (
        <nav className="flex justify-between items-center h-16 w-[100vw] px-[75px] bg-[#092B6B] shadow-md absolute ">
            <Link href="/" passHref>
                <Image
                    src={icon}
                    alt="Logo"
                    className="cursor-pointer w-[160px]"
                />
            </Link>
            <div className="flex">
                <Link href="/request-product" passHref>
                    <p className="mr-8  text-white hover:text-[#b397f5]">Request a product</p>
                </Link>
                <Link href="/lost-and-found" passHref>
                    <p className="mr-8 text-white hover:text-[#9B7EDE]">Lost and found</p>
                </Link>
                {/* <Link href="/services" passHref>
                    <p className="text-white hover:text-[#9B7EDE]">Help with study</p>
                </Link> */}
            </div>
            <div className="flex items-center">
                <Link href="/messages" passHref className="">
                    <p className="mr-6 text-white hover:text-[#9B7EDE]">Messages</p>
                    {/* <h1 className="absolute font-extrabold text-5xl top-[-10px] left-[1220px] text-[#FF4D4D]">.</h1> */}
                    <div className="absolute top-5 right-[130px]">
                        <span className="relative flex items-center justify-center h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                    </div>
                </Link>

                <div id="avatarbtn" className="relative">
                    <Image
                        src={avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full cursor-pointer"
                        onClick={toggleOptions}
                    />


                    {showOptions && (
                        <div className="absolute  right-0 w-48 mt-2 py-2 bg-white border shadow-lg rounded z-50">

                            <Link href="/profile" passHref>
                                <p className="px-4 py-2 flex cursor-pointer  hover:bg-blue-200">
                                    <Image
                                        src={setting}
                                        alt="Logo"
                                        className="cursor-pointer w-[20px] h-[20px] mr-[12px]"
                                    />
                                    {username}
                                </p>
                            </Link>


                            <Link href="/mypost" passHref>
                                <p className="px-4 py-2 flex cursor-pointer hover:bg-blue-200">
                                    <Image
                                        src={post}
                                        alt="Logo"
                                        className="cursor-pointer w-[20px] h-[20px] mr-[12px]"
                                    />
                                    Your Post
                                </p>
                            </Link>


                                <p id="logoutBtn" className="px-4 py-2 flex cursor-pointer hover:bg-blue-200 " onClick={logoutHandler}>
                                    <Image
                                        src={logout}
                                        alt="Logo"
                                        className="cursor-pointer w-[20px] h-[20px] mr-[12px]"
                                    />
                                    Logout
                                </p>


                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
