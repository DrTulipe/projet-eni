// LoadingContext.tsx
import React, { createContext, useContext, useState } from "react";
import loadingimage from "../../public/loading.gif";


interface LoadingContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
interface LoadingProviderProps {
  children: React.ReactNode;
}

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("need LoadingProvider");
  }
  return context;
};

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    return (
      <LoadingContext.Provider value={{ loading, setLoading }}>
        {loading && <LoadingOverlay />}
        {children}
      </LoadingContext.Provider>
    );
  };

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-4 bg-white rounded-md">
        <img src={loadingimage} alt="loading"/>
      </div>
    </div>
  );
}

export default LoadingOverlay;
