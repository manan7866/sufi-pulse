'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { getUserNotifications } from "../services/notifications"; // adjust path
import { Notification } from "@/components/Layouts/NotficationDropdown";
import Cookies from "js-cookie";

type NotificationContextType = {
    allNotifications: Notification[];
    unreadNotifications: Notification[];
    loading: boolean;
    refetch: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const response = await getUserNotifications();
            const data = response.data.notifications as Notification[];
            const sorted = data.sort((a, b) => b.id - a.id);
            setAllNotifications(sorted);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const userId = Cookies.get("user_id");
        if (userId) {
            fetchNotifications();
        }
    }, []);

    const unreadNotifications = allNotifications
        .filter(n => !n.read)
        .slice(0, 4);

    return (
        <NotificationContext.Provider
            value={{ allNotifications, unreadNotifications, loading, refetch: fetchNotifications }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
    return ctx;
};
