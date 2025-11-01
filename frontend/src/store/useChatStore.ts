import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

interface ChatStore {
    allContacts: Array<any>;
    chats: Array<any>;
    messages: Array<any>;
    activeTab: 'chats' | 'contacts';
    selectedUser: any;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
    isSoundEnabled: boolean;
    toggleSound: () => void;
    setActiveTab: (tab: 'chats' | 'contacts') => void;
    setSelectedUser: (selectedUser: any) => void;
}

export const useChatStore = create<ChatStore>((set,get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: 'chats',
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem('isSoundEnabled') === 'true' || false,

    toggleSound: () => {
        localStorage.setItem('isSoundEnabled', String(!get().isSoundEnabled));
        set({ isSoundEnabled: !get().isSoundEnabled });
    },

    setActiveTab: (tab) => set({activeTab: tab}),
    setSelectedUser: (selectedUser) => set({selectedUser}),
    getAllContacts: async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance('/api/contacts');
            set({allContacts: res.data});
        } catch (error) {
            toast.error(error instanceof AxiosError ? error.response?.data?.message : 'Failed to fetch contacts');
        } finally {
            set({isUsersLoading: false});
        }
    },
    getMyChatPartners: async () => {
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance('/api/chats');
            set({chats: res.data});
        } catch (error) {
            toast.error(error instanceof AxiosError ? error.response?.data?.message : 'Failed to fetch contacts');
        } finally {
            set({isMessagesLoading: false});
        }
    },
}));