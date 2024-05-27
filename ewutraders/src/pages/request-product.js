import React, { useState, useEffect } from 'react'
import Navbar from "@/Components/Navbar"
import Image from "next/image";
import axios from 'axios';

import RequestProductCard from "@/Components/RequestProduct"

import Banner from "../../public/reqproduct.png"
import addbtn from "../../public/addpostbtn.png"


import io from "socket.io-client";
const socket = io("http://localhost:4000");

const RequestProduct =  () => {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState('');

    const [post, setPost] = useState([]);

    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');

    const titleHandler = (e) => { setTitle(e.target.value) }
    const imgHandler = (e) => { setImg(e.target.files[0]) }


    const postHandler = async () =>{
        var formData = new FormData();
        formData.append("title", title);
        formData.append("photo", img);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        }

        const res = await axios.post("http://localhost:4000/createRequest", formData, config);
        if (res.data === "Success") {
            setShow(false);
            window.location = "/request-product";
        } else {
            alert("❌ Failed to add item!");
        }

    }

    useEffect(() => {
        axios.get('http://localhost:4000/user',
            { withCredentials: true }).then((res) => {
                if (res.data === 'unauthorized') {
                    alert("You are not authorized, Please Log In! ⚠");
                    window.location.assign("/signIn");
                } 
                return res.data[0];
            }).then((res) => {
                setUser(res);
            })
    }, []);


    useEffect(() => {
        axios.get('http://localhost:4000/allreqpost',
            { withCredentials: true }).then((res) => {
                setPost(res.data);
            });
    }, []);


    // Send a chat message to the selected receiver
    const sendMsg = (msg, owner) => {
        socket.emit('chat message', msg, owner, user.name, user.email);
        
    };

    



    return (
        <div >
            <Navbar />
            <div className='flex justify-center'>
                <Image src={Banner} alt="Image" className='w-[70%]  mt-[100px]' />
                <div id="reqProdBtn" className="flex justify-center absolute mt-[270px] ml-[650px] items-center bg-[#9B7EDE] p-1 rounded-3xl cursor-pointer" onClick={() => { setShow(!show) }}>
                    <Image src={addbtn} />
                    <p className="text-white mr-2 ml-2">Add post</p>
                </div>
            </div>

            {show &&
                <div className="w-[70%] h-[60%] absolute bg-[#092B6B] ml-[200px] rounded-lg z-50">
                    <h1 className="text-white m-9 text-2xl font-bold">Add Post</h1>

                    <div className="ml-9">

                        <p className="text-white mb-2">Product name</p>
                        <input type="text" id="reqProductName" className="h-[50px] w-[50%] mb-[20px] rounded-lg pl-3 outline-none" onChange={titleHandler} />



                        <p className="text-white mb-2">Product image</p>
                        <input type="file" id="reqProductImage" className="text-white" onChange={imgHandler} />

                        <div className="flex mt-[70px]">
                            <button type="button" id="reqProductBtn" className="bg-[#9B7EDE] text-white font-semibold m-1 p-2 rounded-lg mr-8" onClick={postHandler}>Add post</button>
                            <button type="button" className="bg-white font-semibold m-1 p-2 rounded-lg" onClick={() => { setShow(false) }} >Cancle</button>
                        </div>
                    </div>
                </div>}


            <div>
                <p className="font-semibold text-[#092B6B] ml-[210px] mt-[40px] text-lg">What people are looking for</p>
            </div>

            <div className='flex flex-col items-center mt-[40px] mb-[500px]'>
                {post ? post.map((post)=>{
                    return(
                        <RequestProductCard key={post.id} title={post.title} img={post.image} owner={post.owner} sendmsg={sendMsg} />
                    )
                }) : <h1>No Post Found!</h1> }
            </div>
        </div>
    )
}

export default RequestProduct