import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { MyContext } from '../Context';

export default function Noticedetail() {
    const {state} = useLocation();
    const {id} = useParams();
    const {data,fetchFn} = useContext(MyContext);
    useEffect(()=>{ fetchFn('noticede',id); },[])
    if(!data || data.length <= 0) return <></>;
  return (
    <div className='ingame'>
        <Header id={state.id} />
        <main className='noticedetail'>
            <h1>{data[0].title} <p>{data[0].date}</p> </h1>
            <div>
                <p>{data[0].msg}</p>
            </div>
            <Link to='/notice'  state={{id:state.id}}>[ 목록으로 ]</Link>
        </main>
        <Footer id={state.id} />
    </div>
  )
}
