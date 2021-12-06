import {useState} from "react"
type greetProp={
    name:string,
    isLoggedIn:boolean,
    email:string,
    person:{
first:string,
last:string
    }[]
}

type Auth={
name:string,
email:string
}

const Greet = (props:greetProp ) => {
    const [state, setstate] = useState<boolean>(false)
    const [user] = useState<null|Auth>(null)
    
    const handleClick=()=>{
        setstate(!state)
    
    }
    return (
        <>
        <div>
                Welcome { state? props.name  :"Guest"}
        </div>
        {state&&user?
         
     
               props.person.map((i,index)=>{

                   return (<p key={index}>{i.first}</p>)
                   
               }):null
  }
  {
      state?<div>
      your name is {props.name} and email is {user?.email}
  </div> :null
  }
          
           <button onClick={handleClick}>{state?"logout": "Login"}</button>
           </>
    )
}
export default Greet