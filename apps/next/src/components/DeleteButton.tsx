import {deleteMailbox} from "@/app/api/mails/route";

export const DeleteButton=()=> {


    const handleAuth = async () => {
        "use server";
        await deleteMailbox();
    }

    return (
        <form action={handleAuth} className="flex flex-col gap-2">
            <button
                type="submit"
                style={{color: "white"}}
                className="space-y-6 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                Delete
            </button>
        </form>
    );
}
