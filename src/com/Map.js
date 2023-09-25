import React, { useContext, useEffect } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import Header from '../Header';
import Footer from '../Footer';
import { MyContext } from '../Context';

export default function Map() {
    const {state} = useLocation();
    const nav = useNavigate();
    let id = state.id;
    
    const {data,fetchFn} = useContext(MyContext);
    useEffect(()=>{ fetchFn('userdata',id);},[])

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
            <section>
                <p>성 외곽</p>
                <ul>
                    <li> <img src="/images/monster/6.png" alt='' /> <p>온순한 양 (Lv.5)</p> <button onClick={()=>{ battle('m',6) }}>사냥하기</button></li>
                    <li> <img src="/images/monster/7.png" alt='' /> <p>화난 양 (Lv.10)</p> <button onClick={()=>{ battle('m',7) }}>사냥하기</button></li>
                    <li> <img src="/images/monster/8.png" alt='' /> <p>보아뱀 (Lv.15)</p> <button onClick={()=>{ battle('m',8) }}>사냥하기</button></li>
                    <li> <img src="/images/monster/9.png" alt='' /> <p>늑대 (Lv.20)</p> <button onClick={()=>{ battle('m',9) }}>사냥하기</button></li>
                    <li> <img src="/images/monster/10.png" alt='' /> <p>독 나비 (Lv.25)</p> <button onClick={()=>{ battle('m',10) }}>사냥하기</button></li>
                </ul>
            </section>
            <section>
                <p>쥐 굴</p>
                <ul>
                    <li> <img src="/images/monster/11.png" alt='' /> <p>랫맨 (Lv.20)</p> <button onClick={()=>{ battle('m',11) }}>사냥하기</button></li>
                    <li> <img src="/images/monster/12.png" alt='' /> <p>전사 랫맨 (Lv.30)</p> <button onClick={()=>{ battle('m',12) }}>사냥하기</button></li>
                    <li> <img src="/images/monster/13.png" alt='' /> <p>랫맨의 무언가 (Lv.35)</p> <button onClick={()=>{ battle('m',13) }}>사냥하기</button></li>
                    <li> <img src="/images/monster/14.png" alt='' /> <p>동굴 개미 (Lv.20)</p> <button onClick={()=>{ battle('m',14) }}>사냥하기</button></li>
                    <li> <img src="/images/monster/15.png" alt='' /> <p>개미 마법사 (Lv.30)</p> <button onClick={()=>{ battle('m',15) }}>사냥하기</button></li>
                </ul>
            </section>
            <section>
                <p>알수없는 유적</p>
                <ul>
                    <li> <img src="/images/monster/16.png" alt='' /> <p>아누비스 가드 (Lv.40)</p> <button onClick={()=>{ battle('m',16) }}>사냥하기</button></li>
                    <li> <img src="/images/monster/17.png" alt='' /> <p>아누비스의 그리폰 (Lv.40)</p> <button onClick={()=>{ battle('m',17) }}>사냥하기</button></li>
                    <li> <img src="/images/monster/18.png" alt='' /> <p>파이어 웜 (Lv.45)</p> <button onClick={()=>{ battle('m',18) }}>사냥하기</button></li>
                    <li> <img src="/images/monster/19.png" alt='' /> <p>신전 수호자 (Lv.50)</p> <button onClick={()=>{ battle('m',19) }}>사냥하기</button></li>
                    <li> <img src="/images/monster/20.png" alt='' /> <p>봉인된 아누비스 (Lv.60)</p> <button onClick={()=>{ battle('m',20) }}>사냥하기</button></li>
                </ul>
            </section>
            <section>
                <p>황금 골짜기</p>
                <ul>
                    <li> <img src="/images/monster/9998.png" alt='' /> <p>골드젤리 (Lv.70)</p> <button onClick={()=>{ battle('m',9998) }}>사냥하기</button></li>
                    <li> <img src="/images/monster/9999.png" alt='' /> <p>골드 드래곤 (Lv.1200)</p> <button >사냥하기</button></li>
                </ul>
            </section>
        </main>
        <Footer id={state.id} />
    </div>
  )
}
