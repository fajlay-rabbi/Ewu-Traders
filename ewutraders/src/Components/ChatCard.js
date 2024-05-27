import React from 'react'

const chatCard = ({sender, msg, username}) => {
    var color=''
    if(sender === username) {
        color = "bg-gray-500 max-w-[300px]  text-white block p-3 rounded-3xl ml-5"
    }else{
        color = "bg-blue-600 max-w-[300px]  text-white block p-3 rounded-3xl ml-5"
    }
    return (
        <>
            <p className='mt-2 text-gray-300 ml-9 text-sm'>{sender}</p>
            <div className= {color}>{msg} </div>
        </>
    )
}

export default chatCard