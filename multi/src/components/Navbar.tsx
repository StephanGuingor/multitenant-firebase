"use client"

import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import ProtectedRoute from "./ProtectedRoute";

export default function Navbar({ children }: { children: React.ReactNode }) {
    const unAuthItems = [
        { name: "Agency Login", href: "/login-tenant", current: false},
        { name: "Agency Register", href: "/signup-tenant", current: false},
        { name: "Login", href: "/login", current: false },
        { name: "Register", href: "/signup", current: false },
    ];

    const { user, logOut } = useAuth();

    const handleLogOut = async () => {
        await logOut(); 
        router.push("/login");
    };


    console.log("Navbar", children);
    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            { 
                            !user.uid ? 
                            unAuthItems.map((item) => (
                                    <Link href={item?.href} key={item.name} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                                            {item?.name}
                                    </Link>
                                )) :
                                    <>
                            
                                        <Link href={"/dashboard"} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                                            Dashboard
                                        </Link>
                            
                                    <li className="my-3 md:my-0 items-center mr-4 md:inline-block block ">
                                        <a
                                        onClick={handleLogOut}
                                        className="text-blue-800 hover:text-blue-900 transition cursor-pointer"
                                        >
                                        Logout
                                        </a>
                                    </li>
                                    {user.profilePicture ? <Image width={64} height={64} className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={user.profilePicture} alt="Bordered avatar"></Image>
                                    : <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                </div>    
                                }
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            {children}
        </>

    )
}
