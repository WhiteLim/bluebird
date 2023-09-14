import React, { useContext, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { MyContext } from "../Context"


export default function Home() {
  const nav = useNavigate()
  const {data,fetchFn} = useContext(MyContext);
    const login = (e)=>{
        e.preventDefault();
        if (e.target.id.value === '' || e.target.pw.value === '') {
          alert("아이디 & 비밀번호를 입력하세요.")
          return false;
        } else {
          fetchFn('login',{id:e.target.id.value,pw:e.target.pw.value});
          return false;
        }
    }

    useEffect(()=>{ 
      if(data.length > 0){ nav('/main/',{state:{id:data[0].id}}); }  
    },[data])
  return (
    <div className='main'>
      <img src="./main.jpg" alt="" />
      <form onSubmit={login}>
        <label><p>아이디 : </p><input type='text' name='id' id='id' placeholder='아이디를 입력해주세요' /></label>
        <label><p>비밀번호 : </p><input type='password' name='pw' id='pw' placeholder='비밀번호를 입력해주세요.' /></label>
        <input type='submit' value="Bluebird Login" />
      </form>
        <Link to='/join'>회원가입</Link>
    </div>
  )
}
