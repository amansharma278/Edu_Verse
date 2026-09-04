import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type UserRole = "student" | "instructor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  authenticateUser: (userData: BackendUser, token?: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

interface BackendUser {
  _id?: string;
  id?: string;
  firstName: string;
  lastName?: string;
  email: string;
  accountType: string;
  image?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("eduverse-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("eduverse-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("eduverse-user");
    }
  }, [user]);

  const authenticateUser = (userData: BackendUser, token?: string) => {
    const normalizedRole = userData.accountType.toLowerCase() as UserRole;
    const authenticatedUser: User = {
      id: userData._id || userData.id || "",
      name: `${userData.firstName} ${userData.lastName || ""}`.trim(),
      email: userData.email,
      role: normalizedRole,
      avatar: userData.image,
      joinedDate: new Date().toISOString(),
    };

    if (token) {
      localStorage.setItem("eduverse-token", token);
    }
    setUser(authenticatedUser);
  };

  const login = async (email: string, password: string, role: UserRole) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to log in");
    }

    const backendRole = data.user.accountType.toLowerCase() as UserRole;
    if (backendRole !== role) {
      throw new Error(`This account is registered as ${backendRole}`);
    }

    authenticateUser(data.user, data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eduverse-token");
    localStorage.removeItem("eduverse-user");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        authenticateUser,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
