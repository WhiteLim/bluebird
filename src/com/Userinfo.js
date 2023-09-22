import React, { useContext, useEffect, useRef, useState } from 'react'
import { MyContext } from "../Context"
import Header from '../Header';
import Footer from '../Footer';
import { eqContext } from '../Eqco';

export default function Userinfo({id}) {
    const {data,fetchFn} = useContext(MyContext);
    let {eq,ft} = useContext(eqContext);
    useEffect(()=>{ fetchFn('userdata',id); ft('reset') },[])
    let godList = ["아스트라이아","벨라도르","세레니스","제피루스","아우레오스","엘리오스","에델라인","이리디아","데모스카"]
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
    
    const newbi = useRef()
    
    if(!data || data.length <= 0 || data.length > 1) return <></>;
  
    let user = data[0];
    function newbicolse(){ newbi.current.style.display='none' }
  return (
    <div className='ingame'>
        <Header id={id} />
        {
            user.exp <= 0 ?
            <div className='newbi' ref={newbi}> 
                <div>
                    <img src="./images/usericon/frame-1.png" alt='' />
                    <p>[성물전쟁 - 블루버드]는 자율 육성 게임에 오신것을 환영합니다.</p>
                    <p>초보 모험가님을 위해 파견된 GM백림입니다.!</p>
                    <p>처음 게임에 접속하신 초보 모험가님은 아래 [ 닫기 ] 버튼을 누른 후</p>
                    <p>[ 사냥터 ] 로 가셔서 [ 허수아비 ]를 잡아주세요</p>
                    <p>[ 레벨업 ] 안내를 받으면 캐릭터 정보에서 원하는 스텟을 올려주세요.</p>
                    <p></p>
                    <p>10레벨이 부터는 신전에서 [ 신 ] 을 선택 할 수 있습니다.</p>
                    <p>마음에 드는 신을 선택 후 [ 기도 ] 를 하면 스텟이 추가로 더 오릅니다!</p>
                    <p>그럼 즐겁게 게임을 즐겨주세요~</p>
                    <span>본 초보자 가이드 팝업은 1회 사냥 전까지 게속 표시 됩니다.</span>
                    <button onClick={newbicolse}>닫기</button>
                </div>
            </div>
            : ''
        }
        <main className='character'>
            <div className='ch-info'>
                <figure>
                    <p><img src={`/images/usericon/${user.usericon}.png`} alt='' title='' /></p>
                    <figcaption>
                        <p>
                            <img src={`/images/godicon/${user.god === '' ? 0 : user.god}.png`} alt={`${user.god === '' ? '무소속' : user.god}`} title={`${user.god === '' ? '무소속' : user.god}`}  width="20px"/>
                            {user.nick} <span> ({ user.emp === 'devil' ? '환영사제단(그림 리퍼블릭)' : '신성제국(크로니우스)' }) </span> 
                        </p>
                        <p> 
                            Lv. {user.lv} <span> ( exp. {user.exp}/{user.nextexp} ) </span>
                            <span>HP [ { Math.floor(Number(user.maxhp) + ( Number(user.hea) + ( Number(user.hea) * 10.25) )) } ] </span>
                            <span>MP [ { Math.floor(Number(user.maxmp) + ( Number(user.maind) + ( Number(user.maind) * 10.25)) ) } ] </span>
                        </p>
                    </figcaption>
                </figure>
                <section className='ch-st'>
                    <p>Point [ {user.point} ]</p>
                    <ul>
                        <li>힘 [ { Number(user.str).toLocaleString() } ({grade(Number(user.str))}) ] { user.point > 0 ? <button onClick={()=>{ upstate('str') }}> + </button> : '' }</li>
                        <li>민첩 [ { Number(user.dex).toLocaleString() } ({grade(Number(user.dex))}) ] { user.point > 0 ? <button onClick={()=>{ upstate('dex') }}> + </button> : '' }</li>
                        <li>건강 [ { Number(user.hea).toLocaleString() } ({grade(Number(user.hea))}) ] { user.point > 0 ? <button onClick={()=>{ upstate('hea') }}> + </button> : '' }</li>
                        <li>운 [ { Number(user.luk).toLocaleString() } ({grade(Number(user.luk))}) ] { user.point > 0 ? <button onClick={()=>{ upstate('luk') }}> + </button> : '' }</li>
                        <li>지혜 [ { Number(user.wis).toLocaleString() } ({grade(Number(user.wis))}) ] { user.point > 0 ? <button onClick={()=>{ upstate('wis') }}> + </button> : '' }</li>
                        <li>지식 [ { Number(user.int).toLocaleString() } ({grade(Number(user.int))}) ] { user.point > 0 ? <button onClick={()=>{ upstate('int') }}> + </button> : '' }</li>
                        <li>정신 [ { Number(user.maind).toLocaleString() } ({grade(Number(user.maind))}) ] { user.point > 0 ? <button onClick={()=>{ upstate('maind') }}> + </button> : '' }</li>
                    </ul>
                </section>
                <section className='ch-data'>
                    <p><span>신</span><span>{ user.god === '' ? '' : godList[user.god-1] }</span></p>
                    <p><span>신앙심</span><span>{user.prea}</span></p>
                    <p><span>공격력</span><span>{ Math.floor( 100 + (Number(user.str) + ( Number(user.str) * 0.5)) + Number(!user.wa?.magic ? 0 : user.wa.magic) + Number(!user.sub?.magic ? 0 : user.sub.magic) ).toLocaleString() }</span></p>
                    <p><span>방어력</span><span>{ Math.floor( 50 + (Number(user.hea) + ( Number(user.hea) * 0.5)) + Number(!user.hand?.magic ? 0 : user.hand.magic) + Number(!user.hat?.magic ? 0 : user.hat.magic) + Number(!user.arm?.magic ? 0 : user.arm.magic) + Number(!user.boot?.magic ? 0 : user.boot.magic) + Number(!user.sub?.magic ? 0 : user.sub.magic) ).toLocaleString() }</span></p>
                    <p><span>회피율</span><span>{ Math.floor( 10 + ((Number(user.luk) + (Number(user.luk)*0.2) ) * 0.2) ).toLocaleString()}</span></p>
                    <p><span>명중률</span><span>{ Math.floor( 10 + ((Number(user.dex) + (Number(user.dex)*0.2) ) * 0.2) ).toLocaleString()}</span></p>
                    <p><span>공격속도</span><span>{ Math.floor(Number(user.dex) + Number(!user.wa?.speed ? 0 : user.wa.speed) + Number(!user.hand?.speed ? 0 : user.hand.speed) + Number(!user.hat?.speed ? 0 : user.hat.speed) + Number(!user.arm?.speed ? 0 : user.arm.speed) + Number(!user.boot?.speed ? 0 : user.boot.speed) + Number(!user.sub?.speed ? 0 : user.sub.speed) )}</span></p>
                    <p><span>Gold</span><span>{ Number(user.gold) }</span></p>
                    <p><span>Bluepay</span><span>{ Number(user.vippay) }</span></p>
                </section>
            </div>
            <div className='ch-eq'>
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
                                    <button onClick={()=> { setItem({data:{userId:user.id,type:d.type,id:d.id,attr:d.attr,dep:d.dep,speed:d.speed,icon:d.icon}}) }}>장착</button>
                                </div>
                                : <p>장착 가능한 아이템이 없습니다.</p>
                        ))
                    }
                    <button onClick={eqclose}>닫기</button>
                </div>
                <div className='eq hat'>
                    {
                        user.hat?
                        <figure>
                            <img src={`./images/eq/${user.hat?.icon}.png`} alt='' /> 
                            <figcaption>
                                <p>{user.hat?.name}</p>
                                <p>[방어력:{user.hat?.magic}|스피드:{user.hat?.speed}]</p>
                            </figcaption> 
                        </figure>
                        :
                        <figure>
                            <img src={`./images/eq/hat.png`} className='none' alt='' />
                            <figcaption><p>머리</p></figcaption>
                        </figure>
                    }
                    <button onClick={()=> eqset('hat')}>장착</button>
                </div>
                <div className='eq arm'>
                    {
                        user.arm?
                        <figure>
                            <img src={`./images/eq/${user.arm?.icon}.png`} alt='' /> 
                            <figcaption>
                                <p>{user.arm?.name}</p>
                                <p>[방어력:{user.arm?.magic}|스피드:{user.arm?.speed}]</p>
                            </figcaption> 
                        </figure>
                        :
                        <figure>
                            <img src={`./images/eq/arm.png`} className='none' alt='' /> 
                            <figcaption><p>갑옷</p></figcaption>
                        </figure>
                    }
                    <button onClick={()=> eqset('arm')}>장착</button>
                </div>
                <div className='eq hand'>
                    {
                        user.hand?
                        <figure>
                            <img src={`./images/eq/${user.hand?.icon}.png`} alt='' /> 
                            <figcaption>
                                <p>{user.hand?.name}</p>
                                <p>[방어력:{user.hand?.magic}|스피드:{user.hand?.speed}]</p>
                            </figcaption> 
                        </figure>
                        :
                        <figure>
                            <img src={`./images/eq/hand.png`} className='none' alt='' /> 
                            <figcaption><p>장갑</p></figcaption>
                        </figure>

                    }
                    <button onClick={()=> eqset('hand')}>장착</button>
                </div>
                <div className='eq boot'>
                    {
                        user.boot?
                        <figure>
                            <img src={`./images/eq/${user.boot?.icon}.png`} alt='' /> 
                            <figcaption>
                                <p>{user.boot?.name}</p>
                                <p>[방어력:{user.boot?.magic}|스피드:{user.boot?.speed}]</p>
                            </figcaption> 
                        </figure>
                        :
                        <figure>
                            <img src={`./images/eq/boot.png`} className='none' alt='' /> 
                            <figcaption><p>신발</p></figcaption>
                        </figure>
                    }
                    <button onClick={()=> eqset('boot')}>장착</button>
                </div>
                <div className='eq wa'>
                    {
                        user.wa?
                            <figure>
                                <img src={`./images/eq/${user.wa?.icon}.png`} alt='' /> 
                                <figcaption>
                                    <p>{user.wa?.name}</p>
                                    <p>[방어력:{user.wa?.magic}|스피드:{user.wa?.speed}]</p>
                                </figcaption> 
                            </figure>
                        :
                        <figure>
                            <img src={`./images/eq/wa.png`} className='none' alt='' /> 
                            <figcaption><p>무기</p></figcaption>
                        </figure>
                    }
                    <button onClick={()=> eqset('wa')}>장착</button>                    
                </div>
                <div className='eq sub'>
                    {
                        user.sub?
                            <figure>
                                <img src={`./images/eq/${user.sub?.icon}.png`} alt='' /> 
                                <figcaption>
                                    <p>{user.sub?.name}</p>
                                    <p>[방어력:{user.sub?.magic}|스피드:{user.sub?.speed}]</p>
                                </figcaption> 
                            </figure>
                        :
                        <figure>
                            <img src={`./images/eq/sub.png`} className='none' alt='' /> 
                            <figcaption><p>보조</p></figcaption>
                        </figure>
                    }
                    <button onClick={()=> eqset('sub')}>장착</button>     
                </div>
            </div>
        </main>

        <Footer id={id} />
     </div>
  )
}
