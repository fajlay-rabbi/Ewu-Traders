import Head from 'next/head'
import axios from 'axios';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import Navbar from '@/Components/Navbar';
import Hero from '@/Components/Hero';
import SellingSec from '@/Components/SellingSec'
import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState('');


  useEffect(() => {
    axios.get('http://localhost:4000/user',
      { withCredentials: true }).then((res) => {
        if (res.data === 'unauthorized') {
          alert("You are not authorized, Please Log In! ⚠");
          window.location.assign("/signIn");
        }else{
          setUser(res.data[0]);
        }
        return res.data[0];
      }).then((res)=>{
        const data = { 
            name: res.name, 
            email: res.email, 
          };
          // Convert the data to a string using JSON.stringify
          const dataString = JSON.stringify(data);
          // Store the stringified data in localStorage
          localStorage.setItem('user', dataString);
      })
  },[]);



  return (
    <div className='' >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="A secound hand e-commerce platfrom for east west student" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar username ={user.name} />
      <Hero />

      <div className="mt-[10px] flex flex-col justify-center items-center">
        <p className='text-center text-2xl font-medium text-[#2D2C2C]'>Looking for a specific <span className='text-[#092B6B] font-bold'>item</span>? Use our search box below to find <br /> exactly what you're looking for!</p>

        <div className='mt-[30px] mb-[20px]'>
          <input type="text"
            placeholder='Search here..'
            className="h-10 w-60 border-[1px] outline-none border-blue-900  pl-3 searchbar"
          />
          <button className='bg-[#9B7EDE] h-[40px] w-[85px] font-medium text-white righRound hover:bg-[#092B6B]' >
            Search
          </button>
        </div>

        <SellingSec name={user.name} email={user.email} />

      </div>
    </div>
  )
}


// export async function getServerSideProps(context) {


//   const { data } = await axios.get('http://localhost:4000/',
//     { withCredentials: true });


//   // Pass data to the page via props
//   return { props: { data } }
// }


// export async function getServerSideProps(context) {

//   // retrieve token from cookie

//   const cookies = cookie.parse(context.req.headers.cookie || '');
//   const token = cookies.jwt;

//   try {

//     // verify token and get user ID
//     // const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // const userId = decoded.userId;
//     // use user ID to fetch user data from database
//     // const userData = await fetchUserDataFromDatabase(userId);
//     // const { data } = await axios.get('http://localhost:4000/',
//     //   { withCredentials: true })
//     // pass user data as props to component
//     return { props: { data } };
//   } catch (err) {
//     // handle authentication error
//     return { props: { error: 'Authentication error' } };
//   }
// }

// export async function getServerSideProps(context) {
//   // Check if the user is already authenticated
//   const cookies = cookie.parse(context.req.headers.cookie || '');
//   const token = cookies.jwt;
//   if (token) {
//     // User is already authenticated, redirect to home page
//     return { redirect: { destination: '/', permanent: false } };
//   }
// }