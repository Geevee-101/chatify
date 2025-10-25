import {create} from "zustand";

interface AuthUser {
  name: string;
  _id: number;
  age: number;
}

interface AuthStore {
  authUser: AuthUser;
  isLoggedIn: boolean;
  login: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: { name: "john", _id: 123, age: 25 },
  isLoggedIn: false,

  login: () => {
      console.log("We just logged in");
      set({ isLoggedIn: true });
  },
}));