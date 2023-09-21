import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { MyContext } from '../Context';

export default function Temple() {
    const {state} = useLocation();
    const {data,fetchFn} = useContext(MyContext);
    useEffect(()=>{ fetchFn('userdata',state.id); },[])
    let user = data[0];

    function god(god){
        let godList = ["아스트라이아","벨라도르","세레니스","제피루스","아우레오스","엘리오스","에델라인","이리디아","데모스카"]
        if(window.confirm(`${godList[god]}를 섬기시겠습니까?`) === true){
            let godnum = god + 1;
            fetchFn("godselect",{"id":user.id,"god":godnum})
        } else {
            alert("다시 선택해주세요.")
        }
    }
    
    function prea(){
        let removeGold = Math.floor( Number(user.prea) <= 0 ? '500' : 500 + (Number(user.prea) * 25) )
        let settingGlod = Number(user.gold) - removeGold;
        if(settingGlod <= 0) {
            alert("소지금이 적어 기도드릴 수 없습니다.")
            return false;
        } else {
            let addprea = Math.floor( Math.random() * removeGold )
            let prea = Number(user.prea) + (addprea /  2);
            let addPoint = Number(user.prea) * 0.0002;
            let str = Math.floor( Number(user.str) + ( Number(user.str) * addPoint ) )
            let dex = Math.floor( Number(user.dex) + ( Number(user.dex) * addPoint ) )
            let hea = Math.floor( Number(user.hea) + ( Number(user.hea) * addPoint ) )
            let luk = Math.floor( Number(user.luk) + ( Number(user.luk) * addPoint ) )
            let int = Math.floor( Number(user.int) + ( Number(user.int) * addPoint ) )
            let wis = Math.floor( Number(user.wis) + ( Number(user.wis) * addPoint ) )
            let maind = Math.floor( Number(user.maind) + ( Number(user.maind) * addPoint ) )
            fetchFn("prea",{"id":user.id,"prea":prea,"gold":settingGlod,"str":str,"dex":dex,"hea":hea,"luk":luk,"int":int,"wis":wis,"maind":maind})
        }
    }

    if(!data || data.length <= 0 || data.length > 1 ) return <></>;
  return (
    <div className='ingame'>
        <Header id={state.id} />
        <main className='temple'>
            {
                user.lv < 10 ? 
                    <div className='nogod'>
                        <img src="./images/npc/gloorx_vloq_2x.png" alt='' />
                        <p>신전 대리인</p>
                        <p> 레벨 10 이하는 신을 모실 자격이 없다. 돌아가라.</p>
                    </div>
                : 
                    <div className='yesgod'>
                        <img src="./images/npc/gloorx_vloq_2x.png" alt='' />
                        <p>신전 대리인</p>
                        {
                            user.god === '' ?
                            <>
                                
                                <p> 나는 모든 신의 대리인 에스카도르다. 너의 소속은 { user.emp === 'devil' ? '그림 리퍼블릭' : '크로니우스' }군.. </p>
                                <p> 자 모실 신을 선택하거라.. </p>
                                <ul>
                                {
                                    user.emp === 'devil' ?
                                    <li> <img src="./images/godicon/9.png" alt="" /> 데모스카 <br /> (Demoska) <button onClick={()=>{god(8)}}>선택</button>  </li>
                                    :
                                    <>
                                        <li> <img src="./images/godicon/1.png" alt="" /> 아스트라이아 <br /> (Astraya) <button onClick={()=>{god(0)}}>선택</button> </li>
                                        <li> <img src="./images/godicon/2.png" alt="" /> 벨라도르 <br /> (Vellador) <button onClick={()=>{god(1)}}>선택</button>  </li>
                                        <li> <img src="./images/godicon/3.png" alt="" /> 세레니스 <br /> (Serennis) <button onClick={()=>{god(2)}}>선택</button>  </li>
                                        <li> <img src="./images/godicon/4.png" alt="" /> 제피루스 <br /> (Zephyrus) <button onClick={()=>{god(3)}}>선택</button>  </li>
                                        <li> <img src="./images/godicon/5.png" alt="" /> 아우레오스 <br /> (Aureos) <button onClick={()=>{god(4)}}>선택</button>  </li>
                                        <li> <img src="./images/godicon/6.png" alt="" /> 엘리오스 <br /> (Elios) <button onClick={()=>{god(5)}}>선택</button>  </li>
                                        <li> <img src="./images/godicon/7.png" alt="" /> 에델라인 <br /> (Edelrine) <button onClick={()=>{god(6)}}>선택</button>  </li>
                                        <li> <img src="./images/godicon/8.png" alt="" /> 이리디아 <br /> (Iridia) <button onClick={()=>{god(7)}}>선택</button> </li>
                                    </>

                                }
                                </ul>
                            <p>모든 신은 전체 능력치를 올려줍니다.</p>
                            </>
                            :
                            <>
                                <p>신께 기도를 드리겠나?</p>
                                <div className='pr'>
                                    <p>현재 신앙심 : {Number(user.prea)}</p>
                                    <label>기도 금액 : { Math.floor( Number(user.prea) <= 0 ? '500' : 500 + (Number(user.prea) * 25)).toLocaleString() }Gold <button onClick={prea}>기도드리기</button></label>
                                </div>
                            </> 
                        }
                    </div>
            }
        </main>
        <Footer id={state.id} />
    </div>
  )
}
