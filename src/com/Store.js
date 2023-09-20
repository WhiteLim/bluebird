import React, { useContext, useEffect,  useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { MyContext } from '../Context';


export default function Store() {
    const {state} = useLocation();
    const {data,fetchFn} = useContext(MyContext);
    const [eq,setEq] = useState();
    useEffect(()=>{ 
        fetchFn('userdata',state.id);
        axios.get('./data/eq.json')
        .then(res=>{ setEq(res.data) })
    },[])
    let user = data[0];

    if(!data || data.length <= 0 || data.length > 1 || !eq || eq.length <= 0) return <></>;
    let eqList = ['wa','hat','arm'];

    function buy(eqData){
        fetchFn('invanadd',[state.id,eqData]);
        alert(`${eqData.name} 구매 (${eqData.gold} Gold 소모) \n Notice. 이미 소지한 아이템은 구매가 이뤄지지 않습니다.`)
    }

    function eqSet(cn) {
        const findLi = document.querySelectorAll('.storelist > ul li');
        findLi.forEach((v,k)=>{
            v.classList.remove('remove');
            if(cn === "all") {
                v.classList.remove('remove');
            } else if(!v.classList.contains(cn)){
                v.classList.add('remove');
            }
        })
    }
    
  return (
    <div className='ingame'>
        <Header id={state.id} />
        <main className='store'>
            <section className='npc'>
                <img src={`./images/npc/${user.emp === 'ang' ? 'store_Anpc.png' : 'store_Dnpc.png'}`} alt='' title='상점 NPC' />
                <p> 어서오세요. 찾는 물건이 있으신가요?<br /> 이미 소지한 아이템은 구매가 이뤄지지 않습니다.</p>
            </section>
            <section className='userdata'>
                {user.nick}님의 보유 골드 : {user.gold.toLocaleString()} Gold
            </section>
            <section className='storelist'>
                <nav>
                    <span onClick={()=>eqSet('all')}>전체보기</span>
                    <span onClick={()=>eqSet('wa')}>무기</span>
                    <span onClick={()=>eqSet('hat')}>머리</span>
                    <span onClick={()=>eqSet('arm')}>갑옷</span>
                    <span onClick={()=>eqSet('hand')}>장갑</span>
                    <span onClick={()=>eqSet('boot')}>신발</span>
                    <span onClick={()=>eqSet('sub')}>보조아이템</span>
                </nav>
                <ul>
                    {
                        eqList.map((v,k)=>(
                            eq[eqList[k]].map(z=>(
                                <li className={eqList[k]} key={z.id} >
                                    <p><img src={`./images/eq/${z.icon}.png`} alt='' /></p>
                                    <p>아이템 명 : {z.name}</p>
                                    <p>{!z.attr ? `방어력 : ${z.dep}` : `공격력 : ${z.attr}`}</p>
                                    <p>추가 공격속도 : {z.speed}</p>
                                    <p>장착 부위 : {z.set}</p>
                                    <p>판매금액 : {z.gold} Gold</p>
                                    <p><button onClick={()=>{ buy({type:eqList[k],icon:z.icon,id:z.id,name:z.name,attr:z.attr,dep:z.dep,speed:z.speed,set:z.set,gold:z.gold,st:false}) }}>구매하기</button></p>
                                </li>
                            ))
                        ))
                    }
                </ul>
            </section>
        </main>
        <Footer id={state.id} />
    </div>
  )
}
