import { component$ } from "@builder.io/qwik";
import { buttonR } from "~/recipes/button";
import { inputR } from "~/recipes/input";
import { columnR, rowR } from "~/recipes/layouts";
import { textR } from "~/recipes/text";
import { css } from "~/styled-system/css";


export default component$(() => {
  return (
    <>
      <h1 class={textR({ size: "2xl", weight: "bold" })}>Manager 🐶</h1>
      <h3 class={css({ textStyle: "body" })}>Manager</h3>
      <div class={css({ h: "40px" })}></div>
      <div>
        <form class={columnR({ mainAxisAlignment: "end", crossAxisAligment: "start", gap: "none" })}>
          <input type="email" placeholder="test" required class={inputR()} />
          <button type="submit" class={buttonR({ colors: "primary", })} >Login</button>
        </form>
      </div>
      <div class={css({ h: "40px" })}></div>

      <div class={rowR({ mainAxisAlignment: "center", crossAxisAligment: "start", gap: "lg" })}>
        <button class={buttonR({ colors: "primary", })} >Login</button>
        <button class={buttonR({ colors: "danger" })} >This is a button</button>
        <button class={buttonR({ colors: "success" })} >This is a button</button>
        <div class={css({ h: "100px" })}></div>
      </div>
    </>
  );
});
