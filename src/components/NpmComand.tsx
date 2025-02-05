'use client'

import { useState } from "react";
import { FiClipboard } from "react-icons/fi";

export default function NpmComand()
{
    const [copied, setCopied] = useState(false);
    const command = "npm i conjure-ui";

    const copyToClipboard = async () =>
    {
        try
        {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err)
        {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <>
            <div className="relative bg-gray-800 text-gray-200 p-3 rounded-md flex items-center justify-between max-w-[500px]">
                <code className="font-mono text-sm">{command}</code>
                <button
                    onClick={copyToClipboard}
                    className="ml-4 text-gray-400 hover:text-white transition"
                    title="Copy to clipboard"
                >
                    <FiClipboard size={16}/>
                </button>
                {copied && (
                    <span className="absolute -top-6 right-0 bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
            Copied!
          </span>
                )}
            </div>
        </>
    );
}
