import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

type UserProviderType = {
  isUserInitialized: boolean;
};

const UserProviderContext = createContext<UserProviderType>({
  isUserInitialized: false,
});

const STORAGE_KEYS = {} as const;

export const useUserProvider = () => useContext(UserProviderContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  /***** State ******/
  const [isUserInitialized, setIsUserInitialized] = useState(false);

  useEffect(() => {
    setIsUserInitialized(true);
  }, []);

  return (
    <UserProviderContext.Provider
      value={{
        isUserInitialized,
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};
