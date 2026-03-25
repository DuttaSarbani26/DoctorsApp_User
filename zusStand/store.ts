import { create } from "zustand";
import { Cookies } from "react-cookie";

interface UserState {
  token: string | null;
  refreshToken: string | null;
  setTokenAndUser: (token: string, refreshToken?: string) => void;
  logout: () => void;
  initializeToken: () => void;
}

const useUserStore = create<UserState>((set) => ({
  token: null,
  refreshToken: null,

  setTokenAndUser: (token, refreshToken) => {
    const cookie = new Cookies();
    if (token) {
      cookie.set("token", token, { path: "/" });
    }
    if (refreshToken) {
      cookie.set("refreshToken", refreshToken, { path: "/" });
    }
    set({ token, refreshToken });
  },

  logout: () => {
    const cookie = new Cookies();
    cookie.remove("token", { path: "/" });
    cookie.remove("refreshToken", { path: "/" });
    set({ token: null, refreshToken: null });
  },

  initializeToken: () => {
    if (typeof window !== "undefined") {
      const cookie = new Cookies();
      const token = cookie.get("token") || null;
      const refreshToken = cookie.get("refreshToken") || null;
      set({ token, refreshToken });
    }
  },
}));

export default useUserStore;
