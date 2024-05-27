import Image from "next/image";
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from "../Components/Navbar"
import info from "../../public/info.png"
import sendbtn from "../../public/sendbtn.png"
import Chats from "../Components/ChatCard"

import React, { useState, useEffect } from "react";

import io from "socket.io-client";
const socket = io("http://localhost:4000");



const Chat = () => {


    //States
    const [messages, setMessages] = useState([]);
    const [oldMsg, setOldMsg] = useState([]);

    const [input, setInput] = useState('');

    const [senderName, setSenderName] = useState('');

    const [user, setUser] = useState('');


    //Query Data....
    const router = useRouter();
    const data = router.query.data;


    // Get the user...
    useEffect(() => {
        axios.get('http://localhost:4000/user',
            {
                withCredentials: true
            }).then((res) => {
                setUser(res.data[0]);
            }).then((res) => {
                socket.emit('new user', user.name);
            })
    }, []);


    //Get the chats
    useEffect(() => {
            axios.get('http://localhost:4000/chat',
                {
                    params: {
                        param1: data,
                        param2: user.name
                    },
                    withCredentials: true
                }).then((res) => {
                    setOldMsg(res.data);
                    console.log(res.data);
                })
    }, []);


    // Listen for incoming chat messages
    // useEffect(() => {
    //     socket.on('chat message', (msg, senderName) => {
    //         setMessages([...messages, {
    //             message: msg,
    //             sender: senderName,
    //             email: user.email
    //         }]);
    //     });
    // }, [messages]);



    // Send a chat message to the selected receiver
    const sendMessage = () => {
        // socket.emit('chat message', input, data, user.name, user.email);
        setInput('');
    };




    return (
        <div className="bg-gray-800 h-[100vh]">
            <Navbar />
            <div className="flex justify-center">

                <div className="mt-[65px] absolute w-[70%] h-[50px] bg-gray-600 flex rounded-sm items-center justify-between">
                    <p className="ml-5 text-white font-semibold">{data}</p>
                    <Image src={info} className="w-[33px] cursor-pointer mr-5 " />
                </div>

                <div className="absolute mt-[120px] overflow-auto h-[72%] w-[70%] bg-gray-600 rounded-sm ">

                    {
                        oldMsg.map((chat) => {
                            return (
                                <Chats key={chat.id} sender={chat.sender} msg={chat.message} />
                            )
                        })
                    }


                </div>

                <div className="absolute mt-[598px] w-[70%] h-[8%] bg-gray-600 flex  items-center  rounded-sm">
                    <input type="text" placeholder="Send a message..." className="rounded-3xl outline-none h-[39px] w-[75%] pl-5 ml-5 bg-gray-500 text-white mr-9" onChange={(e) => setInput(e.target.value)} />

                    <button className="bg-[#9B7EDE] h-[36px]  rounded-sm p-[7px] text-white flex justify-center items-center" onClick={sendMessage} >
                        <p className="text-sm">Send</p>
                        <Image src={sendbtn} alt="send image" className="text-sm ml-[5px]" />
                    </button>

                </div>

            </div>
        </div>
    )
}


export default Chat