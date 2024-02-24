import {redirect} from "@remix-run/node";
import {userMailboxCookie} from "~/cookies.server";

export const DeleteButton=()=> {

    async function fetchDelete() {
        try {
            const resp = await fetch("/api/delete");
            return await resp.json();
        } catch (e) {
            return [];
        }
    }

    return (

        <form className="flex flex-col gap-2" >
            <button
                type="submit"
                onClick={fetchDelete}
                style={{color: "white"}}
                className="space-y-6 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                Delete
            </button>
        </form>

    );
}
