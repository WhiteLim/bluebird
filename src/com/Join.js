import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from "../Context"

export default function Join() {
    const {data,fetchFn} = useContext(MyContext);
    fetchFn("list");
    const [icon,setIcon] = useState();
    const nav = useNavigate();
    useEffect(()=>{
        axios.get('./data/usericon.json')
        .then(res => { setIcon(res.data);  stateset(); })
        
    },[])

    let [sate,setState] = useState([]),st=[];
    function stateset(e){
        const elLi = document.querySelectorAll(".join > ul li code");
        const maxstates = 10;
        elLi.forEach((v,k)=>{
            let rand = Math.floor(Math.random() * maxstates)
            st.push(rand)
            v.innerHTML= rand;
        })
        let state = {'str':st[0],'dex':st[1],'hea':st[2],'luk':st[3],'int':st[4],'wis':st[5],'maind':st[6]}
        setState(state)
    }

    function newbee(e){
        e.preventDefault();
        let userdata =new FormData(e.target);
        let gold=10,inventory=[];
        if (e.target.id.value === '') { alert("아이디를 입력해주세요."); return false; }
        if (e.target.pw.value === '') { alert("비밀번호를 입력해주세요."); return false; }
        if (e.target.nick.value === '') { alert("닉네임을 입력해주세요."); return false; }
        if (e.target.usericon.value === '') { alert("유저 아이콘을 선택해주세요"); return false; }
        if (e.target.emp.value === '') { alert("본인의 소속을 선택해주세요"); return false; }

        const elLi = document.querySelectorAll(".join > ul li code");
        if(elLi[0].textContent === '') { alert("능력치를 배분해주세요."); return false; }

        Object.entries(sate).forEach(item => userdata.append(item[0], Number(item[1])));
        userdata.append('gold',String(gold));
        userdata.append('exp',0);
        userdata.append('point',0);
        userdata.append('vippay',0);
        userdata.append('addexp',0);
        userdata.append('nextexp',500);
        userdata.append('lv',1);
        userdata.append('prea',0);
        userdata.append('god','');
        userdata.append('hp',100);
        userdata.append('maxhp',100);
        userdata.append('mp',100);
        userdata.append('maxmp',100);
        userdata.append('hat','');
        userdata.append('amr','');
        userdata.append('hand','');
        userdata.append('boot','');
        userdata.append('wa1','');
        userdata.append('wa2','');
        userdata.append('sub1','');
        userdata.append('sub2','');
        userdata.append('inventory',inventory);
        let userForm =  Object.fromEntries( userdata )
        userCheck(userForm)
    }

    async function userCheck(formdata) {
        let k = data.filter(n=> n.id === formdata.id);
        let d = data.filter(n=> n.nick === formdata.nick);
        k.length > 0 ? alert("중복 된 아이디가 있습니다.") : d.length > 0 ? alert("중복 된 닉네임이 있습니다.") : end(formdata);
    }

    function end(e){
        fetchFn('join',e)
        alert("등록완료"); nav('/');
    }
    
    if(!icon) return <></>;
    
    return (
        <form className='join' onSubmit={newbee}>
            <img src="./main.jpg" alt="" />
            <label><p>아이디 : </p><input type='text' name='id' placeholder='아이디를 입력해주세요.' /></label>
            <label><p>비밀번호 : </p><input type='password' name='pw' placeholder='비밀번호를 입력해주세요.' /></label>
            <br />
            <label><p>닉네임 : </p><input type='text' name='nick' placeholder='닉네임을 입력해주세요.' /></label>
            <p>캐릭터 이미지 선택</p>
            <figure className='icon'>
                {
                    icon.map((v)=>(
                        <label key={v}>
                            <img src={`./images/usericon/${v}.png`} alt='' />
                            <input type='radio' name='usericon' value={v} />
                        </label>
                    ))
                }
            </figure>
            <p>소속 선택</p>
            <figure className='emp'>
                <label>
                    <img src={`./images/devil.png`} alt='' />
                    <input type='radio' name='emp' value='devil' />그림 리퍼블릭
                </label>
                <label>
                    <img src={`./images/ang.png`} alt='' />
                    <input type='radio' name='emp' value='ang' />크로니우스
                </label>
            </figure>
            <p>능력치 배정</p>
            <ul>
                <li>근력 : <code></code></li>
                <li>민첩 : <code></code></li>
                <li>체력 : <code></code></li>
                <li>행운 : <code></code></li>
                <li>지능 : <code></code></li>
                <li>지혜 : <code></code></li>
                <li>정신 : <code></code></li>
            </ul>
            <button type="button" onClick={stateset}>능력치 분배</button>
            <input type='submit' value='모험 시작' /><Link to='/'>취소</Link>
        </form>
    )
}
