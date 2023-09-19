import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
  const {state} = useLocation();
  return (
    <footer>
                    <ul>
                        <li>개인정보처리방침</li>
                        <li> <Link to="/notice" state={{id:state.id}}> 공지사항 </Link></li>
                        <li> <Link to="/guide" state={{id:state.id}}>가이드</Link></li>
                        <li> <Link to="/story" state={{id:state.id}}>스토리</Link></li>
                    </ul>
                    <p>Copyright ⓒ Forestseason. 2023 / Make By WhiteLim</p>
                </footer>
  )
}
