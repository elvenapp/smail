import {Outlet} from "@remix-run/react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function HomeLayout() {
    return (
        <main className="flex flex-col min-h-screen">
            <section className="pb-6 bg-white">
                <Header/>
            </section>
            <section className="flex flex-1 ">
                <Outlet/>
            </section>
            <section className="text-gray-700 bg-white md:pt-6">
                <Footer/>
            </section>
        </main>
    );
}
