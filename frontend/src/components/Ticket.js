import React from 'react'

function Ticket(props) {
    const ticket = props.ticket
    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Отктября", "Ноября", "Декабря"]
    const day_from = ticket.departure_day.slice(0,2) + " "+ months[parseInt(ticket.departure_day.slice(3, 5))-1].toLowerCase()
    const day_to = ticket.arrival_day.slice(0,2) + " "+ months[parseInt(ticket.departure_day.slice(3, 5))-1].toLowerCase()
    return (
        <div className='ticket'>
            <div className='ticket-info'>
                <div className='city-from'>{ticket.departure_city}</div>
                <div className='city-to'>{ticket.arrival_city}</div>
                <div className='company'>{ticket.aviation_company}</div>
                <div className='date-from'>{day_from}, {ticket.departure_time}</div>
                <div className='date-to'>{day_to}, {ticket.arrival_time}</div>
                <div className='airport-from'>{ticket.departure_airport}</div>
                <div className='airport-to'>{ticket.arrival_airport}</div>
                {localStorage.getItem('status')==='cashier' && props.pageState==="userpage"?
                <div className='user'>Билет оформлен на {ticket.user}</div>:''}
            </div>
            {props.pageState==="userpage"?
            <div className='ticket-buy'>
                <button onClick={()=>{props.toRefundPage(ticket.id);localStorage.setItem('refunduser', ticket.user)}}>Оформить возврат</button>
                <div className='price'>Эконом</div>
            </div>
            :
            <div className='ticket-buy'>
                {localStorage.getItem('status')==='admin'?<button><a href={`http://127.0.0.1:8000/admin/app/flight/${ticket.id}/change/`}>Изменить</a></button>:localStorage.getItem('status')==='client'?<button onClick={()=>props.toPayment(ticket.price_economy, ticket.id)}>Купить</button>:localStorage.getItem('status')==='cashier'?<button onClick={()=>props.toPayment(ticket.price_economy, ticket.id)}>Оформить покупку</button>:<button onClick={props.toLogin}>Необходим вход</button>}
                <div className='left'>Осталось {ticket.spare_economy+ticket.spare_business} мест</div>
                <div className='price'>{ticket.price_economy} ₽</div>
            </div>
            }
        </div>
    )
}

export default Ticket