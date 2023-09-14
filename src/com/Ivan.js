import React, { useState, useEffect, useContext } from 'react'
import {  useLocation } from 'react-router-dom'
import { MyContext } from "../Context"
import Header from './Header';
import axios from 'axios';

export default function Ivan() {
    const {state} = useLocation();
    const {data,fetchFn} = useContext(MyContext);
    useEffect(()=>{ fetchFn('userdata',state.id); },[])

  return (
    <div className='ingame'>
        <Header id={state.id} />
        <main>
            <div className='inves'>{data.map(v=>(<p key={v.id}>{v.nick}</p>))}님의 인벤토리</div>
            <ul>
                <li> [ 아이템 이미지 ] 아이템 명 / 공격력 /</li>
            </ul>
        </main>
    </div>
  )
}
