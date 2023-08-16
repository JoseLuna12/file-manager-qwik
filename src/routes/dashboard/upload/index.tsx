import { $, type QwikChangeEvent, component$, useSignal, useVisibleTask$, noSerialize, useStore, useTask$, } from "@builder.io/qwik";

import { textR } from "~/recipes/text";
import { css } from "~/styled-system/css";
import { Form, routeAction$, } from "@builder.io/qwik-city";
import admin from "~/firebase/admin";
import { getDownloadURL } from "firebase-admin/storage"
import { process_image } from "../../../../plugins/image"

export const useSubmitFiles = routeAction$(async (data, { cookie }) => {
    const user = cookie.get("user")
    if (user == null) return;
    const userData = user.json() as { id: string }
    const files = data.file as any
    if (files[0]?.name == "undefined") return;

    const db = admin.firestore()

    const storage = admin.storage()
    const response: { [key: string]: string } = {}

    for (const f of files) {
        if (f.name == "undefined") continue;

        console.log("uploading server", { file: f.name })
        const fileName = f.name
        const mime = f.type as string
        const extension = mime.split("/")[1]

        const fileLocation = `images/${userData.id}/${fileName}`


        try {

            if (!fileTypes.includes(mime)) {
                throw "error, file not supported"
            }

            const arrBuffer = await f.arrayBuffer()
            const buffer = Buffer.from(arrBuffer)

            const fullSizeImage = await process_image(new Uint8Array(arrBuffer), extension, fileName, "high")

            // main()
            const halfImage = await process_image(new Uint8Array(arrBuffer), extension, fileName, "half")
            const halfImageArr = new Uint8Array(halfImage.image)
            const halfBuffer = Buffer.from(halfImageArr)
            const halfFileLocation = `images/${userData.id}/thumbnail_half_${fileName}`

            const medImage = await process_image(new Uint8Array(arrBuffer), extension, fileName, "med")
            const medImageArr = new Uint8Array(medImage.image)
            const medBuffer = Buffer.from(medImageArr)
            const medFileLocation = `images/${userData.id}/thumbnail_med_${fileName}`

            const lowImage = await process_image(new Uint8Array(arrBuffer), extension, fileName, "low")
            const lowImageArr = new Uint8Array(lowImage.image)
            const lowBuffer = Buffer.from(lowImageArr)
            const lowFileLocation = `images/${userData.id}/thumbnail_low_${fileName}`

            const promises = [
                storage.bucket().file(fileLocation).save(buffer, { metadata: { mime }, contentType: mime }),
                storage.bucket().file(halfFileLocation).save(halfBuffer, { metadata: { mime }, contentType: mime }),
                storage.bucket().file(medFileLocation).save(medBuffer, { metadata: { mime }, contentType: mime }),
                storage.bucket().file(lowFileLocation).save(lowBuffer, { metadata: { mime }, contentType: mime })
            ]


            await Promise.allSettled(promises)

            const fullResUrl = await getDownloadURL(storage.bucket().file(fileLocation))
            const halfResUrl = await getDownloadURL(storage.bucket().file(halfFileLocation))
            const medResUrl = await getDownloadURL(storage.bucket().file(medFileLocation))
            const lowResUrl = await getDownloadURL(storage.bucket().file(lowFileLocation))

            await db.collection(userData.id)
                .doc("files")
                .collection("images")
                .doc()
                .set({
                    fullRes: {
                        image: fullResUrl,
                        width: fullSizeImage.width,
                        height: fullSizeImage.height,
                        location: fileLocation
                    },
                    halfRes: {
                        image: halfResUrl,
                        width: halfImage.width,
                        height: halfImage.height,
                        location: halfFileLocation
                    },
                    medRes: {
                        image: medResUrl,
                        width: medImage.width,
                        height: medImage.height,
                        location: medFileLocation
                    },
                    lowRes: {
                        image: lowResUrl,
                        width: lowImage.width,
                        height: lowImage.height,
                        location: lowFileLocation
                    },
                    filename: fileName, type: mime
                })


            response[fileName] = "success"
        } catch (err) {
            console.log(err)
            response[fileName] = "error"
        }
    }
    return response
})

const fileTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"]

