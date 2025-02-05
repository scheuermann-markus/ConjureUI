'use client'

import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalResponse
{
    action: 'save' | 'cancel';
    input: string | null;
}

interface ModalContextType
{
    useTextInput: (initialValue?: string | null, title?: string) => Promise<ModalResponse>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const TextInputProvider: React.FC<{ children: ReactNode }> = ({ children }) =>
{
    const [modalData, setModalData] = useState<{
        isOpen: boolean;
        resolve: ((response: ModalResponse) => void) | null;
        initialValue: string | null;
        title: string | null;
    }>({
        isOpen: false,
        resolve: null,
        initialValue: null,
        title: null,
    });

    const useTextInput = (initialValue: string | null = null, title: string | null = null): Promise<ModalResponse> =>
    {
        return new Promise((resolve) =>
        {
            setModalData({ isOpen: true, resolve, initialValue, title });
        });
    };

    const closeModal = (action: 'save' | 'cancel', input: string | null) =>
    {
        modalData.resolve?.({ action, input });
        setModalData({ isOpen: false, resolve: null, initialValue: null, title: null });
    };

    return (
        <ModalContext.Provider value={{ useTextInput }}>
            {children}
            {modalData.isOpen &&
                <InputModal initialValue={modalData.initialValue} title={modalData.title} onClose={closeModal}/>}
        </ModalContext.Provider>
    );
};

export const useSimpleTextInputModal = (): ModalContextType =>
{
    const context = useContext(ModalContext);
    if (!context)
    {
        throw new Error('useSimpleTextInputModal must be used within a TextInputProvider');
    }
    return context;
};

interface InputModalProps
{
    initialValue: string | null;
    title: string | null;
    onClose: (action: 'save' | 'cancel', input: string | null) => void;
}

const InputModal: React.FC<InputModalProps> = ({ initialValue, title, onClose }) =>
{
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<string>(initialValue || '');

    useEffect(() =>
    {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>
    {
        if (e.key === 'Enter')
        {
            handleSave();
        }
    };

    const handleSave = () =>
    {
        onClose('save', inputValue);
    };

    const handleCancel = () =>
    {
        onClose('cancel', null);
    };

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
                        background: white;
                        padding: 20px;
                        border-radius: 4px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .conjure__input {
                        padding: 0.25rem 0.5rem;
                        border: 1px solid gray;
                        border-radius: 4px;
                    }
                    
                    .conjure__button-container {
                        display: flex;
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
                    
                    .conjure__button--yes {
                        color: white;
                        background-color: #28a745;
                     }
                     .conjure__button--yes:hover {
                        background-color: #218838;
                        border-color: #1e7e34;
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
               `}
            </style>
            <div className="conjure__overlay">
                <div className="conjure__modal">
                    <h2>{title || 'Enter Text'}</h2>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="conjure__input"
                    />
                    <div className="conjure__button-container">
                        <button onClick={handleSave} className="conjure__button conjure__button--yes">Save</button>
                        <button onClick={handleCancel} className="conjure__button conjure__button--cancel">Cancel</button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('conjure-root')!
    );
};
