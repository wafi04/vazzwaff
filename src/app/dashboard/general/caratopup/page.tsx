"use client"
import { TypedEditor } from "@/components/editor/typed";
import { useState } from "react";

export default function Page(){
    const [text, setText] = useState<string>("");
    return (
        <TypedEditor text={text} setText={setText} />
    )
}