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

            console.log(resp.image)
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

                <div className="bg-gray-600 flex items-center justify-center text-white rounded-xl p-10">
                    {imageUrl ? (
                        <img src={imageUrl} alt="Generated" className="max-w-full max-h-full" />
                    ) : (
                        'Image will show up here'
                    )}
                </div>
            </section>
        </main>
    );
};

export default DallE;
