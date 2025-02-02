"use client";

import { useEffect, useState } from "react";
import { FiClipboard } from "react-icons/fi";
import Prism from "prismjs";
import "prism-themes/themes/prism-darcula.min.css";

export default function DeleteConfirmEditor()
{
    const [copied, setCopied] = useState(false);

    useEffect(() =>
    {
        Prism.highlightAll();
    }, []);

    const codeString = `import { useConfirmModal, ModalAction } from "@/components/ConfirmModal";

export default function Page() {
    const _useConfirmModal = useConfirmModal();

    const openDeleteConfirm = async () => {
        const objectName = "objectName";
        const userResponse = await _useConfirmModal.openDeleteConfirmation(
            \`Delete "\${objectName}"?\`
        );

        if (userResponse.action === ModalAction.DELETE) {
            // Add delete logic
        }
    };

    return (
        <button onClick={openDeleteConfirm}>
            Show Delete Confirm
        </button>
    );
}`;

    const handleCopy = async () =>
    {
        try
        {
            await navigator.clipboard.writeText(codeString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err)
        {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-gray-800 w-full max-w-3xl rounded-lg shadow-lg overflow-hidden">
                <div className="flex items-center bg-gray-700 px-4 py-2">
                    <div className="flex space-x-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>
                    <p className="ml-4 text-gray-400 text-sm">component.tsx</p>

                    <button
                        onClick={handleCopy}
                        className="ml-auto p-1 text-gray-400 hover:text-white"
                        aria-label="Copy to clipboard"
                    >
                        <FiClipboard title="Copy to clipboard"/>
                    </button>

                    {copied && (
                        <span className="text-green-400 text-sm ml-2">Copied!</span>
                    )}
                </div>

                <pre style={{ margin: 0 }} className="language-js text-sm">
                    <code className="language-js">{codeString}</code>
                </pre>
            </div>
        </div>
    );
}

