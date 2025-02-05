'use client'


import ConjureToastEditor from "@/app/ConjureToast/components/ConjureToastEditor";
import { useAlert } from "conjure-ui";

export default function Page()
{
    const _showAlert = useAlert();

    const showSuccessToast = () =>
    {
        _showAlert("This is a success message!", "success");
    }

    const showInfoToast = () =>
    {
        _showAlert("This is an info message!", "info");
    }

    const showWarningToast = () =>
    {
        _showAlert("This is a warning message!", "warning");
    }

    const showErrorToast = () =>
    {
        _showAlert("This is an error message!", "error");
    }

    return (
        <section className="mx-32 my-10 text-gray-300">
            <h1 className="text-3xl">Conjure Toast</h1>
            <hr className="border-gray-300 border-0 border-t-2 mt-2 mb-12"/>

            <div className="flex w-full">
                <div className="w-1/2 flex flex-col gap-4 items-center justify-center">
                    <button
                        onClick={showSuccessToast}
                        className="text-green-500 cursor-pointer border border-green-500 rounded-[4px] bg-transparent w-[200px] hover:text-green-600 hover:border-green-600 transition-colors duration-200 px-6 py-2 select-none">
                        Show Success
                    </button>
                    <button
                        onClick={showInfoToast}
                        className="text-blue-500 cursor-pointer border border-blue-500 rounded-[4px] bg-transparent w-[200px] hover:text-blue-600 hover:border-blue-600 transition-colors duration-200 px-6 py-2 select-none">
                        Show Info
                    </button>
                    <button
                        onClick={showWarningToast}
                        className="text-orange-500 cursor-pointer border border-orange-500 rounded-[4px] bg-transparent w-[200px] hover:text-orange-600 hover:border-orange-600 transition-colors duration-200 px-6 py-2 select-none">
                        Show Warning
                    </button>
                    <button
                        onClick={showErrorToast}
                        className="text-red-500 cursor-pointer border border-red-500 rounded-[4px] bg-transparent w-[200px] hover:text-red-600 hover:border-red-600 transition-colors duration-200 px-6 py-2 select-none">
                        Show Error
                    </button>
                </div>

                <div className="w-1/2">
                    <ConjureToastEditor />
                </div>
            </div>
        </section>
    );
}