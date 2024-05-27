import Image from "next/image";
import msgImg from "../../public/mess.png"
import { useRouter } from 'next/router';

export default function Msglist({ msg, time, chatBar }) {
    const router = useRouter();

    const msgtime = time.replace("T", " ");
    const sendTime = msgtime.split(".");

    const ChatHandler = () => {
        chatBar(msg);
    }

    return (
        <> 
            <div className="flex items-center space-x-4 p-2 w-[100%] cursor-pointer bg-gray-700 rounded-lg hover:bg-gray-600" onClick={ChatHandler}>
                <div className="w-12 h-12 rounded-full flex justify-center items-center">
                    <Image src={msgImg} className="w-[80%]" />
                </div>
                <div className="flex-1">
                    <div className="text-lg font-semibold">{msg}</div>
                </div>
                <div className="text-sm text-gray-400">{sendTime[0]}</div>
            </div>


            


            
        </>
    )
}