'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';

export enum ModalAction
{
    YES = 'yes',
    NO = 'no',
    CANCEL = 'cancel',
    DELETE = 'delete',
}

interface ModalResponse
{
    action: ModalAction;
}

interface ModalContextType
{
    openYesNoCancelModal: (message: string) => Promise<ModalResponse>;
    openDeleteConfirmation: (message: string) => Promise<ModalResponse>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) =>
{
    const [modalData, setModalData] = useState<{
        isOpen: boolean;
        resolve: ((response: ModalResponse) => void) | null;
        message: string;
        type: 'confirmation' | 'delete';
    }>({
        isOpen: false,
        resolve: null,
        message: '',
        type: 'confirmation',
    });

    const openYesNoCancelModal = (message: string): Promise<ModalResponse> =>
    {
        return new Promise((resolve) =>
        {
            setModalData({ isOpen: true, resolve, message, type: 'confirmation' });
        });
    };

    const openDeleteConfirmation = (message: string): Promise<ModalResponse> =>
    {
        return new Promise((resolve) =>
        {
            setModalData({ isOpen: true, resolve, message, type: 'delete' });
        });
    };

    const closeModal = (action: ModalAction) =>
    {
        modalData.resolve?.({ action });
        setModalData({ isOpen: false, resolve: null, message: '', type: 'confirmation' });
    };

    return (
        <ModalContext.Provider value={{ openYesNoCancelModal, openDeleteConfirmation }}>
            {children}
            {modalData.isOpen && (
                <Modal
                    message={modalData.message}
                    onClose={closeModal}
                    type={modalData.type}
                />
            )}
        </ModalContext.Provider>
    );
};

export const useConfirmModal = (): ModalContextType =>
{
    const context = useContext(ModalContext);
    if (!context)
    {
        throw new Error('useConfirmModal must be used within a ModalProvider');
    }
    return context;
};

interface ModalProps
{
    message: string;
    onClose: (action: ModalAction) => void;
    type: 'confirmation' | 'delete';
}

const Modal: React.FC<ModalProps> = ({ message, onClose, type }) =>
{
    return ReactDOM.createPortal(
        <>
            <style>
                {`
                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 100;
                    }
                    
                    .modal-content {
                        max-width: 50%;
                        background: white;
                        padding: 1.5rem 2rem;
                        border-radius: 6px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                    }
                    
                    .modal-message {
                        font-size: large;
                    }
                    
                    .modal-buttons {
                        margin-top: 30px;
                        display: flex;
                        justify-content: space-between;
                    }
                    
                    .delete-button {
                        cursor: pointer;
                        border: 1px solid red;
                        border-radius: 6px;
                        padding: 0.5rem 1rem;
                        transition: all 0.2s;
                    }
                    
                     .delete-button:hover {
                        color: white;
                        background-color: red;
                        transition: all 0.2s;
                     }
                `}
            </style>
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-message">{message}</div>
                    <div className="modal-buttons">
                        {type === 'confirmation' ? (
                            <>
                                <button onClick={() => onClose(ModalAction.YES)}>Yes</button>
                                <button onClick={() => onClose(ModalAction.NO)}>No</button>
                                <button onClick={() => onClose(ModalAction.CANCEL)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => onClose(ModalAction.DELETE)} className="delete-button">Delete</button>
                                <button onClick={() => onClose(ModalAction.CANCEL)}>Cancel</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('modal-root') as HTMLElement
    );
};