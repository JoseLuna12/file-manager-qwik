import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import admin from "~/firebase/admin";

export const onRequest: RequestHandler = async ({ cookie, redirect }) => {
    const userToken = cookie.get("user_token")
    const user = cookie.get("user")
    if (userToken == null || user == null) {
        throw redirect(302, "/login")
    }

    const auth = admin.auth()
    try {
        await auth.verifyIdToken(userToken.value);

    } catch {
        throw redirect(302, "/logout")
    }

};


export const onGet: RequestHandler = async ({ cacheControl }) => {
    cacheControl({
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        maxAge: 5,
    });
};

export default component$(() => {
    return <Slot />;
});
