import {GithubIcon} from "icons";
import Link from "next/link";

export default function Header() {
    return (
        <nav className="container relative z-50 h-24 select-none">
            <div
                className="container relative flex flex-wrap items-center justify-between h-24 px-0 mx-auto overflow-hidden font-medium border-b border-gray-200 md:overflow-visible lg:justify-center">
                <div className="flex items-center justify-start w-1/4 h-full pr-4"><a style={{fontSize:16}} href="/"
                                                                                      className="flex items-center py-4 space-x-2 text-xl font-extrabold text-gray-900 md:py-0"><span
                    className="flex items-center justify-center w-7 h-7 text-white bg-gray-900 rounded-full"><span
                    className="w-6 h-6 icon-[lucide--logo]"></span></span>　Way To Create Emails</a></div>
                <div
                    className="hidden top-0 left-0 items-start w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 md:absolute lg:text-base md:bg-transparent md:p-0 md:relative md:flex">
                    <div
                        className="flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row">
                        <a style={{fontSize:16}} href="/" target="_blank"
                           className="inline-flex items-center block w-auto h-16 px-6 text-xl font-black leading-none text-gray-900 md:hidden"><span
                            className="flex items-center justify-center w-8 h-8 text-white bg-gray-900 rounded-full"><span
                            className="w-6 h-6 icon-[mdi--email-outline]"></span></span>　Way To Create Emails</a>
                        <div className="w-full"></div>
                        <div
                            className="flex flex-col items-start justify-end w-full pt-4 md:items-center md:w-1/3 md:flex-row md:py-0">
                            <a className="w-full px-6 py-2 mr-0 text-gray-700 cursor-pointer md:px-3 md:mr-2 lg:mr-3 md:w-auto"
                               href="/code.html"> CODES </a><a
                            className="w-full px-6 py-2 mr-0 text-gray-700 cursor-pointer md:px-3 md:mr-2 lg:mr-3 md:w-auto"
                            href="/privacy.html"> PRIVACY </a><a
                            className="w-full px-6 py-2 mr-0 text-gray-700 cursor-pointer md:px-3 md:mr-2 lg:mr-3 md:w-auto"
                            href="https://v2cross.net"> FORUM </a><a
                            href="/mails" target="_blank"
                            className="inline-flex items-center w-full px-5 px-6 py-3 text-sm font-medium leading-4 text-white bg-gray-900 md:w-auto md:rounded-full hover:bg-gray-800 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-gray-800">BLOGS</a>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute right-0 flex flex-col items-center items-end justify-center w-10 h-10 bg-white rounded-full cursor-pointer md:hidden hover:bg-gray-100">
                    <span className="w-6 h-6 icon-[mdi--dots-horizontal]"></span><span style={{display: 'none'}}
                                                                                       className="w-6 h-6 icon-[mdi--window-close]"></span>
                </div>
            </div>
        </nav>
    );
}
