'use client'

import { useConfirmModal, ModalAction } from "@/components/ConfirmModal";
import DeleteConfirmEditor from "@/app/ConfirmModal/components/DeleteConfirmEditor";
import YesNoCancelEditor from "@/app/ConfirmModal/components/YesNoCancelEditor";

export default function Page()
{
    const _useConfirmModal = useConfirmModal();


    const openDeleteConfirm = async () =>
    {
        const objectName = "objectName";
        const userResponse = await _useConfirmModal.openDeleteConfirmation(`Delete "${objectName}"?`);

        if (userResponse.action === ModalAction.DELETE)
        {
            // Add delete logic
        }
    }

    const openYesNoCancelModal = async () =>
    {
        const userResponse = await _useConfirmModal.openYesNoCancelModal(`Any text you want...`);

        switch (userResponse.action)
        {
            case ModalAction.YES:
                // Add logic when yes
                break;
            case ModalAction.NO:
                // Add logic when no
                break;
            case ModalAction.CANCEL:
                // Add logic when cancel
                break;
            default:
                break;
        }
    }

    return (
        <section className="mx-32 my-10 text-whitesmoke">
            <h1 className="text-3xl">Confirm Modal</h1>
            <hr className="border-0 border-t-2 mt-2 mb-12"/>

            <div className="flex w-full">
                <div className="w-1/2 flex items-center justify-center">
                    <button
                        onClick={openDeleteConfirm}
                        className="text-gray-300 cursor-pointer border border-gray-300 rounded-[4px] bg-transparent hover:bg-gray-200 hover:text-black transition-colors duration-200 px-6 py-2 select-none"
                    >
                        Show Delete Confirm
                    </button>
                </div>

                <div className="w-1/2">
                    <DeleteConfirmEditor/>
                </div>
            </div>

            <br/>
            <br/>
            <br/>

            <div className="flex w-full">
                <div className="w-1/2">
                    <YesNoCancelEditor/>
                </div>

                <div className="w-1/2 flex items-center justify-center">
                    <button
                        onClick={openYesNoCancelModal}
                        className="text-gray-300 cursor-pointer border border-gray-300 rounded-[4px] bg-transparent hover:bg-gray-200 hover:text-black transition-colors duration-200 px-6 py-2 select-none"
                    >
                        Show Yes-No-Cancel Modal
                    </button>
                </div>
            </div>
        </section>
    );
}