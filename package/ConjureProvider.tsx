import React, { ReactNode } from 'react';
import { ConfirmModalProvider } from "./ConfirmModal";
import { TextInputProvider } from "./SimpleTextInput";
import { AlertProvider } from "./ConjureToast";

export const ConjureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ConfirmModalProvider>
            <TextInputProvider>
                <AlertProvider>
                    <div id="conjure-root"></div>
                    {children}
                </AlertProvider>
            </TextInputProvider>
        </ConfirmModalProvider>
    );
};
