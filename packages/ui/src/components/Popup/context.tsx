import { createContext, type ReactNode, useContext } from 'react'

const PopupContext = createContext({
  onShow: () => {},
})

export function usePopupContext() {
  return useContext(PopupContext)
}

export interface PopupProviderProps {
  onShow: () => void
  children: ReactNode
}

export function PopupProvider({ onShow, children }: PopupProviderProps) {
  return <PopupContext.Provider value={{ onShow }}>{children}</PopupContext.Provider>
}
