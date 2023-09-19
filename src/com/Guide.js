import React from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

export default function Guide() {
    const {state} = useLocation();

    function view(index) {
        const elLi = document.querySelector(`.info li:nth-of-type(${index})`);
        elLi.classList.toggle('active');
    }

  return (
    <div className='ingame'>
        <Header id={state.id} />
        <main className='guide'>
            <p> Game Info - 본 게임은 자율 육성형 PVE && PVP 게임입니다. <br /> 능력치, 섬기는 신, 신앙도에 따라 강함의 정도가 달라지며 <br /> 차후 업데이트로 생길 에고웨폰으로 강함의 척도를 다시 만들어 낼 예정입니다. </p>
            <article className='gu'>
                <h1> 게임 가이드 </h1>
                <ul className='info'>
                    <li>
                        <p onClick={()=> view(1)}>캐릭터 정보 <span> &#62; </span></p>
                        <div>
                            <p> 닉네임 : 인게임에서 불릴 이름을 의미합니다. </p>
                            <p> 레벨 : 강함의 정도를 수치로 표현한 단위 입니다. </p>
                            <p> 경험치 : 현재 경험치 / 레벨업에 필요한 경험치를 나태냅니다. </p>
                            <p> 소지금액(Gold) : Gold는 인게임에서 상점이나 신앙심을 올릴때 사용되는 화폐단위입니다. </p>
                            <p> 블루페이 : VVIP Money로 환전 금액입니다. </p>
                            <p> 소속진형 : 신성제국 or 어둠제국 둘 중 한 소속을 가지게 됩니다. </p>
                            <p> 섬기는 신 : 신성제국은 8명의 신 어둠제국은 단일신을 섬기게 됩니다. </p>
                            <p> 신앙심 : 마을(신전) 에서 기도를 드릴 경우 일정 수치가 증가 되며, 증가된 수치는 능력치 증가로 이어집니다. </p>
                            <p> 레벨업 포인트 : 레벨업 시 주어진 포인트입니다. 1업당 5의 포인트가 주어지며, 자유롭게 스탯을 분배 할 수 있습니다. </p>
                        </div>
                    </li>
                    <li>
                        <p onClick={()=> view(2)}>능력치 정보 <span> &#62; </span></p>
                        <div>
                            <p> 근력 : 공격력에 영향을 미칩니다. </p>
                            <p> 민첩 : 공격속도, 명중률에 영향을 미칩니다. </p>
                            <p> 건강 : 체력, 방어력에 영향을 미칩니다. </p>
                            <p> 행운 : 회피율에 영향을 미칩니다. </p>
                            <p> 지능 : 마법공격력에 영향을 미칩니다. (미구현) </p>
                            <p> 지혜 : 최종 경험치 증가율에 영향을 미칩니다. (미구현) </p>
                            <p> 정신 : 마력에 영향을 미칩니다. </p>
                            <hr />
                            <p> 공격력 - 기본공격력 + ( 근력 + ( 근력 * 증가배율) ) </p>
                            <p> 방어력 - 기본방어력 + ( 체력 + ( 체력 * 증가배율) ) </p>
                            <p> 회피율 - 기본회피율 + ( ( 행운 + ( 행운 * 증가배율) ) * 회피율 배율 ) </p>
                            <p> 명중률 - 기본명중률 + ( ( 민첩 + ( 민첩 * 증가배율) ) * 명중율 배율 ) </p>
                            <p> 공격속도 - 민첩 </p>
                        </div>
                    </li>
                    <li>
                        <p onClick={()=> view(3)}>인벤토리 <span> &#62; </span></p>
                        <div>
                            개발중..
                        </div>
                    </li>
                    <li onClick={()=> view(4)}>
                        <p>사냥터 <span> &#62; </span></p>
                        <div>
                            개발중..
                        </div>
                    </li>
                    <li onClick={()=> view(5)}>
                        <p>대장간 <span> &#62; </span></p>
                        <div>
                            개발중..
                        </div>
                    </li>
                    <li>
                        <p onClick={()=> view(6)}>상점 <span> &#62; </span></p>
                        <div>
                            개발중..
                        </div>
                    </li>
                    <li>
                        <p onClick={()=> view(7)}>신전 <span> &#62; </span></p>
                        <div>
                            개발중..
                        </div>
                    </li>
                </ul>
            </article>
            <article className='gu'>
                <h1> 신들의 능력 </h1>
                <ul className='god'>
                    <li> <img src="./images/godicon/0.png" alt="" /> 무소속 </li>
                    <li> <img src="./images/godicon/1.png" alt="" /> 아스트라이아 <br /> (Astraya) <br /> 바람 속성 </li>
                    <li> <img src="./images/godicon/2.png" alt="" /> 벨라도르 <br /> (Vellador) <br /> 대지 속성 </li>
                    <li> <img src="./images/godicon/3.png" alt="" /> 세레니스 <br /> (Serennis) <br /> 화속성 </li>
                    <li> <img src="./images/godicon/4.png" alt="" /> 제피루스 <br /> (Zephyrus) <br /> 번개 속성 </li>
                    <li> <img src="./images/godicon/5.png" alt="" /> 아우레오스 <br /> (Aureos) <br /> 풀속성 </li>
                    <li> <img src="./images/godicon/6.png" alt="" /> 엘리오스 <br /> (Elios) <br /> 정신 속성 </li>
                    <li> <img src="./images/godicon/7.png" alt="" /> 에델라인 <br /> (Edelrine) <br /> 빛 속성 </li>
                    <li> <img src="./images/godicon/8.png" alt="" /> 이리디아 <br /> (Iridia) <br /> 물속성 </li>
                    <li> <img src="./images/godicon/9.png" alt="" /> 데모스카 <br /> (Demoska) <br /> 암흑속성 </li>
                </ul>
                <br />
                <p> 속성 대비 능력치 증가율 개발중 </p>
            </article>
        </main>
        <Footer id={state.id} />
    </div>
  )
}
