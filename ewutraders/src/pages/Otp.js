import Image from "next/image"
import Link from "next/link"
import bg from '../.././public/ot.png'
import signIcon from '../.././public/otp.png'
import { useRef } from "react";
import axios from 'axios';




export default function Otp() {
    const otp1 = useRef('');
    const otp2 = useRef('');
    const otp3 = useRef('');
    const otp4 = useRef('');

    const otpSubmitHandler = () =>{

        const one = otp1.current.value;
        const two = otp2.current.value;
        const three = otp3.current.value;
        const four = otp4.current.value;
        const userOtp = one + two + three + four;

        const JSONUserData = {
            "users": [
                {
                    "otp": userOtp,
                },
            ]
        }

        try {
            axios.post('http://localhost:4000/checkOtp',
                { JSONUserData },
                { withCredentials: true }).then((res) => {

                    if (res.status === 200 && res.data === 'success') {
                        window.location.assign("/");
                    }
                    if (res.data === 'wrong_otp') {
                        alert("❌ Wrong OTP!");
                    }

                    if (res.data === 'unauthorized'){
                        window.location.assign("/signUp");
                    }
                })
        } catch (error) {
            alert("❌ Something went wrong!, Please try again!!");
        }

    }

    const resendOtpHandler = () =>{
        const JSONUserData = {
            "users": [
                {
                    "otp": "0000",
                },
            ]
        }

        try {
            axios.post('http://localhost:4000/resendOtp',
                { JSONUserData },
                { withCredentials: true }).then((res) => {

                    if (res.status === 200 && res.data === 'success') {
                        alert("A New OTP has been send to your email!")
                    }

                    if (res.data === 'unauthorized') {
                        window.location.assign("/signUp");
                    }
                })
        } catch (error) {
            alert("❌ Something went wrong!, Please try again!!");
        }
    }


    return (

        <div className="hero flex justify-center">
            <div>
                <div className="absolute mt-[250px] ml-[540px]" >
                    <p className="font-bold text-center mb-10 text-xl">Enter the 4 digit OTP</p>
                    <div className="flex justify-between">

                        <input type="number" name="" id="" ref={otp1} className="h-12  appearance-none w-12 border-2 outline-none border-blue-900 rounded-md pl-4 font-bold text-xl text-[#9B7EDE] " />

                        <input type="number" name="" id="" ref={otp2} className="h-12  appearance-none w-12 border-2 outline-none border-blue-900 rounded-md pl-4 font-bold text-xl text-[#9B7EDE] " />

                        <input type="number" name="" id="" ref={otp3} className="h-12  appearance-none w-12 border-2 outline-none border-blue-900 rounded-md pl-4 font-bold text-xl text-[#9B7EDE] " />

                        <input type="number" name="" id="" ref={otp4} className="h-12  appearance-none w-12 border-2 outline-none border-blue-900 rounded-md pl-4 font-bold text-xl text-[#9B7EDE] " />

                    </div>

                    <br />

                    <button type="submit" className="bg-[#9B7EDE] h-11 w-80  rounded-md text-white font-semibold mt-5 flex justify-center items-center" onClick={otpSubmitHandler}>
                        <Image src={signIcon} className="mr-3 h-6 w-6" />
                        Verify
                    </button>

                    <p className="text-center mt-7">Didn’t get the OTP ? <span href="/signIn" className="text-blue-900 font-semibold cursor-pointer" onClick={resendOtpHandler}>Resend</span></p>
                </div>

                <Image src={bg} className="h-[700px] w-[1000px]" />
            </div>
        </div>
    )
}


