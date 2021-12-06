import {createContext,ReactNode} from "react"
import { theme } from "./theme"


type props={
    children: ReactNode
}
export const ThemeContext = createContext(theme)
 const Context = ({children}:props) => {
    return (
       <ThemeContext.Provider value={theme}>
           {children}
           </ThemeContext.Provider>
    )
}
export default Context
