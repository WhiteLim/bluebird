import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Userinfo from './Userinfo';

export default function Main() {
    const {state} = useLocation();
    const nav = useNavigate();

    if(!state) {
        alert("올바른 경로로 이용해주세요.")
        nav('/')
    }
    else {
        return (
            <Userinfo id={state.id} />
        )
    }   
}