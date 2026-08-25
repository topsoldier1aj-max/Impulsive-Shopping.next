"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { DemoUser } from "@/lib/types";

const STORAGE_KEY = "impulsive_shopping_demo_user";
const UPDATE_EVENT = "impulsive-shopping-user-updated";

// Phase 1 has no real backend/auth — this is a mocked/fake session so the
// UI (login/logout state, admin-only surfaces) has something to react to.
// Real auth would only come in if a (currently unplanned) Phase 2 happens.
// See src/lib/cart-context.tsx for why this reads via useSyncExternalStore
// instead of useState+useEffect.
const DEMO_CUSTOMER: DemoUser = {
  user_id: "1",
  name: "Jordan Demo",
  email: "jordan@example.com",
  role: "customer",
};

const DEMO_ADMIN: DemoUser = {
  user_id: "2",
  name: "Admin Demo",
  email: "admin@example.com",
  role: "admin",
};

let cachedRaw: string | null = null;
let cachedUser: DemoUser | null = null;

function readUser(): DemoUser | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedUser;
  cachedRaw = raw;
  try {
    cachedUser = raw ? JSON.parse(raw) : null;
  } catch {
    cachedUser = null;
  }
  return cachedUser;
}

function writeUser(user: DemoUser | null) {
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(UPDATE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(UPDATE_EVENT, callback);
  };
}

function getServerSnapshot(): DemoUser | null {
  return null;
}

interface AuthContextValue {
  user: DemoUser | null;
  loginAsCustomer: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useSyncExternalStore(subscribe, readUser, getServerSnapshot);

  const loginAsCustomer = useCallback(() => writeUser(DEMO_CUSTOMER), []);
  const loginAsAdmin = useCallback(() => writeUser(DEMO_ADMIN), []);
  const logout = useCallback(() => writeUser(null), []);

  const value = useMemo(
    () => ({ user, loginAsCustomer, loginAsAdmin, logout }),
    [user, loginAsCustomer, loginAsAdmin, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
