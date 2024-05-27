import Image from "next/image"
import Link from "next/link"
import bg from '../.././public/su.png'
import signIcon from '../.././public/signup.png'
import passwordCheck from '../.././lib/password'
import axios from 'axios';

import { useRef } from "react"



export default function signUp() {
    // const  email = validateEmail(email);

    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confrimPasswordRef = useRef('');

    const submitHandler = async () => {
        const username = nameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const confirm_Password = confrimPasswordRef.current.value


        if (username != '' && email != '' && password != '' && confirm_Password != '') {
            const isVaildEmail = passwordCheck.validateEmail(email);
            if (!isVaildEmail) {
                alert("⚠ Please use your university email")
                return;
            }

            if (password != confirm_Password) {
                alert("⚠ Password doesn't match")
                return;
            }

            
            const JSONUserData = {
                "users": [
                    {
                        "Name": username,
                        "Email": email,
                        "Password": password,
                    },
                ]
            }

            try {
                axios.post('http://localhost:4000/signUp',
                    { JSONUserData },
                    { withCredentials: true }).then((res) => {
                        if (res.status === 200 && res.data === 'created') {
                            alert("✅ Account created successfully");
                            window.location.assign("/Otp");
                        }
                        if (res.data === 'exist') {
                            alert("⚠ Email already exists");
                        }
                        if(res.data === 'failed') {
                            alert("❌ Failed to create account");
                        }
                        // console.log(res);
                    })
            } catch (error) {
                alert("❌ Something went wrong!, Please try again!!")
            }



        } else {
            alert('❌ Please ensure that you have filled out all input fields');
        }

    }





    return (
        <div className="hero flex justify-center">
            <div>
                <div className="absolute mt-[160px] ml-[540px]" >

                    <label htmlFor="name" className="text-blue-900 font-bold">Name</label> <br />
                    <input type="text" name="name" placeholder="Rafi Haque" ref={nameRef} id="" className="h-10 w-80 border-2 outline-none border-blue-900 rounded-md pl-2 mb-4 " />

                    <br />

                    <label htmlFor="email" className="text-blue-900 font-bold">Email</label> <br />
                    <input type="email" name="email" ref={emailRef} placeholder="2020-1-60-000@std.ewubd.edu" id="" className="h-10 w-80 border-2 outline-none border-blue-900 rounded-md pl-2 mb-4" />

                    <br />

                    <label htmlFor="Password" className="text-blue-900 font-bold">Password</label> <br />
                    <input type="password" name="Password" ref={passwordRef} placeholder="**********" id="" className="h-10 w-80 border-2 outline-none border-blue-900 rounded-md pl-2 mb-4" />

                    <br />

                    <label htmlFor="Password" className="text-blue-900 font-bold">Confirm Password</label> <br />
                    <input type="password" name="Password" ref={confrimPasswordRef} placeholder="**********" id="" className="h-10 w-80 border-2 outline-none border-blue-900 rounded-md pl-2" />

                    <br />

                    <button type="submit" className="bg-[#9B7EDE] h-11 w-80  rounded-md text-white font-semibold mt-8 flex justify-center items-center" onClick={submitHandler}>
                        <Image src={signIcon} className="mr-3 h-4 w-4" />
                        Register
                    </button>
                    <p className="text-center mt-7">Already have an account ? <Link href="/signIn" className="text-blue-900 font-semibold">Sign In</Link></p>
                </div>

                <Image src={bg} className="h-[700px] w-[1000px]" />
            </div>
        </div>
    )
}


