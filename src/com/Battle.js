import React, { useContext, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { MyContext } from '../Context';

export default function Battle() {

    const {state} = useLocation();
    const {data,fetchFn} = useContext(MyContext);
    const userImages = useRef()
    const monsterImages = useRef()
    useEffect(()=>{ 
        fetchFn('userdata',state.id);

        setTimeout(()=>{
            const header = document.querySelector('.ingame header ul')
            header.style.display='none';
            BattleStart();
        },200)
    },[])
    const moster_arr = {
        "1": [ {id:1,name:"허수아비",lv:1,hp:50,mp:0,att:10,dep:20,speed:0,attA:0,dex:0,gold:10,exp:10} ],
        "2": [ {id:2,name:"목각인형",lv:5,hp:150,mp:0,att:50,dep:40,speed:10,attA:10,dex:10,gold:20,exp:30} ],
        "3": [ {id:3,name:"나무병정",lv:10,hp:200,mp:0,att:200,dep:100,speed:50,attA:100,dex:100,gold:30,exp:40} ],
        "4": [ {id:4,name:"훈련교관",lv:20,hp:700,mp:0,att:1000,dep:500,speed:150,attA:200,dex:200,gold:50,exp:60} ],
        "5": [ {id:5,name:"칼날의 시험",lv:50,hp:1000,mp:0,att:3000,dep:3000,speed:300,attA:600,dex:600,gold:70,exp:80} ],
        "6": [ {id:6,name:"온순한 양",lv:5,hp:100,mp:0,att:50,dep:50,speed:5,attA:20,dex:20,gold:30,exp:30} ],
        "7": [ {id:7,name:"화난 양",lv:10,hp:80,mp:0,att:100,dep:30,speed:25,attA:70,dex:70,gold:40,exp:40} ],
        "8": [ {id:8,name:"보아뱀",lv:15,hp:200,mp:0,att:150,dep:90,speed:80,attA:100,dex:100,gold:60,exp:60} ],
        "9": [ {id:9,name:"늑대",lv:20,hp:500,mp:0,att:300,dep:200,speed:150,attA:120,dex:120,gold:80,exp:80} ],
        "10": [ {id:10,name:"독 나비",lv:25,hp:700,mp:0,att:500,dep:300,speed:400,attA:300,dex:300,gold:100,exp:100} ],
        "11": [ {id:11,name:"랫맨",lv:20,hp:300,mp:0,att:200,dep:150,speed:40,attA:30,dex:30,gold:150,exp:150} ],
        "12": [ {id:11,name:"전사 랫맨",lv:30,hp:400,mp:0,att:700,dep:150,speed:40,attA:40,dex:40,gold:200,exp:200} ],
        "13": [ {id:13,name:"랫맨의 무언가",lv:35,hp:500,mp:0,att:800,dep:200,speed:40,attA:40,dex:40,gold:500,exp:500} ],
        "14": [ {id:14,name:"동굴 개미",lv:20,hp:150,mp:0,att:200,dep:50,speed:10,attA:40,dex:10,gold:200,exp:200} ],
        "15": [ {id:15,name:"개미 마법사",lv:30,hp:300,mp:0,att:500,dep:150,speed:20,attA:40,dex:50,gold:250,exp:250} ],
        "9998": [ {id:9998,name:"골드젤리",lv:70,hp:5000,mp:0,att:1000,dep:500,speed:30,attA:50,dex:50,gold:1000,exp:5} ]
    }

 if(!data || data.length <= 0 || data.length > 1) return <></>;
    function BattleStart(){
            const header = document.querySelector('.ingame header ul')
            header.style.display='none';
            let user = data[0],tag='',getGold,getexp,poptag='';
            const log = document.querySelector('.log');
            const endbatteA = document.querySelector('.endbattle')
            const endbatte = document.querySelector('.endbattle > div')
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
            let preMonster = state.monster !== 1 ? 10 * moster_arr[state.monster][0].lv  : 1;

            damege <= 0 ? damege=0 : damege=damege;
            Aedamege <= 0 ? Aedamege=0 : Aedamege=Aedamege;

            if(user.dex >= moster_arr[state.monster][0].speed){
                // 유저 선공
                tag += `<p>${user.nick}의 선제공격!</p>`;
                tag += `${moster_arr[state.monster][0].name}에게 ${damege}의 대미지!`
                userImages.current.classList.add('active')
                if(heab > userattrattb){
                    // 몬스터 회피
                    tag += `<p> 그러나 ${moster_arr[state.monster][0].name}은(는) 공격을 피했다!!</p>`
                    monsterImages.current.classList.add('heaw')
                    tag += `<br>`;
                    tag += `[${moster_arr[state.monster][0].name}의 공격] ${user.nick}에게 ${Aedamege}의 대미지!`
                    setTimeout(() => {
                        monsterImages.current.classList.remove('heaw')
                        monsterImages.current.classList.add('active')
                    },1000);
                        if(userattrheab > attb){
                            tag += `<p> 그러나 ${user.nick}은(는) 공격을 피했다!!</p>`
                            setTimeout(() => {
                                userImages.current.classList.add('hewa')
                            },1500);
                            tag += `<p> 전투 종료 </p>`
                            getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold + preMonster)
                            getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + preMonster)
                            poptag += `<h3>Draw !! </h3>`
                            poptag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                        } else {
                            tag += `<p> [회피 실패!] ${user.nick}은(는) ${Aedamege}를 입었다!</p>`
                            tag += `<p> ${user.nick}의 남은체력 ${userMaxhp - Aedamege}</p>`

                            if( (userMaxhp - Aedamege) <= 0){
                                tag += `<p> ${user.nick}은 힘을 다했다.. </p>`
                                poptag += `<h3>Defeat...</h3>`
                                poptag += `<p> 보상으로 아무것도 얻지 못했다. </p>`
                            } else {
                                poptag += `<h3>Draw !! </h3>`
                                getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold + preMonster)
                                getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + preMonster)
                                poptag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`

                            }
                        }
                } else {
                    tag += `<p> [회피 실패!] ${moster_arr[state.monster][0].name}은(는) ${damege}를 입었다!</p>`
                    tag += `<p> ${moster_arr[state.monster][0].name}의 남은 체력 ${moster_arr[state.monster][0].hp - damege}</p>`
                    tag += `<br>`;
                    if( (moster_arr[state.monster][0].hp-damege) <= 0) {
                        tag += `<p>${moster_arr[state.monster][0].name} 사망!</p>`
                        poptag += `<h3>Victory!!</h3>`
                        getGold = moster_arr[state.monster][0].gold + preMonster * 2
                        getexp = moster_arr[state.monster][0].exp + preMonster * 2
                        poptag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                    } else {
                        tag += `[${moster_arr[state.monster][0].name}의 공격] ${user.nick}에게 ${Aedamege}의 대미지!`
                        
                        setTimeout(() => {
                            monsterImages.current.classList.add('active')
                        },1000);
                        if(userattrheab > attb){
                            tag += `<p> 그러나 ${user.nick}은(는) 공격을 피했다!!</p>`
                            setTimeout(() => {
                                userImages.current.classList.add('hewa')
                            },1500);
                            poptag += `<h3>Draw !! </h3>`
                            getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold + preMonster)
                            getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + preMonster)
                            poptag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                        } else {
                            tag += `<p> [회피 실패!] ${user.nick}은(는) ${Aedamege}를 입었다!</p>`
                            tag += `<p> ${user.nick}의 남은체력 ${userMaxhp - Aedamege}</p>`
                            poptag += `<h3>Draw !! </h3>`
                            getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold + preMonster)
                            getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + preMonster)
                            poptag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`

                        }
                    }
                }


                
            } else {
                tag += `<p>적의 선제공격!</p>`;
                monsterImages.current.classList.add('active')
                tag += `[${moster_arr[state.monster][0].name}의 공격] ${user.nick}에게 ${Aedamege}의 대미지!`
                if(userattrheab > attb){
                    tag += `<p> 그러나 ${user.nick}은(는) 공격을 피했다!!</p>`
                    setTimeout(() => {
                        userImages.current.classList.add('hewa')
                    },1500);

                    tag += `<br>`
                    tag += `${moster_arr[state.monster][0].name}에게 ${damege}의 대미지!`
                    setTimeout(() => {
                        userImages.current.classList.add('active')
                    },2000);

                    if(heab > userattrattb){
                        setTimeout(() => {
                            monsterImages.current.classList.add('heaw')
                        },1500);
                        tag += `<p> 그러나 ${moster_arr[state.monster][0].name}은(는) 공격을 피했다!!</p>`
                        poptag += `<h3>Draw !! </h3>`
                        getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold +preMonster)
                        getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + preMonster)
                        poptag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                    } else {
                        tag += `<p> [회피 실패!] ${moster_arr[state.monster][0].name}은(는) ${damege}를 입었다!</p>`
                        tag += `<p> ${moster_arr[state.monster][0].name}의 남은 체력 ${moster_arr[state.monster][0].hp - damege}</p>`
                        if( (moster_arr[state.monster][0].hp-damege) <= 0) {
                            tag += `<p>${moster_arr[state.monster][0].name} 사망!</p>`
                            poptag += `<h3>Victory!!</h3>`
                            getGold = moster_arr[state.monster][0].gold + preMonster * 2
                            getexp = moster_arr[state.monster][0].exp + preMonster * 2
                            poptag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                        } else {
                            poptag += `<h3>Draw !! </h3>`
                            getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold + preMonster)
                            getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + preMonster)
                            poptag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                        }
                    }
                } else {
                    tag += `<p> [회피 실패!] ${user.nick}은(는) ${Aedamege}를 입었다!</p>`
                    tag += `<p> ${user.nick}의 남은체력 ${userMaxhp - Aedamege}</p>`
                    if( (userMaxhp - Aedamege) <= 0){
                        tag += `<p> ${user.nick}은 힘을 다했다.. </p>`
                        poptag += `<h3>Defeat...</h3>`
                        poptag += `<p> 보상으로 아무것도 얻지 못했다. </p>`
                    } else {
                        tag += `<br>`
                        tag += `${moster_arr[state.monster][0].name}에게 ${damege}의 대미지!`
                        setTimeout(() => { userImages.current.classList.add('active')},1000);
                        tag += `<br>`
                        if(heab > userattrattb){
                            setTimeout(() => {
                                monsterImages.current.classList.add('heaw')
                            },1500);
                            tag += `<p> 그러나 ${moster_arr[state.monster][0].name}은(는) 공격을 피했다!!</p>`
                            poptag += `<h3>Draw !! </h3>`
                            getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold + preMonster)
                            getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + preMonster)
                            poptag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                        } else {
                            tag += `<p> [회피 실패!] ${moster_arr[state.monster][0].name}은(는) ${damege}를 입었다!</p>`
                            tag += `<br>`
                            tag += `<p> ${moster_arr[state.monster][0].name}의 남은 체력 ${moster_arr[state.monster][0].hp - damege}</p>`
                            if( (moster_arr[state.monster][0].hp-damege) <= 0) {
                                tag += `<p>${moster_arr[state.monster][0].name} 사망!</p>`
                                poptag += `<h3>Victory!!</h3>`
                                getGold = moster_arr[state.monster][0].gold + preMonster * 2
                                getexp = moster_arr[state.monster][0].exp + preMonster * 2
                                poptag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                            } else {
                                poptag += `<h3>Draw !! </h3>`
                                getGold =  Math.floor( Math.random() * moster_arr[state.monster][0].gold + preMonster)
                                getexp = Math.floor( Math.random() * moster_arr[state.monster][0].exp + preMonster)
                                poptag += `<p> 보상으로 ${getGold}Gold 와 ${getexp}Exp를 얻었다.</p>`
                            }
                        }
                    }
                }
            }
            let addexp = Math.floor( (!getexp ? 0 :  getexp) * (Number(user.wis) * 0.01) );
            let exp = Number(user.exp) + Number( (!getexp ? 0 :  getexp) + addexp );
            let gold = Number(user.gold) + Number( (!getGold ? 0 : getGold) );
            poptag += `지혜스텟에 영향으로 ${addexp}경험치를 추가로 획득했습니다.`;
            if(exp >= user.nextexp) { 
                poptag += ` <h4> ${user.nick} Level Up!! ( ${user.lv} -> ${Number(user.lv) + 1} ) </h4>` 
                let nextexps = Number(user.nextexp) + (Number(user.nextexp) * 0.15), point = Number(user.point) + 5;
                poptag += `<p>다음 레벨업까지 남은 경험치 : ${user.nextexp}</p>`
                poptag += `<p>Gold : ${Number(gold).toLocaleString()}</p>`
                fetchFn('battle',{id:user.id,exp:0,nextexp:nextexps,lv: Number(user.lv)+1,gold,point});
            } else {
                poptag += `<p>다음 레벨업까지 남은 경험치 : ${user.nextexp - exp}</p>`
                poptag += `<p>Gold : ${Number(gold).toLocaleString()}</p>`
                fetchFn('battle',{id:user.id,exp,gold});
            }
            log.innerHTML=tag;
            setTimeout(()=>{
                endbatte.innerHTML+=poptag;
                endbatteA.style.display = "flex"
                header.style.display='flex';
            },2500)
    }
        
  return (
    <div className='ingame'>
        <Header id={state.id} />
        <main className='mpabattle'>
            <section className='userdata'>
                <figure>
                    <p><img src={`/images/usericon/${data[0].usericon}.png`} alt='' ref={userImages} /></p>
                    <figcaption>
                        <p>{data[0].nick} <br />  ( Lv.{data[0].lv} )</p>
                        <p>HP : { Math.floor(Number(data[0].maxhp) + ( Number(data[0].hea) + ( Number(data[0].hea) * 10.25))) } <br /> MP : { Math.floor(Number(data[0].maxmp) + ( Number(data[0].maind) + ( Number(data[0].maind) * 10.25))) }</p>
                        <p>
                            공격력 : { Math.floor( 100 + (Number(data[0].str) + ( Number(data[0].str) * 0.5)) + Number(!data[0].wa?.magic ? 0 : data[0].wa.magic) ) } <br /> 
                            방어력 : { Math.floor( 50 + (Number(data[0].hea) + ( Number(data[0].hea) * 0.5)) + Number(!data[0].hand?.magic ? 0 : data[0].hand.magic) + Number(!data[0].hat?.magic ? 0 : data[0].hat.magic) + Number(!data[0].arm?.magic ? 0 : data[0].arm.magic) + Number(!data[0].boot?.magic ? 0 : data[0].boot.magic) ) }
                        </p>
                        <p>회피율 : { Math.floor( 10 + ((Number(data[0].luk) + (Number(data[0].luk)*0.2) ) * 0.2) )}  <br />  명중률 : { Math.floor( 10 + ((Number(data[0].dex) + (Number(data[0].dex)*0.2) ) * 0.2) )}</p>
                        <p>공격속도 : {Math.floor( Number(data[0].dex) + Number(!data[0].wa?.speed ? 0 : data[0].wa.speed) + Number(!data[0].hand?.speed ? 0 : data[0].hand.speed) + Number(!data[0].hat?.speed ? 0 : data[0].hat.speed) + Number(!data[0].arm?.speed ? 0 : data[0].arm.speed) + Number(!data[0].boot?.speed ? 0 : data[0].boot.speed) )} </p>
                    </figcaption>
                </figure>
            </section>
            <section className='vs'>vs</section>
            <section className='monsterdata'>
                <figure>
                    <p><img src={`/images/monster/${moster_arr[state.monster][0].id}.png`} alt='' ref={monsterImages} /></p>
                    <figcaption>
                        <p>{moster_arr[state.monster][0].name} <br />  ( Lv.{moster_arr[state.monster][0].lv} )</p>
                        <p>HP : { moster_arr[state.monster][0].hp } <br />  MP : { moster_arr[state.monster][0].mp }</p>
                        <p>공격력 : {moster_arr[state.monster][0].att}  <br /> 방어력 : {moster_arr[state.monster][0].dep}</p>
                        <p>회피율 : {moster_arr[state.monster][0].attA}  <br /> 명중률 : {moster_arr[state.monster][0].attA}</p>
                        <p>공격속도 : {moster_arr[state.monster][0].speed}</p>
                    </figcaption>
                </figure>
            </section>
            
            <div className='endbattle'>
                <div>
                </div>
                <section>
                    <Link to='/main/map' state={{id:state.id}}>전투종료</Link>
                </section>
            </div>
        </main>
        <article className='battle'>
            <h2>전투 로그</h2>
            <div className='log'></div>
        </article>
        <Footer id={state.id} />
    </div>
  )
}
