'use client'

import { useConfirmModal, ModalAction } from "@/components/ConfirmModal";

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

        switch (userResponse.action) {
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
        <section className="mx-32 mt-10 text-whitesmoke">
            <h1 className="text-3xl">Confirm Modal</h1>
            <hr className="border-0 border-t-2 mt-2 mb-4"/>

            <div className="flex flex-col gap-4 w-fit">
                <button
                    onClick={openDeleteConfirm}
                    className="cursor-pointer border border-white rounded-[6px] bg-transparent hover:bg-white hover:text-black transition-colors duration-200 px-4 py-2 select-none"
                >
                    Show Delete Confirm
                </button>

                <button
                    onClick={openYesNoCancelModal}
                    className="cursor-pointer border border-white rounded-[6px] bg-transparent hover:bg-white hover:text-black transition-colors duration-200 px-4 py-2 select-none"
                >
                    Show Yes-No-Cancel Modal
                </button>
            </div>

        </section>
    );
}