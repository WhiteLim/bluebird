import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { MyContext } from '../Context';

export default function Battle() {

    const {state} = useLocation();
    const {data,fetchFn} = useContext(MyContext);
    useEffect(()=>{ 
        fetchFn('userdata',state.id); 
    },[])
    const moster_arr = {
        "1": [ {id:1,name:"허수아비",lv:1,hp:50,mp:0,att:10,dep:20,speed:0,attA:0,dex:0,gold:10,exp:10} ],
        "2": [ {id:2,name:"목각인형",lv:5,hp:150,mp:0,att:50,dep:40,speed:10,attA:10,dex:10,gold:40,exp:100} ],
        "3": [ {id:3,name:"나무병정",lv:10,hp:200,mp:0,att:200,dep:100,speed:50,attA:100,dex:100,gold:100,exp:200} ],
        "4": [ {id:4,name:"훈련교관",lv:20,hp:700,mp:0,att:500,dep:500,speed:150,attA:200,dex:200,gold:500,exp:400} ],
        "5": [ {id:5,name:"칼날의 시험",lv:50,hp:1000,mp:0,att:1000,dep:1000,speed:300,attA:600,dex:600,gold:1500,exp:1500} ]
    }

 if(!data || data.length <= 0 || data.length > 1) return <></>;

        setTimeout(()=>{
            let user = data[0],tag='',getGold,getexp;
            const log = document.querySelector('.log')
            let userAtt =  Math.floor( 100 + (Number(user.str) + ( Number(user.str) * 0.5)) + Number(!user.wa?.magic ? 0 : user.wa.magic) )
            let userDep =  Math.floor( 100 + (Number(user.hea) + ( Number(user.hea) * 0.5)) + Number(!user.hand?.magic ? 0 : user.hand.magic) + Number(!user.hat?.magic ? 0 : user.hat.magic) + Number(!user.arm?.magic ? 0 : user.arm.magic) + Number(!user.boot?.magic ? 0 : user.boot.magic) )
            let anerDep =  moster_arr[state.monster][0].dep;
            let anerAtt =  moster_arr[state.monster][0].att;
            let damege = userAtt - anerDep;
            let Aedamege = anerAtt - userDep;
            let userMaxhp = Math.floor(Number(user.maxhp) + ( Number(user.hea) + ( Number(user.hea) * 10.25 )))

            let heab = Math.floor( Math.random() * moster_arr[state.monster][0].dex )
            let attb = Math.floor( Math.random() * moster_arr[state.monster][0].attA )
            let userattrattb = Math.floor( Math.random() * (Math.floor( 10 + ((Number(data[0].dex) + (Number(data[0].dex)*0.2) ) * 0.2) )))
            let userattrheab = Math.floor( Math.random() * (Math.floor( 10 + ((Number(data[0].luk) + (Number(data[0].luk)*0.2) ) * 0.2) )))
            let preMonster = state.monster !== 1 ? state.monster-1 : 1;

            damege <= 0 ? damege=0 : damege=damege;
            Aedamege <= 0 ? Aedamege=0 : Aedamege=Aedamege;

            if(user.dex >= moster_arr[state.monster][0].speed){
                // 유저 선공
                tag += `<p>${user.nick}의 선제공격!</p>`;
                tag += `${moster_arr[state.monster][0].name}에게 ${damege}의 대미지!`
                
                if(heab > userattrattb){
                    // 몬스터 회피
                    tag += `<p> 그러나 ${moster_arr[state.monster][0].name}은(는) 공격을 피했다!!</p>`
                    tag += `<br>`;
                    tag += `[${moster_arr[state.monster][0].name}의 공격] ${user.nick}에게 ${Aedamege}의 대미지!`
                        if(userattrheab > attb){
                            tag += `<p> 그러나 ${user.nick}은(는) 공격을 피했다!!</p>`
                            tag += `<p> 전투 종료 </p>`
                            getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold + moster_arr[preMonster][0].gold)
                            getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + moster_arr[preMonster][0].exp)
                            tag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                        } else {
                            tag += `<p> [회피 실패!] ${user.nick}은(는) ${Aedamege}를 입었다!</p>`
                            tag += `<p> ${user.nick}의 남은체력 ${userMaxhp - Aedamege}</p>`
                            tag += `<p> 전투 종료 </p>`
                            getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold + moster_arr[preMonster][0].gold)
                            getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + moster_arr[preMonster][0].exp)
                            tag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`

                        }
                } else {
                    tag += `<p> [회피 실패!] ${moster_arr[state.monster][0].name}은(는) ${damege}를 입었다!</p>`
                    tag += `<p> ${moster_arr[state.monster][0].name}의 남은 체력 ${moster_arr[state.monster][0].hp - damege}</p>`
                    tag += `<br>`;
                    if( (moster_arr[state.monster][0].hp-damege) <= 0) {
                        tag += `<p>${moster_arr[state.monster][0].name} 사망!</p>`
                        tag += `<p>승리!!</p>`
                        getGold = moster_arr[state.monster][0].gold * 2
                        getexp = moster_arr[state.monster][0].exp * 2
                        tag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                    } else {
                        tag += `[${moster_arr[state.monster][0].name}의 공격] ${user.nick}에게 ${Aedamege}의 대미지!`
                        if(userattrheab > attb){
                            tag += `<p> 그러나 ${user.nick}은(는) 공격을 피했다!!</p>`
                            tag += `<p> 전투 종료 </p>`
                            getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold + moster_arr[preMonster][0].gold)
                            getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + moster_arr[preMonster][0].exp)
                            tag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                        } else {
                            tag += `<p> [회피 실패!] ${user.nick}은(는) ${Aedamege}를 입었다!</p>`
                            tag += `<p> ${user.nick}의 남은체력 ${userMaxhp - Aedamege}</p>`
                            tag += `<p> 전투 종료 </p>`
                            getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold + moster_arr[preMonster][0].gold)
                            getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + moster_arr[preMonster][0].exp)
                            tag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`

                        }
                    }
                }


                
            } else {
                tag += `<p>적의 선제공격!</p>`;
                tag += `[${moster_arr[state.monster][0].name}의 공격] ${user.nick}에게 ${Aedamege}의 대미지!`

                if(userattrheab > attb){
                    tag += `<p> 그러나 ${user.nick}은(는) 공격을 피했다!!</p>`
                    tag += `<br>`
                    tag += `${moster_arr[state.monster][0].name}에게 ${damege}의 대미지!`
                    if(heab > userattrattb){
                        tag += `<p> 그러나 ${moster_arr[state.monster][0].name}은(는) 공격을 피했다!!</p>`
                        tag += `<p> 전투 종료 </p>`
                        getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold + moster_arr[preMonster][0].gold)
                        getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + moster_arr[preMonster][0].exp)
                        tag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                    } else {
                        tag += `<p> [회피 실패!] ${moster_arr[state.monster][0].name}은(는) ${damege}를 입었다!</p>`
                        tag += `<p> ${moster_arr[state.monster][0].name}의 남은 체력 ${moster_arr[state.monster][0].hp - damege}</p>`
                        if( (moster_arr[state.monster][0].hp-damege) <= 0) {
                            tag += `<p>${moster_arr[state.monster][0].name} 사망!</p>`
                            tag += `<p>승리!!</p>`
                            getGold = moster_arr[state.monster][0].gold * 2
                            getexp = moster_arr[state.monster][0].exp * 2
                            tag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                        } else {
                            tag += `<p> 전투 종료 </p>`
                            getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold + moster_arr[preMonster][0].gold)
                            getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + moster_arr[preMonster][0].exp)
                            tag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                        }
                    }
                } else {
                    tag += `<p> [회피 실패!] ${user.nick}은(는) ${Aedamege}를 입었다!</p>`
                    tag += `<p> ${user.nick}의 남은체력 ${userMaxhp - Aedamege}</p>`
                    if( (userMaxhp - Aedamege) <= 0){
                        tag += `<p> ${user.nick}은 힘을 다했다.. </p>`
                        tag += `<p> 전투 종료 </p>`
                        tag += `<p> 보상으로 아무것도 얻지 못했다. </p>`
                    } else {
                        tag += `<br>`
                        tag += `${moster_arr[state.monster][0].name}에게 ${damege}의 대미지!`
                        tag += `<br>`
                        if(heab > userattrattb){
                            tag += `<p> 그러나 ${moster_arr[state.monster][0].name}은(는) 공격을 피했다!!</p>`
                            tag += `<p> 전투 종료 </p>`
                            getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold + moster_arr[preMonster][0].gold)
                            getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + moster_arr[preMonster][0].exp)
                            tag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                        } else {
                            tag += `<p> [회피 실패!] ${moster_arr[state.monster][0].name}은(는) ${damege}를 입었다!</p>`
                            tag += `<br>`
                            tag += `<p> ${moster_arr[state.monster][0].name}의 남은 체력 ${moster_arr[state.monster][0].hp - damege}</p>`
                            if( (moster_arr[state.monster][0].hp-damege) <= 0) {
                                tag += `<p>${moster_arr[state.monster][0].name} 사망!</p>`
                                tag += `<p>승리!!</p>`
                                getGold = moster_arr[state.monster][0].gold * 2
                                getexp = moster_arr[state.monster][0].exp * 2
                                tag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                            } else {
                                tag += `<p> 전투 종료 </p>`
                                getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold + moster_arr[preMonster][0].gold)
                                getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + moster_arr[preMonster][0].exp)
                                tag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                            }
                        }
                    }
                }
            }
            let addexp = Math.floor( (!getexp ? 0 :  getexp) * (Number(user.wis) * 0.01) );
            let exp = Number(user.exp) + (!getexp ? 0 :  getexp) + addexp ;
            let gold = Number(user.gold) + (!getGold ? 0 : getGold);
            tag += `지혜스텟에 영향으로 ${addexp}경험치를 추가로 획득했습니다.`;
            if(exp >= user.nextexp) { 
                tag += ` <h4> ${user.nick} Level Up!! ( ${user.lv} -> ${Number(user.lv) + 1} ) </h4>` 
                let nextexps = Number(user.nextexp) + (Number(user.nextexp) * 0.15), point = Number(user.point) + 5;
                fetchFn('battle',{id:user.id,exp:0,nextexp:nextexps,lv: Number(user.lv)+1,gold,point});
            } else {
                fetchFn('battle',{id:user.id,exp,gold});
            }
            log.innerHTML=tag;
        },200)
        
  return (
    <div className='ingame'>
        <Header id={state.id} />
        <main className='map'>
            <section className='battle'>
                <p>{data[0].nick} ( Lv.{data[0].lv} ) vs {moster_arr[state.monster][0].name} ( Lv.{moster_arr[state.monster][0].lv} ) </p>
                <div>
                    <figure>
                        <img src="./images/battlebg/keep.png" alt="" />
                    </figure>
                    <section>
                        <figure><img src={`/images/usericon/${data[0].usericon}.png`} alt='' /></figure>
                        <figure><img src={`/images/monster/${moster_arr[state.monster][0].id}.png`} alt='' /></figure>
                    </section>
                </div>
                <div className='info'>
                    <div>
                        <p>{data[0].nick}</p>
                        <p>HP : { Math.floor(Number(data[0].maxhp) + ( Number(data[0].hea) + ( Number(data[0].hea) * 10.25))) }</p>
                        <p>공격력 : { Math.floor( 100 + (Number(data[0].str) + ( Number(data[0].str) * 0.5)) + Number(!data[0].wa?.magic ? 0 : data[0].wa.magic) ) }</p>
                        <p>방어력 : { Math.floor( 50 + (Number(data[0].hea) + ( Number(data[0].hea) * 0.5)) + Number(!data[0].hand?.magic ? 0 : data[0].hand.magic) + Number(!data[0].hat?.magic ? 0 : data[0].hat.magic) + Number(!data[0].arm?.magic ? 0 : data[0].arm.magic) + Number(!data[0].boot?.magic ? 0 : data[0].boot.magic) ) }</p>
                        <p>공격속도 : {Math.floor( Number(data[0].dex) + Number(!data[0].wa?.speed ? 0 : data[0].wa.speed) + Number(!data[0].hand?.speed ? 0 : data[0].hand.speed) + Number(!data[0].hat?.speed ? 0 : data[0].hat.speed) + Number(!data[0].arm?.speed ? 0 : data[0].arm.speed) + Number(!data[0].boot?.speed ? 0 : data[0].boot.speed) )} </p>
                        <p>회피율 : { Math.floor( 10 + ((Number(data[0].luk) + (Number(data[0].luk)*0.2) ) * 0.2) )}</p>
                        <p>명중률 : { Math.floor( 10 + ((Number(data[0].dex) + (Number(data[0].dex)*0.2) ) * 0.2) )}</p>
                    </div>
                    <div>
                        <p> {moster_arr[state.monster][0].name }</p>
                        <p>HP : { moster_arr[state.monster][0].hp }</p>
                        <p>공격력 : {moster_arr[state.monster][0].att}</p>
                        <p>방어력 : {moster_arr[state.monster][0].dep}</p>
                        <p>공격속도 : {moster_arr[state.monster][0].speed}</p>
                        <p>회피율 : {moster_arr[state.monster][0].attA}</p>
                        <p>명중률 : {moster_arr[state.monster][0].attA}</p>
                    </div>
                </div>
                
                <div className='log'>
                </div>
                <Link to='/main/map' state={{id:state.id}}>전투 종료</Link>
            </section>
        </main>
        <Footer id={state.id} />
    </div>
  )
}
