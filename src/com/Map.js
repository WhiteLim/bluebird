import React from 'react'
import {  useLocation } from 'react-router-dom'
import Header from './Header';

export default function Map() {
    const {state} = useLocation();

  return (
    <div className='ingame'>
        <Header id={state.id} />
        <main className='map'>
            <section>
                <p>훈련장</p>
                <ul>
                    <li> <p>허수아비 (Lv.1)</p> <button>훈련하기</button></li>
                    <li> <p>목각인형 (Lv.5)</p> <button>훈련하기</button></li>
                    <li> <p>나무병정 (Lv.10)</p> <button>훈련하기</button></li>
                    <li> <p>훈련교관 (Lv.20)</p> <button>훈련하기</button></li>
                    <li> <p>칼날의 시험 (Lv.50)</p> <button>훈련하기</button></li>
                </ul>
            </section>
        </main>
    </div>
  )
}
