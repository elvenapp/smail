import {Turnstile} from "@marsidev/react-turnstile";
import {
    LoaderFunction,
    redirect,
    type ActionFunction,
    type MetaFunction,
} from "@remix-run/node";
import {
    Form,
    useActionData,
    useLoaderData,
    useNavigation,
} from "@remix-run/react";
import randomName from "@scaleway/random-name";
import {getEmailsByMessageTo} from "database/dao";
import {getWebTursoDB} from "database/db";

import CopyButton from "../components/CopyButton";
import MailListWithQuery from "../components/MailList";
import {userMailboxCookie} from "../cookies.server";
import {DeleteButton} from "~/components/DeleteButton";

export const meta: MetaFunction = () => {
    return [
        {title: "Smail"},
        {name: "description", content: "Welcome to Smail!"},
    ];
};

export const loader: LoaderFunction = async ({request}) => {
    const siteKey = process.env.TURNSTILE_KEY || "1x00000000000000000000AA";
    const userMailbox =
        ((await userMailboxCookie.parse(
            request.headers.get("Cookie"),
        )) as string) || undefined;
    if (!userMailbox) {
        return {
            userMailbox: undefined,
            mails: [],
            siteKey,
        };
    }
    const db = getWebTursoDB(
        process.env.TURSO_DB_URL as string,
        process.env.TURSO_DB_RO_AUTH_TOKEN as string,
    );
    const mails = await getEmailsByMessageTo(db, userMailbox);
    return {
        userMailbox,
        mails,
        siteKey,
    };
};

export const action: ActionFunction = async ({ request }) => {
  const response = (await request.formData()).get("cf-turnstile-response");
  if (!response) {
    return {
      error: "No captcha response",
    };
  }
  const verifyEndpoint =
    "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const secret =
    process.env.TURNSTILE_SECRET || "1x0000000000000000000000000000000AA";
  const resp = await fetch(verifyEndpoint, {
    method: "POST",
    body: JSON.stringify({
      secret,
      response,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await resp.json();
  if (!data.success) {
    return {
      error: "Failed to verify captcha",
    };
  }

  const domain = "dark123.com";
  const mailbox = `${randomName("", ".")}@${domain}`;
  const userMailbox = await userMailboxCookie.serialize(mailbox);
  return redirect("/", {
    headers: {
      "Set-Cookie": userMailbox,
    },
  });
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const navigation = useNavigation();

    return (
        <>
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
                                {loaderData?.userMailbox ? (
                                    <div>
                                        <div className="flex items-center bg-zinc-100 p-2 px-4 rounded-md w-full">
                                            <span>{loaderData.userMailbox}</span>
                                            <CopyButton
                                                content={loaderData.userMailbox}
                                                className="p-1 rounded-md border ml-auto"
                                            />
                                        </div>
                                        <div className="text-xs text-zinc-600"> Now you can use this email to receive emails from anywhere. </div>
                                        <div>
                                            <DeleteButton/>
                                        </div>
                                    </div>
                                ) : (
                                    <Form method="POST" className="flex flex-col gap-2">
                                        <Turnstile
                                            siteKey={loaderData.siteKey}
                                            options={{
                                                theme: "light",
                                            }}
                                        />
                                        <button
                                            type="submit"
                                            disabled={navigation.state != "idle"}
                                            style={{color:"white"}}
                                            className="space-y-6 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"

                                        >
                                            Start
                                        </button>
                                    </Form>
                                )}
                            </div>
                        </div>

                        <div className="w-full max-w-[600px] mx-auto flex [&_svg]:w-full md:flex-1">
                            <MailListWithQuery mails={loaderData.mails} mailbox={loaderData.userMailbox}/>
                        </div>

                    </div>
                </div>

            </div>

            <div>
                {actionData?.error && (
                    <div className="text-red-500">{actionData.error}</div>
                )}
            </div>
        </>
    );
}
