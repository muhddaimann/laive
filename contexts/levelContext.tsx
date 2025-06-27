import React, { createContext, useContext, useState } from "react";

type Level = 0 | 1 | 2;

type LevelContextType = {
  level: Level;
  setLevel: (level: Level) => void;
};

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export const LevelProvider = ({ children }: { children: React.ReactNode }) => {
  const [level, setLevel] = useState<Level>(0);
  return (
    <LevelContext.Provider value={{ level, setLevel }}>
      {children}
    </LevelContext.Provider>
  );
};

export const useLevel = () => {
  const context = useContext(LevelContext);
  if (!context) throw new Error("useLevel must be used within LevelProvider");
  return context;
};
