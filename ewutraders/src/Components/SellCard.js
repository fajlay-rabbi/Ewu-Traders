import Image from "next/image";

import postImg from "../.././public/postimg.png";
import msgImg from "../.././public/msg.png";
import sendImg from "../.././public/sendbtn.png"
import { useState } from "react";

export default function SellCard({ title, price, img, owner, sendmsg }) {

  const [msg, setMsg] = useState("");

  const msgHandler = () => {
    sendmsg(msg, owner);
  }

    return(
        <div className="bg-white w-[270px] h-[340px] drop-shadow-xl	rounded-md mb-11">

            <img src={`http://localhost:4000/upload/${img}`} alt="Product Image" className="w-[100%] h-[200px] p-[5px]" />

            <div className="ml-[10px] mb-[8px]">
                <p className="text-sm">{owner}</p>
                <p className="font-semibold text-[#2D2C2C]">{title}</p>
                <p className="text-[#2F88C9] font-semibold">{`Tk. ${price}`}</p>
            </div>

            <div className="flex  items-center ml-[10px]">
                <Image src={msgImg} className="w-[15px] h-[15px] mr-[5px]"/>
                <p className="text-sm text-[#797575]">Send seller a message</p>
            </div>

            <div className="flex justify-around">
                <input type="text" value={msg} placeholder="Send message..." onChange={(e) => { setMsg(e.target.value) }} className="text-sm text-[#2D2C2C] p-[10px] drop-shadow-md border-[1.5px] w-[72%] h-[33px] bg-[#D9D9D9] rounded-2xl border-gray-300 outline-none "/>
                <button className="bg-[#9B7EDE] drop-shadow-xl rounded-sm p-[4px] text-white flex justify-center items-center" onClick={msgHandler}>
                    <p className="text-sm">Send</p> 
                    <Image src={sendImg} alt="send image" className="text-sm ml-[5px]" />
                </button>
            </div>

        </div>
    )}