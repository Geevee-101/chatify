import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { io, Socket } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

const SOCKET_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : import.meta.env.VITE_SOCKET_URL ||
      (API_URL ? API_URL.replace(/\/api\/?$/, "") : "/");

interface AuthUser {
  name: string;
  _id: number;
  age: number;
  profilePic: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthStore {
  authUser: AuthUser | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  socket: Socket | null;
  onlineUsers: string[];
  checkAuth: () => void;
  signup: (data: SignupData) => void;
  login: (data: LoginData) => void;
  logout: () => void;
  updateProfile: (data: Partial<AuthUser>) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: SignupData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      toast.success("Signup successful!");

      get().connectSocket();
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message
          : "Sign up failed. Please try again.",
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: LoginData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message
          : "Log in failed. Please try again.",
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message
          : "Log out failed. Please try again.",
      );
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Profile update error:", error);
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message
          : "Profile update failed. Please try again.",
      );
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.connect();

    set({ socket }); // socket: socket

    socket.on("connect_error", (err) => {
      console.log("Socket connect_error:", err?.message || err);
    });

    // listen for online users event
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
