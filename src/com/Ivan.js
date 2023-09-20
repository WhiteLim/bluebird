import React, { useEffect, useContext } from 'react'
import {  useLocation } from 'react-router-dom'
import { MyContext } from "../Context"
import Header from '../Header';
import Footer from '../Footer';

export default function Ivan() {
    const {state} = useLocation();
    const {data,fetchFn} = useContext(MyContext);
    useEffect(()=>{ fetchFn('userdata',state.id,'invan'); },[])
    if(!data || data.length <= 1 || data.length !== 2) return <></>;
  return (
    <div className='ingame'>
        <Header id={state.id} />
        <main>
            <div className='inves'>{data[0].map(n=>(<p key={n.id}>{n.nick}</p>))}님의 인벤토리</div>
            <ul className='invan'>
              {
                data[1][state.id].length <= 0 ? <li><p>아이템이없습니다.</p></li> : data[1][state.id].map(v=>(
                  <li key={v.name}> 
                    <p>[ <img src={ `/images/eq/${v.icon}.png`} alt='' width='30px' /> ] </p>
                    <p>{v.name}</p>
                    <p>{v.type === "wa" ? "공격력":"방어력"} : {v.type === "wa" ? v.attr:v.dep}</p> 
                    <p>공격속도 : {v.speed} </p>
                    <p>착용부위 : {v.set}</p>
                    <p>[ {v.st === true ? '장착중' : ''} ]</p>
                  </li>
                ))
              }
                
            </ul>
        </main>
        <Footer id={state.id} />
    </div>
  )
}
