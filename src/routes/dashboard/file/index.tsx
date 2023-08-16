import { $, component$, useSignal } from "@builder.io/qwik";
import { type RequestHandler, routeLoader$, server$ } from "@builder.io/qwik-city";
import admin from "~/firebase/admin";
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

export const deleteImageServer = server$(async (data: { id: string, locations: string[], userId: string }) => {
    const storage = admin.storage()
    const firestore = admin.firestore()
    try {
        const promises = data.locations.map(l => storage.bucket().file(l).delete())
        await Promise.allSettled(promises)
        await firestore.collection(data.userId).doc("files").collection("images").doc(data.id).delete()
        return "success"
    } catch {
        return "error"
    }
})

export const userLoader = routeLoader$(({ sharedMap }) => {

    const userToken = sharedMap.get("user_token")
    const user = sharedMap.get("user")

    const result = {
        token: userToken.value,
        user: user.json(),
    }

    return result
});

export const useFilesLoader = routeLoader$(async ({ cookie }) => {
    const user = cookie.get("user")
    if (user == null) return;
    const userData = user.json() as { id: string }
    const db = admin.firestore()
    const images = await db.collection(userData.id).doc("files").collection("images").get()

    const files: { id: string, name: string, selected: boolean, fullRes: string, halfRes: string, medRes: string, lowRes: string, locations: string[] }[] = []

    images.forEach((res) => {
        const data = res.data()
        const id = res.id
        const fullImageRes = data.fullRes.image
        const halfRes = data.halfRes.image
        const medRes = data.medRes.image
        const lowRes = data.lowRes.image

        const locationFullRes = data.fullRes.location
        const locationhalfRes = data.halfRes.location
        const locationMedRes = data.medRes.location
        const locationLowRes = data.lowRes.location


        files.push({
            id,
            name: data.filename,
            selected: false,
            fullRes: fullImageRes,
            halfRes, medRes, lowRes,
            locations: [locationFullRes, locationhalfRes, locationMedRes, locationLowRes]
        })
    })
    return files
});



export default component$(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = userLoader();
    const initialImages = useFilesLoader()
    const images = useSignal(initialImages.value ?? []);
    const selectedImage = useSignal<{ id: string, images: string[], name: string, locations: string[] } | null>(null)

    const selectImage = $((id: string) => {
        images.value = images.value.map(img => {
            if (img.id == id) {
                img.selected = !img.selected
                if (img.selected) {
                    selectedImage.value = { id, images: [img.fullRes, img.halfRes, img.medRes, img.lowRes], name: img.name, locations: img.locations }
                } else {
                    selectedImage.value = null
                }
            } else {
                img.selected = false;
            }
            return img
        })
    });

    const copyUrl = $((url: string[]) => {
        navigator.clipboard.writeText(url.join(","));
    })

    const deleteImage = $(async (data: { id: string, locations: string[] }) => {
        if (data.id == "") return;

        const result = await deleteImageServer({ id: data.id, locations: data.locations, userId: user.value.user.id });
        if (result == "success") {
            images.value = images.value.filter(i => i.id != data.id)
            selectedImage.value = null
        }
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
                                images.value.map(({ lowRes, id, selected, name }) => {
                                    const url = `url("${lowRes}")`
                                    return (
                                        <div key={id}
                                            class={selected ? imgContainerR({ shadow: "selected" }) : imgContainerR({ shadow: "unselected" })}
                                            onClick$={() => selectImage(id)}
                                        >
                                            <div data-img-selected={selected} data-image-view class={css({ mb: "6px" })} style={{ backgroundImage: url }}></div>
                                            <span class={textR({ size: "md", weight: "regular" })}>
                                                {name}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                {
                    selectedImage.value &&
                    <div class={css({ flex: "0.8", bg: "complement", flexDirection: "row", borderRadius: "md", boxSizing: "border-box", display: "flex" })}>
                        <div class={css({ px: "md", flex: "1", display: "flex", flexDir: "column" })}>
                            <div class={css({ py: "py", textWrap: "wrap", overflowX: "clip", maxW: "200px", whiteSpace: "nowrap" })}>
                                <p class={textR({ size: "lg", weight: "regular" })}>
                                    {selectedImage.value.name}
                                </p>
                            </div>
                            <div class={css({ mx: "auto" })}>
                                <img class={css({ borderRadius: "md" })} src={selectedImage.value.images[0]} alt={selectedImage.value.name} width={"400"} height={"200"} />
                            </div>
                            <div class={css({ display: "flex", justifyContent: "space-around", py: "sm" })}>
                                <button onClick$={() => copyUrl(selectedImage.value?.images ?? [])} class={buttonR({ colors: "outline" })}>Copy url</button>
                                <button disabled class={buttonR({ colors: "primary" })}>Copy Image</button>
                            </div>
                            <div class={css({ mt: "auto", display: "flex", flexDir: "column", pb: "md" })}>
                                <button onClick$={() => deleteImage({ id: selectedImage.value?.id ?? "", locations: selectedImage.value?.locations ?? [] })} class={buttonR({ colors: "danger" })}>Delete</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
})