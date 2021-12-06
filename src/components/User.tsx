import {useContext} from "react"
import { Auth, AuthContext } from "./UserContent"
import {useState} from "react"

type stateProp=boolean
const User = () => {
     const user =useContext(AuthContext)
  const [state, setState] = useState<stateProp>(false)
   
     const handleClick=()=>{
        
         if(state &&user){
            user.setstate(null)
            setState(!state)
         }else if(!state&&user){
            user.setstate(Auth)
            setState(!state)
         }
    } 

    return (
        <>
        <div>
                Welcome {user? user?.state?.name  :"Guest"}
        </div>
        {user?.state?   `your name is ${Auth.name} and email is ${Auth?.email}`:null}
   
           <button  onClick={handleClick}>{user && state?"Logout": "Login"}</button>
           </>
    )
}
export default User