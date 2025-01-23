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

    return (
        <section className="mx-32 mt-10 text-whitesmoke">
            <h1 className="text-3xl">Confirm Modal</h1>
            <hr className="border-0 border-t-2 mt-2 mb-4"/>

            <div>
                <button
                    onClick={openDeleteConfirm}
                    className="cursor-pointer border border-white rounded-[6px] bg-transparent hover:bg-white hover:text-black transition-colors duration-200 px-4 py-2 select-none"
                >
                    Show Delete Confirm
                </button>
            </div>

        </section>
    );
}