"use client"
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface ContextProps {
    projectId: string | null;
    setProjectId: (projectId: string | null) => void;
    authenticated: boolean;
    setAuthenticated: (value: boolean) => void
}

const AppContext = createContext<ContextProps | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [projectId, setProjectId] = useState<string | null>("nirai");
    const [authenticated, setAuthenticated] = useState <boolean> (false);

    const value = {
        projectId,
        setProjectId,
        authenticated,
        setAuthenticated
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};