import React, { ReactNode } from 'react';
import { ConfirmModalProvider } from "@/components/ConfirmModal";
import { TextInputProvider } from "@/components/SimpleTextInput";

export const ConjureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ConfirmModalProvider>
            <TextInputProvider>
                <div id="conjure-root"></div>
                {children}
            </TextInputProvider>
        </ConfirmModalProvider>
    );
};
