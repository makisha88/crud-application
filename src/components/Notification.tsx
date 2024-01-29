import React from "react"
import { useNotification } from "../context/NotificationContext"

const Notification: React.FC = () => {
    const { notification } = useNotification()

    if (!notification) return null

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                right: 0,
                backgroundColor: notification.type === "success" ? "green" : "red",
                color: "white",
                padding: "10px",
            }}
        >
            {notification.message}
        </div>
    )
}

export default Notification
