import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useAuthStore } from './useAuthStore';

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
  getAllContacts: () => Promise<void>;
  getMyChatPartners: () => Promise<void>;
  getMessagesByUserId: (userId: any) => Promise<void>;
  sendMessage: (messageData: any) => Promise<void>
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
      const res = await axiosInstance('/messages/contacts');
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
      const res = await axiosInstance('/messages/chats');
      set({chats: res.data});
    } catch (error) {
      toast.error(error instanceof AxiosError ? error.response?.data?.message : 'Failed to fetch contacts');
    } finally {
      set({isMessagesLoading: false});
    }
  },
  getMessagesByUserId: async (userId) => {
    set({isMessagesLoading: true});
    try {
      const res = await axiosInstance(`/messages/${userId}`)
      set({messages: res.data})
    } catch (error) {
      toast.error(error instanceof AxiosError ? error.response?.data?.message : 'Failed to fetch messages');
    } finally {
      set({isMessagesLoading: false});
    }
  },
  sendMessage: async(messageData) => {
    const { selectedUser, messages } = get()
    const { authUser } = useAuthStore.getState()

    const tempId = `temp-${Date.now}`

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser?._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    }
    set({messages: [...messages, optimisticMessage]})

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
      set({messages: messages.concat(res.data)})
    } catch (error) {
      set({messages: messages});
      toast.error(error instanceof AxiosError ? error.response?.data?.message : 'Something went wrong');
    }
  }
}));