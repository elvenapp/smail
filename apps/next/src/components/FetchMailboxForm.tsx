"use client";

import { fetchMailbox } from "@/app/api/mailbox/route";
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

export default function FetchMailboxFormWithCaptcha({
  siteKey,
}: {
  siteKey: string;
}) {
  const [disabled, setDisabled] = useState(true);
  return (
    <form action={fetchMailbox} className="flex flex-col gap-2">
      <Turnstile
        siteKey={siteKey}
        options={{
          theme: "light",
        }}
        onSuccess={() => setDisabled(false)}
      />
      <button
        type="submit"
        disabled={disabled}
        style={{color:"white"}}
        className="space-y-6 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
      >
        Start
      </button>
    </form>
  );
}
