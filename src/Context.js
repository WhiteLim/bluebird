import {createContext, useReducer} from 'react'
import axios from 'axios';
export const MyContext = createContext();

const reducer = (state,action)=>{
    switch(action.type){
        case 'battle' : return state;
        default :
            if(action.subtype === 'invan'){ return [action.d,action.i];
            }else{ return action.d  }
        ;
    }
}

export default function Context({children }) {
    const [data,dispatch] = useReducer(reducer, [])

    const instance = axios.create({
        baseURL:`${process.env.REACT_APP_SERVER}`
    })

    const fetchFn = async(type,data,subtype)=> {
        let res,invan;
        switch(type){
            case 'login' : 
                res = await instance.get(`/user/login/${data.id}/${data.pw}`); 
            break;
            case 'join' : 
                res = await instance.post(`/user/insert`,data);
            break;
            case 'userdata' : 
                res = await instance.get(`/user/${data}`);
                if(subtype === 'invan')  invan = await instance.get(`/invan/${data}`);
            break;
            case 'upstate' : 
            res = await instance.put(`/user/state/`,data);
            break;
            case 'list' : 
            res = await instance.get(`/user`);
            break;
            case 'notice' : 
            res = await instance.get(`/notice`);
            break;
            case 'noticede' : 
            res = await instance.get(`/noticede/${data}`);
            break;
            case 'battle' : 
            res = await instance.post(`/battle`,data);
            break;
            case 'town' : 
            res = await instance.get(`/town`);
            break;
            case 'townWr' : 
            res = await instance.post(`/townWr`,data);
            break;
            case 'invanadd' : 
            res = await instance.post(`/buy`,data);
            break;
            case 'insertEq' :
                res = await instance.post(`/userInsert`, data); 
            break;
            case 'godselect' :
                res = await instance.post(`/god`, data); 
            break;
            case 'prea' :
                res = await instance.post(`/prea`, data);
            break;
            default : console.log('not'); ;
        }
        subtype !== 'invan' ? dispatch({type, d:res.data}) : dispatch({type, d:res.data, i:invan.data, subtype});
        
    }


    //useEffect(()=>{ fetchFn('get') },[])


  return (
    <MyContext.Provider value={{data,fetchFn}}>
    {children}
    </MyContext.Provider>
  )
}
