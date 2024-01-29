import React, { createContext, useState, useContext, ReactNode } from "react"

interface Notification {
    message: string
    type: "success" | "error"
}

interface NotificationContextType {
    notification: Notification | null
    setNotification: (notification: Notification | null) => void
}

interface PostsProviderProps {
    children: ReactNode
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider")
    }
    return context
}

export const NotificationProvider: React.FC<PostsProviderProps> = ({ children }) => {
    const [notification, setNotification] = useState<Notification | null>(null)
    setTimeout(() => setNotification(null), 2000)
    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}
