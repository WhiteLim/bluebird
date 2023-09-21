import {createContext, useReducer} from 'react'
import axios from 'axios';
export const eqContext = createContext();

const red = (state,action)=>{
    switch(action.server){
        case 'insertEq' : return state;
        default : return action.d ;
    }
}

export default function Eqco({children }) {
    const [eq,dis] = useReducer(red, [])

    const instance = axios.create({
        baseURL:`${process.env.REACT_APP_SERVER}`
    })

    const ft = async(server,data)=> {
        let res,at;
        switch(server){
            case 'reset' : at=''; break;
            case 'eqset' : 
                res = await instance.post(`/usereq`, data); 
                at = res.data
            break;
            default : console.log(server,data)
        }
        dis({server,d:at})

        
    }


    //useEffect(()=>{ fetchFn('get') },[])


  return (
    <eqContext.Provider value={{eq,ft}}>
    {children}
    </eqContext.Provider>
  )
}
