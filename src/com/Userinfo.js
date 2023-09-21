import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from "../Context"
import Header from '../Header';
import Footer from '../Footer';
import { eqContext } from '../Eqco';

export default function Userinfo({id}) {
    const {data,fetchFn} = useContext(MyContext);
    let {eq,ft} = useContext(eqContext);
    useEffect(()=>{ fetchFn('userdata',id); ft('reset') },[])
    function upstate(value) { fetchFn('upstate',{id,state:value}); }

    function grade(num){ return num <= '20' ? 'F' : num <= '50' ? 'E' : num <= '100' ? 'd' : num <= '150' ? 'B' : 'A'; } 
    
    function eqset(eqname) { 
        ft('eqset',{id,eqname}); 
        const find = document.querySelector('.eqpop')
        find.style.display='block';
    }
    
    function setItem({data}){ 
        fetchFn('insertEq',data)
        const find = document.querySelector('.eqpop')
        find.style.display='none';
    }
    
    function eqclose(){
        const find = document.querySelector('.eqpop')
        find.style.display='none';
    }
    
    
    if(!data || data.length <= 0 || data.length > 1) return <></>;
  
    
  return (
    <div className='ingame'>
        <Header id={id} />
        {
            data.map((v)=>(
                <main className='userstaters' key={v.id}>
                    <div className='userinfo'>
                        <div className='usericon'>
                            <img src={`/images/usericon/${v.usericon}.png`} alt='' />
                            <p>체력 : { Math.floor(Number(v.maxhp) + ( Number(v.hea) + ( Number(v.hea) * Number(v.prea)) )) } </p>
                            <p>마력 : { Math.floor(Number(v.maxmp) + ( Number(v.maind) + ( Number(v.maind) * Number(v.prea))) ) }</p>
                        </div>
                        <div className='userdata'>
                            <p>닉네임 : {v.nick}</p>
                            <p>레벨 : { Number(v.lv) } </p>
                            <p>경험치 : { Number(v.exp).toLocaleString() }/{ Number(v.nextexp).toLocaleString() }</p>
                            <p>소지금액 : { Number(v.gold).toLocaleString() }Gold</p>
                            <p>블루페이 : { Number(v.vippay) }Pay</p>
                            <p>소속진형 : { v.emp === 'devil' ? '환영사제단(그림 리퍼블릭)' : '신성제국(크로니우스)' }</p>
                            <p>섬기는 신 : <span><img src={`/images/godicon/${v.god === '' ? 0 : v.god}.png`} alt={`${v.god === '' ? '무소속' : v.god}`} title={`${v.god === '' ? '무소속' : v.god}`}  width="40px"/>{ v.god === '' ? '아직 섬긴는 신이 없습니다.' : v.god }</span></p>
                            <p>신앙심 : { Number(v.prea) }</p>
                        </div>
                    </div>
                    <div className="userstate">
                        <ul>
                            <li> 레벨업 포인트 : { Number(v.point) } </li>
                            <li> 근력 : { Number(v.str).toLocaleString() } ({grade(Number(v.str))}) { v.point > 0 ? <button onClick={()=>{ upstate('str') }}> 근력 Up! </button> : '' }</li>
                            <li> 민첩 : { Number(v.dex).toLocaleString() } ({grade(Number(v.dex))}) { v.point > 0 ? <button onClick={()=>{ upstate('dex') }}> 민첩 Up! </button> : '' }</li>
                            <li> 건강 : { Number(v.hea).toLocaleString() } ({grade(Number(v.hea))}) { v.point > 0 ? <button onClick={()=>{ upstate('hea') }}> 건강 Up! </button> : '' }</li>
                            <li> 행운 : { Number(v.luk).toLocaleString() } ({grade(Number(v.luk))}) { v.point > 0 ? <button onClick={()=>{ upstate('luk') }}> 행운 Up! </button> : '' }</li>
                            <li> 지능 : { Number(v.int).toLocaleString() } ({grade(Number(v.int))}) { v.point > 0 ? <button onClick={()=>{ upstate('int') }}> 지능 Up! </button> : '' }</li>
                            <li> 지혜 : { Number(v.wis).toLocaleString() } ({grade(Number(v.wis))}) { v.point > 0 ? <button onClick={()=>{ upstate('wis') }}> 지혜 Up! </button> : '' }</li>
                            <li> 정신 : { Number(v.maind).toLocaleString() } ({grade(Number(v.maind))}) { v.point > 0 ? <button onClick={()=>{ upstate('maind') }}> 정신 Up! </button> : '' }</li>                            
                        </ul>
                    </div>
                    <div className='usereq'>
                        <div>
                            <p>머리 : <img src={`./images/eq/${v.hat?.icon}.png`} alt='' /> {v.hat?.name}<br/>[방어력:{v.hat?.magic}|스피드:{v.hat?.speed}] <button onClick={()=> eqset('hat')}>장착</button></p>
                            <p>갑옷 : <img src={`./images/eq/${v.arm?.icon}.png`} alt='' /> {v.amr?.name}<br/>[방어력:{v.arm?.magic}|스피드:{v.arm?.speed}] <button onClick={()=> eqset('arm')}>장착</button></p>
                            <p>장갑 : <img src={`./images/eq/${v.hand?.icon}.png`} alt='' />{v.hand?.name}<br/>[방어력:{v.hand?.magic}|스피드:{v.hand?.speed}] <button onClick={()=> eqset('hand')}>장착</button></p>
                            <p>신발 : <img src={`./images/eq/${v.boot?.icon}.png`} alt='' />{v.boot?.name}<br/>[방어력:{v.boot?.magic}|스피드:{v.boot?.speed}] <button onClick={()=> eqset('boot')}>장착</button></p>
                        </div>
                        <div>
                            <p>무기 : <img src={`./images/eq/${v.wa?.icon}.png`} alt='' />{v.wa?.name}<br/>[공격력:{v.wa?.magic}|스피드:{v.wa?.speed}] <button onClick={()=> eqset('wa')}>장착</button></p>
                            <p>보조아이템 : <img src={`./images/eq/${v.sub?.icon}.png`} alt='' />{v.sub?.name}<br/>[공격력:{v.sub?.magic}|스피드:{v.sub?.speed}] <button onClick={()=> eqset('sub')}>장착</button></p>
                        </div>
                        <div className='userconfig'>
                            <p>총 공격력 : { Math.floor( 100 + (Number(v.str) + ( Number(v.str) * 0.5)) + Number(!v.wa?.magic ? 0 : v.wa.magic) ).toLocaleString() }</p>
                            <p>총 방어력 : { Math.floor( 50 + (Number(v.hea) + ( Number(v.hea) * 0.5)) + Number(!v.hand?.magic ? 0 : v.hand.magic) + Number(!v.hat?.magic ? 0 : v.hat.magic) + Number(!v.arm?.magic ? 0 : v.arm.magic) + Number(!v.boot?.magic ? 0 : v.boot.magic) ).toLocaleString() }</p>
                            <p>회피율 :  { Math.floor( 10 + ((Number(v.luk) + (Number(v.luk)*0.2) ) * 0.2) ).toLocaleString()}</p>
                            <p>명중률 : { Math.floor( 10 + ((Number(v.dex) + (Number(v.dex)*0.2) ) * 0.2) ).toLocaleString()}</p>
                            <p>공격속도 : { Math.floor(Number(v.dex) + Number(!v.wa?.speed ? 0 : v.wa.speed) + Number(!v.hand?.speed ? 0 : v.hand.speed) + Number(!v.hat?.speed ? 0 : v.hat.speed) + Number(!v.arm?.speed ? 0 : v.arm.speed) + Number(!v.boot?.speed ? 0 : v.boot.speed) )}</p>
                        </div>
                        <div className="eqpop">
                            <p>아이템 선택</p>
                            {
                                eq && eq?.map((d,num)=>(
                                    !eq[num].state ? 
                                        eq[num].state === 'noItem' ? <p key={eq}>장착 가능한 아이템이 없습니다.</p> :
                                        <div key={num}>
                                            <p>{d.name}</p>
                                            <p>{ d.type === "wa" ? `공격력:${d.attr}` : `방어력:${d.dep}` }</p>
                                            <p>공격속도 : {d.speed}</p>
                                            <button onClick={()=> { setItem({data:{userId:v.id,type:d.type,id:d.id,attr:d.attr,dep:d.dep,speed:d.speed,icon:d.icon}}) }}>장착</button>
                                        </div>
                                        
                                    : <p>장착 가능한 아이템이 없습니다.</p>
                                ))
                            }
                            <button onClick={eqclose}>닫기</button>
                        </div>
                    </div>
                </main>
            ))
        }
         <Footer id={id} />
     </div>
  )
}
