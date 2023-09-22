import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { MyContext } from '../Context';
import { eqContext } from '../Eqco';

export default function Bank() {
    const {state} = useLocation();
    const {data,fetchFn} = useContext(MyContext);
    let {eq,ft} = useContext(eqContext);
    let [gold,setGold] = useState(0)
    let user=data[0]
    useEffect(()=>{ 
        fetchFn('userdata',state.id);
    },[])

    useEffect(()=>{
        if(eq.length > 0) {
            oksend(gold)
        }
    },[eq])
    
    function sendGold(e){
        e.preventDefault();
        let receiveUser = e.target.receiveUser.value;
        let sendgold = e.target.gold.value;
        if(receiveUser === '' || sendgold === '') { alert("닉네임이나 보내는 골드를 확인해주세요."); return false; }
        if(user.gold < sendgold) {alert("소지금보다 많은 골드를 보낼 수 없습니다."); return false;}
        ft('finduser',{nick:receiveUser})
        setGold(sendgold)
        e.target.receiveUser.value='';
        e.target.gold.value='';
    }

    function oksend(gold){
        setTimeout(()=>{
            if(eq.length <= 0) { alert("닉네임을 확인해주세요."); return false; }
            alert(`${eq[0].nick}님에게 ${Number(gold).toLocaleString()}Gold를 보냇습니다.`)
            let mygold = Number(user.gold) - gold;
            let yougold = Number(eq[0].gold) + Number(gold);
            ft('receive',{nick:eq[0].nick,gold:yougold});
            fetchFn('send',{id:state.id,gold:mygold})
        })
    }

    return (
        <div className='ingame'>
            <Header id={state.id} />
            <main className='bank'>
                <section className='npc'>
                    <img src={`./images/npc/bank.png`} alt='' title='은행 관리인 NPC' />
                    <p> 송금 하려는 유저의 닉네임을 정확하게 입력해주세요!! </p>
                </section>
                보유 골드 : {Number(user.gold).toLocaleString()} Gold
                <form onSubmit={sendGold}>
                    <div>
                        <label>받는 사람 <input type='text' name='receiveUser' /></label>
                        <label>보낼 골드 <input type='number' name='gold' /></label>
                    </div>
                    <input type='submit' value="보내기" />
                </form>
            </main>
            <Footer id={state.id} />
        
        </div>
    )
}