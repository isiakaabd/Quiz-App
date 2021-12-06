import {createContext,ReactNode} from "react"
import {useState} from "react"

export const Auth={
    name:"Sule",
    email:"sule@gmail.com"
}
type AuthType={
name:string,
email:string
}
type props={
    children: ReactNode
}
type valueprops={
    state:AuthType |null,
    setstate:React.Dispatch<React.SetStateAction<AuthType | null>>
}
export const AuthContext = createContext<valueprops |null>(null)
 const UserContext = ({children}:props) => {
     const [state, setstate] = useState<null |AuthType>(null)
    return (
       <AuthContext.Provider value={{state,setstate}}>
           {children}
           </AuthContext.Provider>
    )
}
export default UserContext
