import React from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import Header from '../Header';
import Footer from '../Footer';

export default function Map() {
    const {state} = useLocation();
    const nav = useNavigate();
    function battle(type,id){ nav('/battle',{state:{id:state.id,type,monster:id}}) }

  return (
    <div className='ingame'>
        <Header id={state.id} />
        <main className='map'>
            <section>
                <p>훈련장</p>
                <ul>
                    <li> <img src="/images/monster/1.png" alt='' /> <p>허수아비 (Lv.1)</p> <button onClick={()=>{ battle('m',1) }}>훈련하기</button></li>
                    <li> <img src="/images/monster/2.png" alt='' /> <p>목각인형 (Lv.5)</p> <button onClick={()=>{ battle('m',2) }}>훈련하기</button></li>
                    <li> <img src="/images/monster/3.png" alt='' /> <p>나무병정 (Lv.10)</p> <button onClick={()=>{ battle('m',3) }}>훈련하기</button></li>
                    <li> <img src="/images/monster/4.png" alt='' /> <p>훈련교관 (Lv.20)</p> <button onClick={()=>{ battle('m',4) }}>훈련하기</button></li>
                    <li> <img src="/images/monster/5.png" alt='' /> <p>칼날의 시험 (Lv.50)</p> <button onClick={()=>{ battle('m',5) }}>훈련하기</button></li>
                </ul>
            </section>
        </main>
        <Footer id={state.id} />
    </div>
  )
}
