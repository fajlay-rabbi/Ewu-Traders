import Image from "next/image"
import Link from "next/link"
import bg from '../.././public/hh.png'
import signIcon from '../.././public/sign.png'
import { useState, useRef } from "react";
import axios from 'axios';


const emailRegex = /^\d{4}-\d-\d{2}-\d{3}@std\.ewubd\.edu$/;
function validateEmail(email) {
    return emailRegex.test(email);
}



const signIn = () => {

    const emailRef = useRef('');
    const passwordRef = useRef('');


    const submitHandler = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const isVaildEmail = validateEmail(email);

        if (email != '' && password != '') {

            if (!isVaildEmail) {

                alert('❌ Invalid email');

            } else {


                const JSONUserData = {
                    "users": [
                        {
                            "Email": email,
                            "Password": password,
                        },
                    ]
                }


                try {
                    axios.post('http://localhost:4000/signIn',
                        { JSONUserData },
                        { withCredentials: true }).then((res) => {

                            if (res.status === 200 && res.data === 'success') {
                                window.location.assign("/");
                            }
                            if (res.data === 'wrong_email') {
                                alert("❌ No account found with this email!");
                            }
                            if (res.data === 'wrong_password') {
                                alert("❌ Wrong Password!");
                            }
                        })


                } catch (error) {
                    alert("❌ Something went wrong!, Please try again!!");
                }

            }

        } else {
            alert('❌ Please ensure that you have filled out all input fields');
        }

    };







    return (
        <div className="hero flex justify-center">
            <div>
                <div className="absolute mt-[220px] ml-[545px]" >
                    <label htmlFor="email" className="text-blue-900 font-bold">Email</label> <br />
                    <input type="text" name="email" ref={emailRef} placeholder="2020-1-60-000@std.ewubd.edu" id="email" className="h-10 w-80 border-2 outline-none border-blue-900 rounded-md pl-2 " />
                    {/* <p className="text-red-500 text-sm">Invaild email address*</p> */}
                    <div className="mb-4"></div>
                    <br />

                    <label htmlFor="Password" className="text-blue-900 font-bold">Password</label> <br />
                    <input type="password" name="Password" ref={passwordRef} placeholder="**********" id="password" className="h-10 w-80 border-2 outline-none border-blue-900 rounded-md pl-2" />
                    <br />
                    <button type="submit" onClick={submitHandler} id="loginBtn" className="bg-[#9B7EDE] h-11 w-80  rounded-md text-white font-semibold mt-10 flex justify-center items-center">
                        <Image src={signIcon} className="mr-3 h-4 w-4" />
                        Login
                    </button>
                    <p className="text-center mt-20">Don’t have an account? <Link href="/signUp" className="text-blue-900 font-semibold">Sign up</Link></p>
                </div>
                <Image src={bg} className="h-[700px] w-[1000px]" />
            </div>
        </div>
    )
}


export default signIn