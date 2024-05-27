import Image from "next/image";
import arrow from '../../public/arrow.png';


export default function Hero() {
    return (
        <div className="bg-[url('../../public/her1.png')] bg-center bg-no-repeat bg-contain  h-[100vh] w-[100vw]  bg-[#ECEFE6] ">
            <button className=" animate-bounce mt-[33%] ml-[13%] bg-[#34D3F5] rounded-full p-3 font-bold hover:bg-[#ffff]">
                <div className="flex justify-around items-center">
                    Explore Now
                    <Image
                        src={arrow}
                        alt="Logo"
                        className="cursor-pointer h-8 w-8"
                    />
                </div>
            </button>
        </div>
    )
}
