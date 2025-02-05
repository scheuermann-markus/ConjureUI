'use client'

import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';

type Severity = 'success' | 'error' | 'warning' | 'info';

interface AlertContextType
{
    showAlert: (message: string, severity?: Severity, duration?: number) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) =>
{
    const [alert, setAlert] = useState<{ open: boolean; message: string; severity: Severity }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showAlert = (message: string, severity: Severity = 'success', duration = 4000) =>
    {
        if (timeoutRef.current)
        {
            clearTimeout(timeoutRef.current);
        }

        setAlert({ open: true, message, severity });

        timeoutRef.current = setTimeout(() =>
        {
            setAlert((prev) => ({ ...prev, open: false }));
        }, duration);
    };

    return (
        <>
            <style>
                {`
                     .toast {
                        position: fixed;
                        bottom: 20px;
                        left: 50%;
                        transform: translateX(-50%);
                        padding: 12px 20px;
                        border-radius: 5px;
                        color: white;
                        font-size: 16px;
                        font-weight: 500;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        cursor: pointer;
                    }
                    
                    .toast-success {
                        background-color: #4caf50;
                    }
                    
                    .toast-error {
                        background-color: #f44336;
                    }
                    
                    .toast-warning {
                        background-color: #ff9800;
                    }
                    
                    .toast-info {
                        background-color: #2196f3;
                    }
                `}
            </style>
            <AlertContext.Provider value={{ showAlert }}>
                {children}
                {alert.open && (
                    <div className={`toast toast-${alert.severity}`}
                         onClick={() => setAlert({ ...alert, open: false })}>
                        {alert.message}
                    </div>
                )}
            </AlertContext.Provider>
        </>
    );
};

export const useAlert = () =>
{
    const context = useContext(AlertContext);
    if (!context)
    {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context.showAlert;
};
