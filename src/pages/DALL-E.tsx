"use client"

import axios from 'axios';
import { Trykker } from 'next/font/google';
import { FC, useRef, useState } from 'react';

interface DallEProps { }

const DallE: FC<DallEProps> = () => {
    const promptRef = useRef<HTMLInputElement>(null); // Specify the type of ref as HTMLInputElement
    const [imageUrl, setImageUrl] = useState<string | null>(); // State to store the generated image URL
    const [isLoading, setIsLoading] = useState<boolean>(false)


    async function handleGenerateImage() {
        console.log(JSON.stringify({ prompt: promptRef?.current?.value }))
        setIsLoading(true)
        try {
            const resp = await fetch("/api/DALL-E/image", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt: promptRef?.current?.value })
            }).then(resp => resp.json())

            console.log(resp.image)
            setIsLoading(false)
            setImageUrl(resp.image); // Set the image URL when it is returned
        } catch (error: any) {
            console.log(error.message, 'error')
        }
    }

    return (
        <main className="container max-w-4xl mx-auto">
            <section className="flex flex-col items-center gap-2 px-6 py-6">
                <input
                    type="text"
                    className="w-full outline-none py-2 px-6 bg-gray-200 rounded-3xl text-black text-sm"
                    placeholder="a woman walking her dog, a ballerina dancing, etc.."
                    ref={promptRef} // Assign the ref to the input element
                />
                <button
                    className="hover:opacity-80 py-2 px-6 bg-lime-600 rounded-3xl text-xs uppercase text-white ml-auto"
                    onClick={handleGenerateImage}
                >
                    Generate
                </button>
            </section>

            <section className="flex justify-center">
                {imageUrl ? (
                    <div>
                        <img
                            src={imageUrl}
                            alt="Generated"
                            className="max-w-full max-h-full"
                            onLoad={() => setIsLoading(false)}
                        />
                    </div>
                ) : null}
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="relative w-[256px] h-[256px] space-y-3 overflow-hidden rounded-md bg-neutral-800 p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white hover:shadow-lg before:animate-[shimmer_1.5s_infinite]">
                            <div className="h-36 w-full rounded-lg bg-neutral-600"></div>
                            <div className="space-y-3">
                                <div className="h-5 w-8/12 rounded-full bg-neutral-800">
                                    <div className="space-y-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
                {!isLoading && !imageUrl ? (
                    <div className="bg-neutral-800 h-[256px] flex w-[256px] items-center justify-center text-white rounded-xl p-4">
                        'Image will show up here'
                    </div>
                ) : null}
            </section>

        </main>
    );
};

export default DallE;
