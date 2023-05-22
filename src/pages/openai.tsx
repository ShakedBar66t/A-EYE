"use client"

import axios from 'axios';
import { Trykker } from 'next/font/google';
import { FC, useRef, useState } from 'react';

interface DallEProps { }

const DallE: FC<DallEProps> = () => {
    const promptRef = useRef<HTMLInputElement>(null); // Specify the type of ref as HTMLInputElement
    const [imageUrl, setImageUrl] = useState<string | null>(); // State to store the generated image URL

    async function handleGenerateImage() {
        console.log(JSON.stringify({ prompt: promptRef?.current?.value }))
        try {
            const resp = await fetch("/api/DALL-E/image", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt: promptRef?.current?.value })
            }).then(resp => resp.json())

            console.log(resp)
        } catch (error) {
            console.log(error, 'error')

        }

    }

    return (
        <main className="container max-w-4xl mx-auto">
            <section className="flex items-center gap-2 px-6 py-6">
                <h2>Prompt</h2>
                <input
                    type="text"
                    className="w-full outline-none py-2 px-6 bg-blue-600 rounded-3xl text-white text-sm"
                    placeholder="a woman walking her dog, a ballerina dancing, a dog eating"
                    defaultValue="dog playing with a ball"
                    ref={promptRef} // Assign the ref to the input element
                />
            </section>

            <section className="grid grid-cols-2 gap-4">
                {/* LEFT */}
                <div className="flex flex-col gap-6 px-6 py-6">
                    <button
                        className="hover:opacity-80 py-2 px-6 bg-lime-600 rounded-3xl text-xs uppercase"
                        onClick={handleGenerateImage}
                    >
                        Generate
                    </button>

                    <div className="bg-gray-600 aspect-square flex items-center justify-center text-white">
                        {imageUrl ? (
                            <img src={imageUrl} alt="Generated" className="max-w-full max-h-full" />
                        ) : (
                            'Image will show up here'
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default DallE;
