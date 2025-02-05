'use client'


import DeleteConfirmEditor from "@/app/ConfirmModal/components/DeleteConfirmEditor";
import YesNoCancelEditor from "@/app/ConfirmModal/components/YesNoCancelEditor";
import { useState } from "react";
import { ModalAction, useConfirmModal } from "conjure-ui";

export default function Page()
{
    const _useConfirmModal = useConfirmModal();
    const [_userActionDeleteConfirm, setUserActionDeleteConfirm] = useState<ModalAction | null>(null);
    const [_userActionYesNoCancelModal, setUserActionYesNoCancelModal] = useState<ModalAction | null>(null);


    const openDeleteConfirm = async () =>
    {
        const objectName = "objectName";
        const userResponse = await _useConfirmModal.openDeleteConfirmation(`Delete "${objectName}"?`);

        if (userResponse.action === ModalAction.DELETE)
        {
            setUserActionDeleteConfirm(ModalAction.DELETE);
        } else
        {
            setUserActionDeleteConfirm(ModalAction.CANCEL);
        }
    }

    const openYesNoCancelModal = async () =>
    {
        const userResponse = await _useConfirmModal.openYesNoCancelModal(`Any text you want...`);

        switch (userResponse.action)
        {
            case ModalAction.YES:
                setUserActionYesNoCancelModal(ModalAction.YES);
                break;
            case ModalAction.NO:
                setUserActionYesNoCancelModal(ModalAction.NO);
                break;
            case ModalAction.CANCEL:
                setUserActionYesNoCancelModal(ModalAction.CANCEL);
                break;
            default:
                break;
        }
    }

    return (
        <section className="mx-32 my-10 text-gray-300">
            <h1 className="text-3xl">Confirm Modal</h1>
            <hr className="border-gray-300 border-0 border-t-2 mt-2 mb-12"/>

            <div className="flex w-full">
                <div className="w-1/2 flex items-center justify-center">
                    <button
                        onClick={openDeleteConfirm}
                        className="text-gray-300 cursor-pointer border border-gray-300 rounded-[4px] bg-transparent hover:bg-gray-200 hover:text-black transition-colors duration-200 px-6 py-2 select-none"
                    >
                        Show Delete Confirm
                    </button>

                    {
                        _userActionDeleteConfirm && <div className="absolute mt-20">
                            You pressed:
                            {
                                _userActionDeleteConfirm === ModalAction.DELETE ?
                                    <span className="text-red-500"> DELETE</span> :
                                    <span> Cancel</span>
                            }
                        </div>
                    }
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

                    {
                        _userActionYesNoCancelModal ? <div className="absolute mt-20">
                            You pressed:
                            { _userActionYesNoCancelModal === ModalAction.YES && <span className="text-green-500"> YES</span> }
                            { _userActionYesNoCancelModal === ModalAction.NO && <span className="text-red-500"> NO</span> }
                            { _userActionYesNoCancelModal === ModalAction.CANCEL && <span> Cancel</span> }
                        </div> : null
                    }
                </div>
            </div>
        </section>
    );
}