import React, { useEffect, useContext } from 'react'
import {  useLocation } from 'react-router-dom'
import { MyContext } from "../Context"
import Header from '../Header';
import Footer from '../Footer';

export default function Ivan() {
    const {state} = useLocation();
    const {data,fetchFn} = useContext(MyContext);
    useEffect(()=>{ fetchFn('userdata',state.id,'invan'); },[])

    if(!data || data.length <= 1) return <></>;
  return (
    <div className='ingame'>
        <Header id={state.id} />
        <main>
            <div className='inves'>{data[0].map(n=>(<p key={n.id}>{n.nick}</p>))}님의 인벤토리</div>
            <ul className='invan'>
              {
                data[1][state.id].map(v=>(
                  <li key={v.id}> 
                    [ <img src={ `/images/eq/${v.img}.png`} alt='' width='30px' /> ]
                     {v.name} / 
                     {v.cate === "w" ? "공격력":"방어력"} : {v.att} / 
                     착용부위 : {v.set === "wapon1" ? "무기1" : "무기2"} / 
                     타입 : {v.type} / 
                     부가기능 : {v.magic === '' ? "부가기능없음" : v.magic}
                  </li>
                ))
              }
                
            </ul>
        </main>
        <Footer id={state.id} />
    </div>
  )
}
