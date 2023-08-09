import { component$ } from "@builder.io/qwik";
import { Form, type RequestHandler, routeAction$ } from "@builder.io/qwik-city";
import { buttonR } from "~/recipes/button";
import { inputR } from "~/recipes/input";
import { columnR, rowR } from "~/recipes/layouts";
import { css, cva } from "~/styled-system/css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "~/firebase/init";
import admin from "~/firebase/admin";




const loginContainer = cva({
    base: {
        minW: "300px",
        maxW: "600px",
        minH: "300px",
        maxH: "600px",
        width: "400px",
        height: "400px",
        bg: "complement",
        display: "flex",
        px: "xl",
        borderRadius: "md",
        lg: {
            width: "400px",
            height: "400px",
        },
        md: {
            width: "400px",
            height: "400px",
        },
        sm: {
            width: "100%",
            height: "100%",
        }
    }
})

export const onRequest: RequestHandler = async ({
    cookie,
    redirect
}) => {
    const auth = admin.auth();
    const userToken = cookie.get("user_token")
    if (userToken) {
        try {
            await auth.verifyIdToken(userToken.value)
            throw redirect(302, "/dashboard")
        } catch {
            cookie.delete("user_token", { path: "/" })
            cookie.delete("user", { path: "/" })
        }
    }
};

export const useLoginAction = routeAction$(async (data, { redirect, cookie }) => {
    //redirect,
    const auth = getAuth(app);
    auth.setPersistence({ type: "NONE" });
    const user = data as { email: string, password: string }
    // Handle form submission logic here

    return signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            const user = userCredential.user;
            user.getIdToken().then(token => {
                cookie.set("user_token", token, { path: "/" });
                cookie.set("user", JSON.stringify({ email: user.email, id: user.uid }), { path: "/" });
                throw redirect(302, "/dashboard");
            })
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            return { error: errorMessage }
        });
});

export default component$(() => {
    const login = useLoginAction();

    return (
        <div class={css({ py: "30px", px: "0px", h: "dvh", w: "dvw", display: "flex", sm: { px: "30px" } })}>
            <div class={rowR({ mainAxisAlignment: "start", crossAxisAligment: "center" })}>
                <div class={css({ alignSelf: "center", justifySelf: "start", flex: "0", sm: { flex: "1", alignSelf: "start" } })}>
                    <h3 class={css({ textStyle: "header" })}>Manager</h3>
                    <div class={css({ h: "100px" })}></div>
                </div>
                <div class={css({ flex: "1", display: "flex", justifyContent: "center" })}>
                    <div class={loginContainer()}>
                        <Form action={login} class={columnR({ crossAxisAligment: "stretch", size: "fill", gap: "md" })}>
                            <h2 class={css({ textStyle: "header", fontWeight: "regular" })}>Login</h2>
                            <div class={css({ h: "10px", py: "5px", textStyle: "text", color: "danger" })}>
                                {login.value?.error}
                            </div>
                            <div class={columnR({ crossAxisAligment: "stretch", size: "content" })}>
                                <label for="email" >Email</label>
                                <input readOnly={login.isRunning} name="email" type="email" placeholder="Enter your email" required class={inputR()} />
                            </div>
                            <div class={columnR({ crossAxisAligment: "stretch", size: "content" })}>
                                <label for="password" >Password</label>
                                <input readOnly={login.isRunning} name="password" type="password" placeholder="•••••••••••" required class={inputR()} />
                            </div>
                            <div class={rowR({ mainAxisAlignment: "end", size: "content" })}>
                                <a href="#" class={css({ textStyle: "text" })}>Forgot password</a>
                            </div>
                            <div class={css({ px: "md", display: "flex", flexDir: "column" })}>
                                <button disabled={login.isRunning} type="submit" class={buttonR({ colors: "primary" })} >Login</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
});
