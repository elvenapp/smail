import {createCookie, createCookieSessionStorage} from "@remix-run/node";
import {createSession} from "@remix-run/cloudflare";

const secrets = (process.env.COOKIES_SECRET as string)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
console.log("secrets", secrets);

export const userMailboxCookie = createCookie("userMailbox", {
  expires:new Date(Date.now()+1000*60*60),
  secrets: secrets,
  httpOnly: true,
});

