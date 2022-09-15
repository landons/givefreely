import * as React from 'react';

interface IProps {
  children: React.ReactNode;
}

interface IContext {
  getJson: <T extends object>(path: string, options?: RequestInit) => Promise<T>;
}

// TODO: move to environment/config
const BASE_URL = 'http://localhost:3000';

const ApiContext = React.createContext<IContext>({
  getJson: async () => {
    throw new Error('ApiProvider context not initialized!');
  },
});

export const ApiProvider = ({ children }: IProps) => {
  const value: IContext = {
    getJson: async <T extends object>(path: string, options?: RequestInit): Promise<T> => {
      const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        method: 'GET',
        headers: {
          ...(options?.headers || {}),
          Accept: 'application/json',
        },
      });
      return await response.json() as T;
    },
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => React.useContext(ApiContext);
