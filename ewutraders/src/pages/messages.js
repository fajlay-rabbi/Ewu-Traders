import Msglist from "@/Components/Msglist"
import Navbar from "@/Components/Navbar"
import axios from 'axios';
import Chats from "../Components/ChatCard"
import sendbtn from "../../public/sendbtn.png"


import Image from "next/image";


import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:4000");



export default function messages() {

    // const [messages, setMessages] = useState([]);
    const [oldMsg, setOldMsg] = useState([]);
    // const [input, setInput] = useState('');
    const [senderName, setSenderName] = useState('');
    // const [user, setUser] = useState('');



    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState('');
    const [conversation, setConversation] = useState([]);


    // Get the user...
    useEffect(() => {
        axios.get('http://localhost:4000/user',
            {
                withCredentials: true
            }).then((res) => {
                return res.data[0];
            }).then((res) => {
                setUser(res);
                socket.emit('new user', res.name);
            })
    }, []);



    //get the user conversation
    useEffect(() => {
        axios.get('http://localhost:4000/conversation',
            { withCredentials: true }).then((res) => {
                setConversation(res.data);
            });
    }, [])



    // useEffect(() => {
    //     axios.get('http://localhost:4000/chat',
    //         {
    //             params: {
    //                 param1: data,
    //                 param2: user.name
    //             },
    //             withCredentials: true
    //         }).then((res) => {
    //             setOldMsg(res.data);
    //             console.log(res.data);
    //         })
    // }, []);






    // Listen for incoming chat messages
    // useEffect(() => {
    //     socket.on('chat message', (msg, senderName) => {
    //         setMessages([...messages, { msg: msg, senderName: senderName }]);
    //     });

    // }, [messages]);


    // Send a chat message to the selected receiver
    const sendMessage = () => {
        socket.emit('chat message', input, receiverName, user.name, user.email);
        setInput('');
    };


  



    //     return (
    //         <div>
    //             <ul>
    //                 {messages.map((message, index) => (
    //                     <li key={index}>
    //                         {message.senderName}: {message.msg}
    //                     </li>
    //                 ))}
    //             </ul>
    //             <form onSubmit={sendMessage}>
    // <input
    //     type="text"
    //     placeholder="Type your message here"
    //     value={input}
    //     onChange={(e) => setInput(e.target.value)}
    // />
    //                 <br />
    //                 <input
    //                     type="text"
    //                     placeholder="Receiver Name"
    //                     value={receiverName}
    //                     onChange={(e) => setReceiverName(e.target.value)}
    //                 />
    //                 <br />
    //                 <button type="submit">Send</button>
    //             </form>
    //         </div>)
    // }


    const uniqueArray = [];
    const uniqueMsgs = {};
    conversation.forEach(obj => {
        if (!uniqueMsgs[obj.msg]) {
            uniqueMsgs[obj.msg] = true;
            uniqueArray.push(obj);
        }
    });


    const ChatHandler = (user) => {
        axios.get('http://localhost:4000/chat',
            {
                params: {
                    param1: user,
                    param2: user.name
                },
                withCredentials: true
            }).then((res) => {
                setOldMsg(res.data);
                console.log(res.data);
                setReceiverName(user);
            })
    }





    return (
        <>
            <Navbar />
            <div className="flex flex-col h-screen bg-gray-800 text-white ">

                {/* Main content */}
                <div className="flex  items-center overflow-y-auto mt-[70px]  ">
                    <div className="p-4">
                        {/* Messages list */}
                        <div className="flex flex-col space-y-4 ">
                            {uniqueArray.map((m) => (
                                <Msglist msg={m.msg} time={m.createdAt} key={m.id} chatBar={ChatHandler} />
                            ))}
                        </div>

                    </div>
                </div>


            </div>

            <div className="w-[71%] rounded-sm h-[75%] absolute top-0  mt-[87px] ml-[28%]  bg-gray-700">

                {oldMsg && oldMsg.map((chat) => {
                    return (
                        <Chats key={chat.id} sender={chat.sender} msg={chat.message} username={user.name} />
                    )
                })}
            </div>

            <div className="absolute top-0 w-[80%] h-[8%] ml-[27%] mt-[590px] flex  items-center">

                <input type="text" placeholder="Send a message..." value={input} className="rounded-3xl outline-none h-[39px] w-[75%] pl-5 ml-5 bg-gray-500 text-white mr-9" onChange={(e) => setInput(e.target.value)} />

                <button className="bg-[#9B7EDE] h-[36px]  rounded-sm p-[7px] text-white flex justify-center items-center" onClick={sendMessage} >
                    <p className="text-sm">Send</p>
                    <Image src={sendbtn} alt="send image" className="text-sm ml-[5px]" />
                </button>

            </div>
        </>
    )
}