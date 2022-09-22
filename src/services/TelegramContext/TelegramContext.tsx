import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const TelegramContext = createContext({ isTelegramShareEnabled: false });

interface TelegramProviderProps {
  children?: ReactNode;
}
interface FeatureFlag {
  isTelegramShareEnabled: boolean;
}

export const TelegramContextProvider = ({
  children,
}: TelegramProviderProps) => {
  const [providerValue, setProviderValue] = useState<FeatureFlag>({
    isTelegramShareEnabled: false,
  });

  useEffect(() => {
    async function getFlag() {
      const response = await fetch("http://localhost:4000/api/feature-flags");
      const data = await response.json();
      setProviderValue(data);
    }
    getFlag();
  }, []);

  return (
    <TelegramContext.Provider value={providerValue}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => {
  return useContext(TelegramContext);
};
