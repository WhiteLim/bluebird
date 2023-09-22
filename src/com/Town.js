import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MyContext } from '../Context';

export default function Town() {
    const {state} = useLocation();
    const move = useNavigate()
    const {data,fetchFn} = useContext(MyContext);
    useEffect(()=>{ fetchFn('town'); },[])
    const ready = ()=>{alert("아직 오픈전입니다.!!")}

    function writetown(e){
        e.preventDefault();
        let date = new Date();
        let day = date.getDate();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let wrDate = `${month}.${day}`
        let msg = e.target.msg.value;
        fetchFn('townWr',{no:'',id:state.id,nick:'',date:wrDate,msg})
        e.target.msg.value=''
    }

    function gotown(link){  move(`/${link}`,{state:{id:state.id}}) }

    if(!data || data.length <= 0 ) return <></>;
  return (
    <div className='ingame'>
        <Header id={state.id} />
        <main >
            <div className='town'>
                <section>
                    <button onClick={()=>{ gotown('temple') }}> 신전 </button>
                    <button onClick={()=>{ gotown('store') }}> 상점 </button>
                    <button onClick={ready}> 대장간 </button>
                </section>
                <section className='townmap'>
                    <img src="./images/town.jpg" alt='Town' />
                    <div>
                        <div>
                            <p>- 신전은 신을 섬기고 기도 드리는 곳 입니다.</p>
                            <p>- 상점은 무기, 방어구를 Gold로 구매 할 수 있습니다.</p>
                            <p>- 에고웨폰을 제작 할 수 있습니다.</p>
                        </div>
                        <div>
                            <p>퀘스트를 수령하고 완료 할 수 있습니다. -</p>
                            <p>랭킹을 확인 할 수 있습니다. -</p>
                            <p>유저간 골드 송금-</p>
                        </div>
                    </div>
                </section>
                <section>
                    <button onClick={ready}> 모험가 길드 </button>
                    <button onClick={()=>{ gotown('ranking') }}> 명예의전당 </button>
                    <button onClick={()=>{ gotown('bank') }}> 은행 </button>
                </section>
            </div>
            <div className="townlog">
                <p> 광장 </p>
                <form onSubmit={writetown}>
                    <input type='text' name='msg' /> <input type='submit' value='전송' />
                </form>
                <section>
                    {
                        data && data.slice(0, 10).map((v,k)=>(
                            <p key={k}><span>{v.nick} - {v.msg}</span> <code>{v.date}</code></p>
                        ))
                    }
                </section>
            </div>
        </main>
        <Footer id={state.id} />
    </div>
  )
}
