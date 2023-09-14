import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from "../Context"
import Header from './Header';

export default function Userinfo({id}) {
    const {data,fetchFn} = useContext(MyContext);
    useEffect(()=>{ fetchFn('userdata',id); },[])
    const stateset = document.querySelectorAll('.userstate ul li');
    stateset.forEach((v,k)=>{
        const button = v.querySelectorAll('button');
        button.forEach((j,q)=>{
            j.onclick= ()=>{
                fetchFn('upstate',{id,state:j.value});
            }
        })
    })

    function grade(num){
        // a b c d e f
        return num <= '20' ? 'F' : num <= '50' ? 'E' : num <= '100' ? 'd' : num <= '150' ? 'B' : 'A';
    } 


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
                    <p>경험치 : { Number(v.exp) }/{ Number(v.nextexp) }</p>
                    <p>소지금액 : { Number(v.gold) }Gold</p>
                    <p>블루페이 : { Number(v.vippay) }Pay</p>
                    <p>소속진형 : { v.emp === 'devil' ? '환영사제단(그림 리퍼블릭)' : '신성제국(크로니우스)' }</p>
                    <p>섬기는 신 : { v.god === '' ? '아직 섬긴는 신이 없습니다.' : v.god }</p>
                    <p>신앙심 : { Number(v.prea) }</p>
                </div>
            </div>
            <div className="userstate">
                <ul>
                    <li> 레벨업 포인트 : { Number(v.point) } </li>
                    <li> 근력 : { Number(v.str) } ({grade(Number(v.str))}) { v.point > 0 ? <button value='str'> 근력 Up! </button> : '' }</li>
                    <li> 민첩 : { Number(v.dex) } ({grade(Number(v.dex))}) { v.point > 0 ? <button value='dex'> 민첩 Up! </button> : '' }</li>
                    <li> 건강 : { Number(v.hea) } ({grade(Number(v.hea))}) { v.point > 0 ? <button value='hea'> 건강 Up! </button> : '' }</li>
                    <li> 행운 : { Number(v.luk) } ({grade(Number(v.luk))}) { v.point > 0 ? <button value='luk'> 행운 Up! </button> : '' }</li>
                    <li> 지능 : { Number(v.int) } ({grade(Number(v.int))}) { v.point > 0 ? <button value='int'> 지능 Up! </button> : '' }</li>
                    <li> 지혜 : { Number(v.wis) } ({grade(Number(v.wis))}) { v.point > 0 ? <button value='wis'> 지혜 Up! </button> : '' }</li>
                    <li> 정신 : { Number(v.maind) } ({grade(Number(v.maind))}) { v.point > 0 ? <button value='maind'> 정신 Up! </button> : '' }</li>                            
                </ul>
            </div>
            <div className='usereq'>
                <div>
                    <p>머리 : </p>
                    <p>갑옷 : </p>
                    <p>장갑 : </p>
                    <p>신발 : </p>
                </div>
                <div>
                    <p>무기 1 :</p>
                    <p>무기 2 :</p>
                    <p>보조아이템 1 :</p>
                    <p>보조아이템 2 :</p>
                </div>
                <div className='userconfig'>
                    <p>총 공격력 : { Math.floor( 100 + (Number(v.str) + ( Number(v.str) * 0.5)) ) }</p>
                    <p>총 방어력 : { Math.floor( 50 + (Number(v.hea) + ( Number(v.hea) * 0.5)) ) }</p>
                    <p>회피율 :  { Math.floor( 10 + ((Number(v.luk) + (Number(v.luk)*0.2) ) * 0.2) )}</p>
                    <p>명중률 : { Math.floor( 10 + ((Number(v.dex) + (Number(v.dex)*0.2) ) * 0.2) )}</p>
                </div>
            </div>
        </main>
            ))
        }
                
                <footer>
                    <ul>
                        <li>개인정보처리방침</li>
                        <li>공지사항</li>
                        <li>가이드</li>
                        <li>스토리</li>
                    </ul>
                    <p>Copyright ⓒ Forestseason. 2023 / Make By WhiteLim</p>
                </footer>
            </div>
  )
}
