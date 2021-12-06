 import { useReducer ,useContext} from "react"
import { ThemeContext } from "./Context"


 type countState={
     count:number
 }
 type incOrDecState={
     type:"increment"  |"decrement",
     payload:number
 }
 type resetState={
     type:"reset"
 }
const initialState={
    count: 10
}
type actionState = incOrDecState |resetState
const reducer=(state:countState,action:actionState)=>{
    switch (action.type) {
        case "increment":
            return {count:state.count+ action.payload}
          case"decrement":
          return{count:state.count- action.payload}
          case"reset":
          return initialState
        default:
            return state;
            
    }
}
const Reducer = () => {
    const theme=  useContext(ThemeContext)
    const color={
        background:theme.secondary.text}
const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <div style={color}>
            <span style={{color:theme.primary.text}}>{state.count}</span>
<div>

            <button onClick={()=>dispatch({type:"increment", payload:12})}>increase</button>
</div>
<div>

            <button onClick={()=>dispatch({type:"reset"})}>reset</button>
</div>
            <button onClick={()=>dispatch({type:"decrement", payload:12})}>decrease</button>
        </div>
    )
}

export default Reducer