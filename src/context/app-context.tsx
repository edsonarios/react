import React, { Dispatch, useReducer } from "react";
import { ItemActions } from "@/reducer/actions";
import { StateProps, initialState } from "@/reducer/initial-state";
import appReducer from '@/reducer/reducer';

type Props = {
  children: JSX.Element;
}

export const AppContext = React.createContext<{state: StateProps, dispatch: Dispatch<ItemActions>}>({ state: initialState, dispatch: () => null});

const AppContextProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;