export default component$(() => {
    const dragRef = useSignal<HTMLElement>();
    const submitRef = useSignal<HTMLFormElement>();
    const fileStatus = useStore<{ [key: string]: { percent: string, status: string } }>({})
    const submitFiles = useSubmitFiles()


    const populateUploadsUi = $((files: FileList) => {
        const list = noSerialize(Array.from(files))


        if (list) {
            list.forEach(f => {
                fileStatus[f.name] = { percent: "1", status: "loading" }
            })
            // fileStatus.value = allStatus
        }

        console.log(fileStatus.value)
    })


    useVisibleTask$(({ cleanup }) => {

        dragRef.value?.addEventListener('dragover', (event) => {
            event.preventDefault()
            event.stopPropagation()

        })

        dragRef.value?.addEventListener('drop', event => {
            event.preventDefault()
            event.stopPropagation()
            const files = event.dataTransfer?.files ?? null

            const va = submitRef.value?.getElementsByTagName("input").item(0)
            if (va && files) {
                populateUploadsUi(files)
                va.files = files
                submitRef.value?.requestSubmit()
            }
        })

        cleanup(() => {
            dragRef.value?.removeEventListener('dragover', () => { })
            dragRef.value?.removeEventListener('drop', () => { })
        })
    })


    const fileManager = $((event: QwikChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            populateUploadsUi(event.target.files)

            submitRef.value?.requestSubmit()
        }

    })

    useTask$(({ track }) => {
        track(() => submitFiles.value)
        const backendData = submitFiles.value;
        if (backendData) {

            Object.keys(backendData).forEach(key => {
                fileStatus[key].status = backendData[key] ?? ""
                fileStatus[key].percent = "100"
            })

        }
    })


    return (
        <div class={css({ display: "flex", flexDir: "column", flex: "1", bg: "complement", borderRadius: "md", overflow: "hidden" })}>

            <div class={css({ textAlign: "center", mb: "lg", pt: "lg" })}>
                <h3 class={textR({ size: "lg", weight: "bold" })}>Upload files</h3>
                <p class={textR({ size: "md", weight: "regular" })}>files can be images, gif, etc.</p>
            </div>

            <div class={css({ px: "2xl" })}>
                <Form action={submitFiles} ref={submitRef}>
                    <label id="dropzone" ref={dragRef}>
                        <input name="file[]" onChange$={fileManager} multiple class={css({ display: "none" })} type="file" accept="image/png, image/jpg, image/jpeg, image/gif" />
                        {/* <button ref={submitRef} type="submit" class={buttonR({ colors: "success" })}>subtmit</button> */}
                        <div class={css({
                            display: "flex", flexDir: "column", h: "200px",
                            borderRadius: "md", backgroundColor: "fileUploadContainer",
                            borderStyle: "dashed", borderWidth: "1px", borderColor: "fileUploadBorder",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "lg"
                        })}>
                            <img src="/svg/file.svg" alt="" width="68" height="65" />
                            <p class={textR({ size: "md", weight: "regular" })}>Drag and drop your images here</p>

                        </div>
                    </label>
                </Form>
            </div>

            <div class={css({ display: "flex", flexDir: "column", px: "2xl", gap: "md", py: "md" })}>
                {
                    Object.keys(fileStatus).map((key) => {
                        // console.log({ key: fileStatus[key] })

                        return (
                            <div key={key} class={css({ display: "flex", flexDir: "row", alignItems: "center", py: "5px", bg: "bg", px: "md", borderRadius: "10px" })}>
                                <div class={css({ flex: "0.3", overflow: "hidden", textOverflow: "ellipsis", pr: "10px" })}>
                                    {/* <img src="/svg/image-icon.png" alt="image icon" width="10" height="10" /`> */}
                                    <p class={textR({ size: "sm", })}>
                                        {key}
                                    </p>
                                </div>
                                <div class={css({ flex: "1", bg: "white", display: "flex", h: "2px" })}>
                                    {
                                        fileStatus[key].status == "loading" ?
                                            <div class={css({ bg: "blue.600" })} style={{ width: `${fileStatus[key].percent}%` }}></div>
                                            :
                                            fileStatus[key].status == "success" ?
                                                <div class={css({ bg: "green.600" })} style={{ width: `${fileStatus[key].percent}%` }}></div>
                                                :
                                                <div class={css({ bg: "red.600" })} style={{ width: `${fileStatus[key].percent}%` }}></div>
                                    }

                                </div>
                                <div class={css({ flex: "0.1", display: "flex", flexDir: "row", justifyContent: "center" })}>
                                    {
                                        fileStatus[key].status == "loading" ?
                                            <img style={{ animation: "rotation 2s infinite linear" }} src="/svg/loading.svg" alt="" width="20" height="20" />
                                            : fileStatus[key].status == "success" ?
                                                <img src="/svg/image-select-success.svg" alt="" width="20" height="20" />
                                                : <img src="/svg/error.svg" alt="" width="20" height="20" />
                                    }

                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div>
            </div>
        </div>
    )
})