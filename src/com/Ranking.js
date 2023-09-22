import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { MyContext } from '../Context';


export default function Ranking() {
    const {state} = useLocation();
    const {data,fetchFn} = useContext(MyContext);
    useEffect(()=>{ fetchFn('list'); },[])

    const setUser = data.sort((a,b)=> b.lv - a.lv)
  return (
    <div className='ingame'>
        <Header id={state.id} />
        <main className='ranking'>
            <section className='npc'>
                <img src={`./images/npc/ranking.png`} alt='' title='명예의 전당 NPC' />
                <p> (석상이 말을...) <br /> 명예의 전당에 오신것을 환영합니다!! <br /> 여기선 서버 전체의 랭킹을 확인 할 수 있습니다!  </p>
            </section>
            <ul>
                <li><p>순위</p><p>아이콘</p><p>닉네임</p><p>Lv</p><p>소속</p></li>
                {
                    setUser?.map((v,k)=>(
                        <li key={k}>
                            <p>{
                            k+1 === 1 ? 
                                <img src={`/images/ranking/${k+1}.png`} alt='1위' className='rankingimages'/> 
                                : 
                                k+1 === 2 ? 
                                    <img src={`/images/ranking/${k+1}.png`} alt='2위' className='rankingimages'/> 
                                    : 
                                    k+1 === 3 ? 
                                        <img src={`/images/ranking/${k+1}.png`} alt='3위' className='rankingimages'/> 
                                        : 
                                        k+1 === 4 ? 
                                            <img src={`/images/ranking/${k+1}.png`} alt='4위' className='rankingimages'/> 
                                            : 
                                            k+1 === 5 ? 
                                                <img src={`/images/ranking/${k+1}.png`} alt='5위' className='rankingimages'/> 
                            : k+1
                            }</p>
                            <p><img src={`/images/usericon/${v.usericon}.png`} alt='' title='' /></p>
                            <p>{v.nick}</p>
                            <p>{v.lv}</p>
                            <p>{ v.emp === 'devil' ? '환영사제단(그림 리퍼블릭)' : '신성제국(크로니우스)' }</p>
                        </li>
                    ))
                }
            </ul>
        </main>
        <Footer id={state.id} />
    </div>
        
  )
}
