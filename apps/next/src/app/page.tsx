import {fetchEmails, getMailbox} from "@/app/api/mails/route";
import CopyButton from "@/components/CopyButton";
import FetchMailboxFormWithCaptcha from "@/components/FetchMailboxForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MailListWithQuery from "@/components/MailList";
import {cookies} from "next/headers";
import {DeleteButton} from "@/components/DeleteButton";

const turnstileKey = process.env.TURNSTILE_KEY || "1x00000000000000000000AA";

export default async function Home() {
    const mailbox = await getMailbox();
    // const mailbox = "msdkjf@linsd.com";
    const mails = await fetchEmails(mailbox);

    return (
        <main className="flex flex-col min-h-screen">
            <section className="pb-6 bg-white">
                <Header/>
            </section>
            <section className="flex flex-1 ">
                <div className="container mx-auto">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col md:h-full">
                        <div className="p-6 pt-0 flex-1 flex flex-col md:flex-row">
                            <div className="flex flex-col md:w-2/5 lg:w-1/3">

                                <div className="flex flex-col my-5 space-y-3">
                                    <div className="my-4 text-2xl font-bold text-zinc-900">Minimalist temporary Email
                                    </div>
                                    <div className="flex items-center space-x-2"><span
                                        className="icon-[lucide--smile] text-orange-400 relative flex w-8 h-8 overflow-hidden rounded-full shrink-0"></span>
                                        <div><p className="text-sm font-medium leading-none">Privacy friendly</p></div>
                                    </div>
                                    <div className="flex items-center space-x-2"><span
                                        className="icon-[lucide--timer] text-red-400 relative flex w-8 h-8 overflow-hidden rounded-full shrink-0"></span>
                                        <div><p className="text-sm font-medium leading-none">Valid for 2 hour</p></div>
                                    </div>
                                    <div className="flex items-center space-x-2"><span
                                        className="icon-[lucide--badge-info] text-lime-600 relative flex w-8 h-8 overflow-hidden rounded-full shrink-0"></span>
                                        <div><p className="text-sm font-medium leading-none">AD friendly</p></div>
                                    </div>
                                    <div className="flex items-center space-x-2"><span
                                        className="icon-[tabler--brand-cloudflare] text-orange-400 relative flex w-8 h-8 overflow-hidden rounded-full shrink-0"></span>
                                        <div><p className="text-sm font-medium leading-none">100% Run on Cloudflare</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6"></div>
                                <div className="flex flex-col space-y-6 md:max-w-xs">

                                    <h1 className="text-xl">
                                        Get Your Temporary Emails
                                    </h1>
                                    {mailbox ? (
                                        <MailboxWithCopyButton mailbox={mailbox}/>
                                    ) : (
                                        <FetchMailboxFormWithCaptcha siteKey={turnstileKey}/>
                                    )}
                                </div>
                            </div>
                            <div className="w-full max-w-[600px] mx-auto flex items-center [&_svg]:w-full md:flex-1">
                                <MailListWithQuery mails={mails} mailbox={mailbox}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-gray-700 bg-white md:pt-6">
                <Footer/>
            </section>
        </main>
    );
}


export function MailboxWithCopyButton({mailbox}: { mailbox: string }) {

    return (

        <div>
            <div className="flex items-center bg-zinc-100 p-2 px-4 rounded-md w-full">
                <span>{mailbox}</span>
                <CopyButton content={mailbox} className="p-1 rounded-md border ml-auto"/>
            </div>
            <div>
                <DeleteButton/>
            </div>
        </div>


    );
}
