import Image from "next/image"
import addbtn from "../../public/addpostbtn.png"
import axios from 'axios';


import SellCard from "./SellCard"
import { useState, useEffect } from "react";

import io from "socket.io-client";
const socket = io("http://localhost:4000");


export default function SellingSec({ name, email }) {
    const [show, setShow] = useState(false);

    const [post, setPost] = useState([]);


    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState("");



    const titleHandler = (e) => { setTitle(e.target.value) }
    const priceHandler = (e) => { setPrice(e.target.value) }
    const imgHandler = (e) => { setImg(e.target.files[0]) }


    const addPostHandler = async () => {
        if (title !== '' && price !== '') {
            var formData = new FormData();
            formData.append("title", title);
            formData.append("price", price);
            formData.append("photo", img);
            formData.append("user", name);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            }

            const res = await axios.post("http://localhost:4000/createPost", formData, config );

            if (res.data === "Success") {
                setShow(false);
                window.location = "/";
    
            } else {
                alert("❌ Failed to add item!");
            }
        }else{
            alert("Please fill up all data feild");
        }
    }


    useEffect(() => {
        axios.get('http://localhost:4000/allsellpost',
            { withCredentials: true }).then((res) => {
                setPost(res.data);
            });
    }, []);



    // Send a chat message to the selected receiver
    const sendMsg = (msg, owner) =>{
        socket.emit('chat message', msg, owner, name, email);
        };
    



    return (
        <div id="sellingSec" className='mt-[40px] mb-[1000px] flex justify-center w-[100%]'>
            <div className='w-[90%]'>
                <div className="flex justify-between mb-[50px]">
                    <p className="font-semibold text-[#092B6B] text-lg">What people are selling</p>
                    <div className="flex justify-center items-center bg-[#9B7EDE] p-1 rounded-3xl cursor-pointer" id="addProduct" onClick={() => { setShow(!show) }}>
                        <Image src={addbtn} />
                        <p className="text-white mr-2 ml-2">Add Product</p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-between" onClick={() => { setShow(false) }}>
                    {
                        post ? 
                        
                            post.map((item) => { 
                                return(
                                    <SellCard key={item.id} title={item.title} price={item.price} img={item.image} owner={item.owner} sendmsg={sendMsg} />
                                )
                             })

                        : "No Post Found"
                    }
                </div>
            </div>

            {show &&
                <div className="w-[70%] h-[80%] absolute bg-[#092B6B] mt-[60px] rounded-lg">
                    <h1 className="text-white m-9 text-2xl font-bold">Add Post</h1>

                    <div className="ml-9">

                        <p className="text-white mb-2">Product name</p>
                        <input type="text" id="productName" className="h-[50px] w-[50%] mb-[20px] rounded-lg pl-3 outline-none" onChange={titleHandler} />

                        <p className="text-white mb-2">Product price</p>
                        <input type="text" id="productPrice" className="h-[50px] w-[50%] mb-[20px] rounded-lg pl-3 outline-none" onChange={priceHandler} />

                        <p className="text-white mb-2">Product image</p>
                        <input id="productImage"  type="file" className="text-white" onChange={imgHandler} />

                        <div className="flex mt-[70px]">
                            <button type="button" id="addProductBtn" className="bg-[#9B7EDE] text-white font-semibold m-1 p-2 rounded-lg mr-8" onClick={addPostHandler} >Add post</button>
                            <button type="button" className="bg-white font-semibold m-1 p-2 rounded-lg" onClick={() => { setShow(false) }} >Cancle</button>
                        </div>
                    </div>
                </div>}

        </div>
    )}