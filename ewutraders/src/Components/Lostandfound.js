import React, { useState } from 'react'
import Image from "next/image"
import prodImg from "../../public/book.png"
import sendImg from "../.././public/sendbtn.png"

const LostandFound = ({ title, img, owner, sendmsg }) => {
    const [msg, setMsg] = useState("");
    const msgHandler = () => {
        sendmsg(msg, owner);
        setMsg('');
    }
    return (
        <div className='w-[60%] h-[450px] bg-white drop-shadow-lg rounded-md'>
            <p className='p-9 text-lg font-semibold'>{owner}</p>
            <p className='pl-9 text-lg'>{title}</p>
            <div className="flex justify-center">
                <img src={`http://localhost:4000/upload/${img}`} className='w-[200px] h-[250px]' />
            </div>


            <div className="flex justify-around mt-3" >

                <input type="text" value={msg} placeholder='Send a message...' className="text-sm text-[#2D2C2C] p-[15px] drop-shadow-md border-[1.5px] w-[72%] h-[40px] bg-[#D9D9D9]  rounded-3xl border-gray-300 outline-none " onChange={(e) => { setMsg(e.target.value) }} />

                <button className="bg-[#9B7EDE] drop-shadow-xl rounded-sm p-[10px] text-white flex justify-center items-center" onClick={msgHandler}>
                    <p className="text-sm">Send</p>
                    <Image src={sendImg} alt="send image" className="text-sm ml-[5px]" />
                </button>

            </div>

        </div>
    )
}

export default LostandFound;