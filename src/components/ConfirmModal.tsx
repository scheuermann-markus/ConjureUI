'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
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

export const ConfirmModalProvider: React.FC<{ children: ReactNode }> = ({ children }) =>
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
        throw new Error('useConfirmModal must be used within a ConfirmModalProvider');
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
    const firstButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() =>
    {
        firstButtonRef.current?.focus();
    }, []);

    return ReactDOM.createPortal(
        <>
            <style>
                {`
                    .conjure__overlay {
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
                    
                    .conjure__modal {
                        max-width: 50%;
                        min-width: 300px;
                        background: white;
                        padding: 1.5rem 2rem;
                        border-radius: 6px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                    }
                    
                    .conjure__message {
                        font-size: large;
                    }
                    
                    .conjure__button-container {
                        margin-top: 30px;
                        display: flex;
                        gap: 1rem;
                        justify-content: space-between;
                    }
                    
                    .conjure__button {
                        cursor: pointer;
                        border-radius: 4px;
                        padding: 6px 16px;
                        min-width: 80px;
                        transition: background 0.2s;
                    }
                    .conjure__button:hover {
                        transition: background 0.2s;
                    }
                    .conjure__button:focus {
                        outline: 1px solid black;
                    }
                    
                    .conjure__button--cancel {
                        color: #212529;
                        background-color: #f8f9fa;
                        margin-left: 1rem;
                    }
                    .conjure__button--cancel:hover {
                        background-color: #e2e6ea;
                        border-color: #dae0e5;
                    }
                    
                    .conjure__button--danger {
                        color: white;
                        background-color: #dc3545;
                    } 
                     .conjure__button--danger:hover {
                        background-color: #c82333;
                        border-color: #bd2130;
                     }
                     
                     .conjure__button--yes {
                        color: white;
                        background-color: #28a745;
                     }
                     .conjure__button--yes:hover {
                        background-color: #218838;
                        border-color: #1e7e34;
                     }
                `}
            </style>
            <div className="conjure__overlay">
                <div className="conjure__modal">
                    <div className="conjure__message">{message}</div>
                    <div className="conjure__button-container">
                        {type === 'confirmation' ? (
                            <>
                                <button
                                    ref={firstButtonRef}
                                    onClick={() => onClose(ModalAction.YES)}
                                    className="conjure__button conjure__button--yes"
                                >
                                    Yes
                                </button>
                                <div>
                                    <button
                                        onClick={() => onClose(ModalAction.NO)}
                                        className="conjure__button conjure__button--danger"
                                    >
                                        No
                                    </button>
                                    <button
                                        onClick={() => onClose(ModalAction.CANCEL)}
                                        className="conjure__button conjure__button--cancel"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <button
                                    ref={firstButtonRef}
                                    onClick={() => onClose(ModalAction.DELETE)}
                                    className="conjure__button conjure__button--danger"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => onClose(ModalAction.CANCEL)}
                                    className="conjure__button conjure__button--cancel"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('conjure-root') as HTMLElement
    );
};
