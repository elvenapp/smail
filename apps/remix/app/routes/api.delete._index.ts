import {LoaderFunction, redirect} from "@remix-run/node";
import { getEmailsByMessageTo } from "database/dao";
import { getWebTursoDB } from "database/db";
import { userMailboxCookie } from "../cookies.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userMailbox = await userMailboxCookie.serialize(null, {
    expires: new Date(1970,1,1),
  })

  return redirect("/", {
    headers: {
      "Set-Cookie": userMailbox,
    },
  });
};
