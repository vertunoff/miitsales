import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import './styles/main.css'
import Ticket from "./components/Ticket";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import Payment from "./components/Payment";
import Refund from "./components/Refund";

const App = () => {
    const [pageState, setPageState] = useState('main')
    const [price, setPrice] = useState()
    const [id, setId] = useState()
    const [logged, setLogged] = useState(localStorage.getItem('token') === null ? false : true)
    const setToken = (token) => localStorage.setItem('token', token)
    const setStatus = (status) => localStorage.setItem('status', status)
    const setUser = (username) => localStorage.setItem('username', username)
    const toLoginPage = () => setPageState('login')
    const toPaymentPage = (price, id) => { setPageState('payment'); setPrice(price); setId(id) }
    const toRefundPage = (id) => { setPageState('refund'); setId(id) }
    const toUserPage = () => setPageState('userpage')
    const toMainPage = () => setPageState('main')
    const toRegistrationPage = () => setPageState('registration')
    if (pageState === 'login' || pageState === 'registration') {
        return (
            <LoginPage toMain={toMainPage} pageState={pageState} logged={logged} setToken={setToken} setLogged={(value) => setLogged(value)} setStatus={setStatus} setUser={setUser}></LoginPage>
        )
    }
    else if (pageState === 'payment') {
        {console.log(id);}
        return (
            <Payment price={price} id={id} toMain={toMainPage}></Payment>
        )
    }
    else if (pageState==='refund'){
        console.log(id);
        return <Refund id={id} toMain={toMainPage} toUserPage={toUserPage}></Refund>
    }
    else if (pageState === 'main' || pageState === 'userpage') {
        return (
            <div>
                <Header pageState={pageState} toUserPage={toUserPage} toLogin={toLoginPage} toReg={toRegistrationPage} logged={logged} setToken={setToken} setLogged={(value) => setLogged(value)} setStatus={setStatus} setUser={setUser} toMain={toMainPage}></Header>
                <MainPage toRefundPage={toRefundPage} toPayment={toPaymentPage} username={localStorage.getItem('username')} toLogin={toLoginPage} pageState={pageState}></MainPage>
            </div>
        )
    }
    else return (<div>pageError</div>)
}
export default App