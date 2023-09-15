import React, { useContext, useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Link, useLocation } from 'react-router-dom';
import { MyContext } from '../Context';

export default function Notice() {
    const {state} = useLocation();
    const {data,fetchFn} = useContext(MyContext);
    useEffect(()=>{ fetchFn('notice'); },[])
  return (
    <div className='ingame'>
        <Header id={state.id} />
        <main className='notice'>
            <h1> 공지사항 </h1>
            <ul>
                <li className='section'>
                    <div>No</div>
                    <div>Title</div>
                    <div>Date</div>
                </li>
            </ul>
            <ul>
                {
                    data.map(v=>(
                        <Link to={`/notice/${v.id}`} state={{id:state.id}}  >
                            <li key={v.id}>
                                <div>{v.id}</div>
                                <div>{v.title}</div>
                                <div>{v.date}</div>
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </main>
        <Footer id={state.id} />
    </div>
  )
}
