import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header({id}) {
    const nav = useNavigate();
    const maingo = ()=>{ nav(`/main`,{state : {id:id}}) }


  return (
    
    <header>
        <figure><img src="../main.jpg" alt="" onClick={maingo} /></figure>
        <ul>
            <li><Link to="/main" state={{id:id}}>캐릭터정보</Link></li>
            <li><Link to="/main/invan" state={{id:id}}>인벤토리</Link></li>
            <li><Link to="/main/map" state={{id:id}}>사냥터</Link></li>
            <li>마을</li>
            <li>실시간 채팅</li>
        </ul>
    </header>
  )
}
