import { component$, Slot, useSignal, $, useTask$ } from "@builder.io/qwik";
import { useNavigate, type RequestHandler, useLocation } from "@builder.io/qwik-city";
import admin from "~/firebase/admin";
import { buttonR } from "~/recipes/button";
import { textR } from "~/recipes/text";
import { css } from "~/styled-system/css";

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

const navigtionItems: { [key: string]: { key: string, value: string, link: string } } = {
    fileManager: { key: "file-manager", value: "File Manager", link: "/file" },
    home: { key: "home", value: "Home", link: "/home" },
    upload: { key: "upload", value: "Upload", link: "/upload" },
} as const

export default component$(() => {
    const nav = useNavigate();
    const currentPage = useLocation();
    const currNavState =
        useSignal<{ key: string, value: string }>({ key: navigtionItems.fileManager.key, value: navigtionItems.fileManager.value })

    useTask$(() => {
        for (const value of Object.values(navigtionItems)) {
            if (currentPage.url.pathname.includes(value.link)) {
                currNavState.value = { key: value.key, value: value.value }
            }
        }
    })
    const navigateTo = $(async (to: string) => {

        if (to == "logOut") {
            await nav('/logout')
        }

        const navValue = navigtionItems[to];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (navValue?.link) {
            currNavState.value = {
                key: navValue.key,
                value: navValue.value
            }
            await nav(`/dashboard${navValue.link}`)
        }
    })

    return (
        <div class={css({ display: "flex", flexDir: "row", justifyItems: "stretch", h: "dvh", p: "lg", gap: "lg" })}>
            <div class={css({ flex: "0.3", bg: "complement", maxW: "20%", borderRadius: "md", p: "containerPadding", display: "flex", flexDir: "column" })}>
                <div>
                    <h3 class={textR({ size: "xl", weight: "bold" })}>Manager</h3>
                </div>
                <div class={css({ py: "lg" })}>
                    <div>
                        <a class={css({ color: "nav" })} data-activated={currNavState.value.key == "file-manager"}
                            onClick$={() => navigateTo("fileManager")} href="#">
                            File Manager
                        </a>
                    </div>
                    <div>
                        <a class={css({ color: "nav" })} data-activated={currNavState.value.key == "upload"}
                            onClick$={() => navigateTo("upload")} href="#">
                            Upload
                        </a>
                    </div>

                </div>
                <div class={css({ marginTop: "auto", })}>
                    <button class={buttonR({ colors: "text" })} onClick$={
                        () => navigateTo("logOut")
                    }>logOut</button>
                </div>
            </div>
            <div class={css({ flex: "1", display: "flex", flexDir: "column", gap: "lg" })}>
                <div class={css({ bg: "complement", h: "50px", flex: "0.1", minH: "70px", flexShrink: "0", borderRadius: "md", px: "containerPadding", display: "flex", justifyContent: "center", alignItems: "center" })}>
                    <span class={textR({ size: "lg", weight: "bold" })}>
                        {currNavState.value.value}
                    </span>
                </div>
                <div class={css({ flex: "1", display: "flex" })}>
                    <Slot />
                </div>
            </div>
        </div>
    )
});
