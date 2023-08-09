import { type RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = async ({
    cookie,
    redirect
}) => {
    cookie.delete("user_token", { path: "/" })
    cookie.delete("user", { path: "/" })
    throw redirect(301, "/login")
};