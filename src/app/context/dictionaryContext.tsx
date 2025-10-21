'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import { Command } from '@/app/lib/definitions';

// Define the type for the context value
export interface CommandContextType {
  commands: Command[];
  setCommands: React.Dispatch<React.SetStateAction<Command[]>>;
  viewHeader: boolean;
  setViewHeader : (value : boolean) => void;
  viewFooter: boolean;
  setViewFooter : (value : boolean) => void;
}

// Create the context with an initial value of undefined
export const CommandContext = createContext<CommandContextType | undefined>(undefined);

// Define the provider props type
interface CommandProviderProps {
  children: ReactNode;
}

export function CommandProvider({ children }: CommandProviderProps) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [viewHeader, setViewHeader] = useState<boolean>(true);
  const [viewFooter, setViewFooter] = useState<boolean>(true);

  return (
    <CommandContext.Provider value={{ commands, setCommands, viewHeader, viewFooter, setViewHeader, setViewFooter  }}>
      {children}
    </CommandContext.Provider>
  );
}

// Custom hook to use the Command context
export function useCommand() {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error('useCommand must be used within an CommandProvider');
  }
  return context;
}
