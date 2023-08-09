import { component$ } from "@builder.io/qwik";
import { type RequestHandler, routeLoader$, useNavigate } from "@builder.io/qwik-city";

import { css } from "~/styled-system/css";

export const onRequest: RequestHandler = async ({
    sharedMap,
    cookie,
}) => {
    const userToken = cookie.get("user_token")
    const user = cookie.get("user")
    sharedMap.set('user_token', userToken)
    sharedMap.set('user', user);
};

export const userLoader = routeLoader$(({ sharedMap }) => {

    const userToken = sharedMap.get("user_token")
    const user = sharedMap.get("user")

    const result = {
        token: userToken.value,
        user: user.json(),
    }

    return result
});


export default component$(() => {
    const user = userLoader();
    const nav = useNavigate();
    return (
        <div>
            <button onClick$={async () => {
                await nav("/logout")
            }}>logOut</button>
            <div class={css({ textStyle: "xlHeader" })}>this is the dashboard</div>
            <div>hello:</div>
            <div>
                {user.value.user.id}
            </div>
        </div>
    )
})