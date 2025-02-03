'use client'

import { useSimpleTextInputModal } from "@/components/SimpleTextInput";
import { useState } from "react";
import SimpleTextInputEditor from "@/app/SimpleTextInput/components/SimpleTextInputEditor";

export default function Page()
{
    const { useTextInput } = useSimpleTextInputModal();
    const [_userInput, setUserInput] = useState<string>('');

    const openSimpleTextInput = async (): Promise<void> =>
    {
        const { action, input } = await useTextInput(_userInput, 'Type in your text');

        if (action === 'save' && input !== null)
        {
            setUserInput(input);
        }
    }

    return (
        <section className="mx-32 my-10 text-gray-300">
            <h1 className="text-3xl">Simple Text Input</h1>
            <hr className="border-gray-300 border-0 border-t-2 mt-2 mb-12"/>

            <div className="flex w-full">
                <div className="w-1/2 flex items-center justify-center">
                    <button
                        onClick={openSimpleTextInput}
                        className="text-gray-300 cursor-pointer border border-gray-300 rounded-[4px] bg-transparent hover:bg-gray-200 hover:text-black transition-colors duration-200 px-6 py-2 select-none"
                    >
                        Open Simple-Text-Input
                    </button>

                    {
                        _userInput && <div className="absolute mt-24">
                            You typed: <span
                            className="bg-yellow-600 text-gray-900 px-2 py-1 rounded-sm">{_userInput}</span>
                        </div>
                    }
                </div>

                <div className="w-1/2">
                    <SimpleTextInputEditor/>
                </div>
            </div>
        </section>
    );
}