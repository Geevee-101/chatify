import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface AuthUser {
  name: string;
  _id: number;
  age: number;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface AuthStore {
  authUser: AuthUser | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  checkAuth: () => void;
  signup: (data: SignupData) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check")
      set({authUser: res.data})
    } catch (error) {
      console.log("Error checking auth:", error);
      set({authUser: null});
    } finally {
      set({isCheckingAuth: false});
    }
  },

  signup: async (data: SignupData) => {
    set({isSigningUp: true});
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({authUser: res.data});

      toast.success("Signup successful!");
    } catch (error) {
      toast.error(error instanceof AxiosError ? error.response?.data?.message : "Signup failed. Please try again.");
    } finally {
      set({isSigningUp: false});
    }
  }
}));