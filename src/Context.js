import {createContext, useEffect, useReducer} from 'react'
import axios from 'axios';
export const MyContext = createContext();

const reducer = (state,action)=>{
    switch(action.type){
        default : return action.d ;
    }
}

export default function Context({children }) {
    const [data,dispatch] = useReducer(reducer, [])

    const instance = axios.create({
        baseURL:`${process.env.REACT_APP_SERVER}`
    })

    const fetchFn = async(type,data)=> {
        let res;
        switch(type){
            case 'login' : 
                res = await instance.get(`/user/login/${data.id}/${data.pw}`); 
            break;
            case 'join' : 
                res = await instance.post(`/user/insert`,data);
            break;
            case 'userdata' : 
                res = await instance.get(`/user/${data}`);
            break;
            case 'upstate' : 
            res = await instance.put(`/user/state/`,data);
            break;
            case 'list' : 
            res = await instance.get(`/user`);
            break;
            default : console.log('not'); ;
        }
        
        dispatch({type, d:res.data})
    }


    //useEffect(()=>{ fetchFn('get') },[])


  return (
    <MyContext.Provider value={{data,fetchFn}}>
    {children}
    </MyContext.Provider>
  )
}
