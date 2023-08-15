import { $, component$, useSignal } from "@builder.io/qwik";
import { type RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import { buttonR } from "~/recipes/button";
import { imgContainerR } from "~/recipes/layouts";
import { textR } from "~/recipes/text";
import { css } from "~/styled-system/css";

// import { imageViewerSm } from "~/styled-system/patterns";

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

export const useFilesLoader = routeLoader$(() => {
    const files = [
        {
            id: "1",
            image: "https://images.unsplash.com/photo-1691036561870-e2badbd0fd22",
            name: "room.png",
            selected: false
        },
        {
            id: "2",
            image: "https://images.unsplash.com/photo-1691418173295-3c3a31c63527",
            name: "beach.png",
            selected: false
        },
        {
            id: "3",
            image: "https://images.unsplash.com/photo-1691483059022-e8ad9f2d9d12",
            name: "forest.jpg",
            selected: false
        },
        {
            id: "4",
            image: "https://images.unsplash.com/photo-1682188299490-1e6e9c98bac8",
            name: "penguin.jpg",
            selected: false
        },
        {
            id: "5",
            image: "https://images.unsplash.com/photo-1691546039838-2494ecd6afd6",
            name: "marmol.jpg",
            selected: false
        },
        {
            id: "6",
            image: "https://images.unsplash.com/photo-1691546039838-2494ecd6afd6",
            name: "marmol.jpg",
            selected: false
        },
        {
            id: "7",
            image: "https://images.unsplash.com/photo-1691546039838-2494ecd6afd6",
            name: "marmol.jpg",
            selected: false
        },
        {
            id: "8",
            image: "https://images.unsplash.com/photo-1691546039838-2494ecd6afd6",
            name: "marmol.jpg",
            selected: false
        },
        {
            id: "9",
            image: "https://images.unsplash.com/photo-1691546039838-2494ecd6afd6",
            name: "marmol.jpg",
            selected: false
        },
    ]

    return files
});



export default component$(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = userLoader();
    const initialImages = useFilesLoader()
    const images = useSignal(initialImages.value);
    const selectedImage = useSignal<{ id: string, image: string, name: string } | null>(null)

    const selectImage = $((id: string) => {
        images.value = images.value.map(img => {
            if (img.id == id) {
                img.selected = !img.selected
                if (img.selected) {
                    selectedImage.value = img
                } else {
                    selectedImage.value = null
                }
            } else {
                img.selected = false;
            }
            return img
        })
    });

    const copyUrl = $((url: string) => {
        navigator.clipboard.writeText(url);
    })

    const deleteImage = $((id: string) => {
        if (id == "") return;
        console.log(id)
    })

    return (
        <div class={css({ flex: "1", display: "flex", flexDir: "column", })}>
            <div class={css({ pb: "lg", display: "flex", justifyContent: "end" })}>
                <a href="/dashboard/upload" class={buttonR({ colors: "primary" })} >Upload Images</a>
            </div>
            <div class={css({ display: "flex", flex: "1", gap: "lg", })}>
                <div class={css({ bg: "complement", flex: "1", position: "relative", borderRadius: "md", py: "containerPadding" })}>
                    <div class={css({
                        position: "absolute",
                        // padding: "containerPadding",
                        px: "containerPadding",
                        flexDirection: "row", flexGrow: "none", display: "flex", flexDir: "row",
                        top: 40,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        overflow: "auto"
                    })}>
                        <div class={css({ display: "flex", flex: "1", alignContent: "baseline", flexDir: "row", flexWrap: "wrap", gap: "lg", overflow: "auto", pb: "10px" })}>
                            {
                                images.value.map(({ image, id, selected, name }) => {
                                    const url = `url("${image}")`
                                    return (
                                        <div key={id}
                                            class={selected ? imgContainerR({ shadow: "selected" }) : imgContainerR({ shadow: "unselected" })}
                                            onClick$={() => selectImage(id)}
                                        >
                                            <div data-img-selected={selected} data-image-view class={css({ mb: "6px" })} style={{ backgroundImage: url }}>

                                            </div>
                                            <p class={textR({ size: "md", weight: "regular" })}>
                                                {name}
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                {
                    selectedImage.value &&
                    <div class={css({ flex: "0.3", bg: "complement", flexDirection: "row", borderRadius: "md", boxSizing: "border-box", display: "flex" })}>
                        <div class={css({ px: "md", flex: "1", display: "flex", flexDir: "column" })}>
                            <div class={css({ py: "py" })}>
                                <p class={textR({ size: "lg", weight: "regular" })}>
                                    {selectedImage.value.name}
                                </p>
                            </div>
                            <div class={css({ mx: "auto" })}>
                                <img class={css({ borderRadius: "md" })} src={selectedImage.value.image} alt={selectedImage.value.name} width={"220"} height={"200"} />
                            </div>
                            <div class={css({ display: "flex", justifyContent: "space-around", py: "sm" })}>
                                <button onClick$={() => copyUrl(selectedImage.value?.image ?? "")} class={buttonR({ colors: "outline" })}>Copy url</button>
                                <button disabled class={buttonR({ colors: "primary" })}>Copy Image</button>
                            </div>
                            <div class={css({ mt: "auto", display: "flex", flexDir: "column", pb: "md" })}>
                                <button onClick$={() => deleteImage(selectedImage.value?.id ?? "")} class={buttonR({ colors: "danger" })}>Delete</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
})