import React, { ReactNode } from 'react';
import { ConfirmModalProvider } from "@/components/ConfirmModal";
import { TextInputProvider } from "@/components/SimpleTextInput";
import { AlertProvider } from "@/components/ConjureToast";

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
