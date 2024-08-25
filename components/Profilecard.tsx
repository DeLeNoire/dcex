/* eslint-disable @next/next/no-img-element */
"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { Icon, WalletIcon } from 'lucide-react';
import Image from 'next/image';
import { TokenWithbalance, useTokens } from '@/app/api/hooks/useTokens';
import { TokenList } from './TokenList';
import { Swap } from '@/components/Swap';

type Tab = "assets" | "send" | "add" | "withdraw" | "swap"

const tabs: {id:Tab , name: string} [] = [
  {id:"assets" , name:"Assets"} , 
  {id:"send" , name:"Send"} ,
  {id:"add" , name:"Add Funds"} ,
  {id:"withdraw" , name:"Withdraw"} ,
  {id:"swap" , name:"Swap"}
]

const ProfileCard = ({publicKey}:{publicKey : string}) => {

  const session  = useSession();
  const router = useRouter()
  const [selectedTab , setSelectedTab] = useState<Tab>("assets")
  const { tokenBalances, loading } = useTokens(publicKey);

  useEffect(() => {
    if (!session.data?.user) {
      router.push("/")
    }
  }, [session.data?.user, router]);

  if (!session.data?.user) {
    return null; // Avoid rendering anything while redirecting
  }
  //console.log(session.data?.user)
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <div className=" top-0 left-0 max-w-3xl w-full h-[19rem] bg-orange-100/15 rounded-2xl z-10 border ">
        <div className="relative pl-12">
        <Component
          image={session.data?.user?.image ?? ""}
          name={session.data?.user?.name ?? ""}
        />
        <div className='space-x-4 w-full flex pr-8 pt-3 pb-2'>
        {tabs.map(tab => <TabButton active={tab.id == selectedTab} key={tab.id} onClick={ () => setSelectedTab(tab.id)}> {tab.name} </TabButton>)}
        </div>
        <div className={`${selectedTab==="assets" ? "visible" : "hidden"}`}>
          <Assets publicKey = {publicKey} tokenBalances={tokenBalances} loading={loading}/> 
        </div>
        </div> 
      </div>
      <div className="relative bg-black max-w-3xl w-full h-full rounded-lg shadow-md">
      <div className={`${selectedTab === "swap" ? "visible" : "hidden"}`}><Swap publicKey={publicKey} tokenBalances={tokenBalances} /> </div>
            {/* <div className={`${(selectedTab !== "swap" && selectedTab !== "assets") ? "visible" : "hidden"} text-white`}>Warning </div> */}
        </div>
        
      </div>
    
  )
}

function Assets({publicKey , tokenBalances , loading }:{publicKey:string , tokenBalances:{totalBalance:number , tokens:TokenWithbalance[]} | null , loading:boolean}){


  //const {loading , tokenBalances} = useTokens(publicKey)

  const [copied , setCopied] = useState(false)

  useEffect(() => {
      if(copied){
        let timeout = setTimeout(()=>{setCopied(false)},3000)
        return () => {
          clearTimeout(timeout)
        }
      }
  } , [copied])

  
  return <div className='mt-4 text-black'>
    <div className='flex pl-2'>

    <img src="/coins.png" alt="logo" width={25} height={25}/>&nbsp;
    Asset Details
    </div>
    {loading ? (
  <div className="flex justify-between pt-1">
    <div className="flex flex-row">
      <div className='flex-col space-y-1'>
      <div className="bg-gray-300 h-6 w-44 rounded-md animate-pulse"></div>
      <div className="bg-gray-300 h-6 w-44 rounded-md animate-pulse"></div>
      </div>
      <div className="bg-gray-300 h-8 w-16 rounded-md animate-pulse ml-3 mt-4"></div>
    </div>
    <div className="bg-gray-300 h-10 w-40 rounded-xl animate-pulse mr-8"></div>
  </div>
) : (
  <div className='flex justify-between pt-1'>
    <div className='flex flex-row'>
      <div className='text-6xl font-semibold'>
        ${tokenBalances?.totalBalance}
      </div>
      <div className='text-3xl font-medium pl-3 pt-5 text-slate-500'>
        USD
      </div>
    </div>
    <div className='mr-8'>
      <Button variant={'outline'} className='rounded-xl text-slate-500 border' onClick={()=>
        {navigator.clipboard.writeText(publicKey)
        setCopied(true)}}>
        <WalletIcon/> &nbsp;
        {copied ? "Copied" : "Your Wallet Address"}</Button>
    </div>
  </div>
)}
      <div className='text-white mt-10 mr-14'>
        <TokenList tokens={tokenBalances?.tokens || []}/>
      </div>


  </div>
}

function Component({ image, name }: Readonly<{ image: string, name: string }>) {
  return (
    <div className='flex justify-start space-x-10 mt-10 items-center'>
      <Image src={image} alt='logo' width={100} height={100} className='rounded-full'/>
      <div className='text-2xl font-semibold'>
        Welcome {name}
      </div>
    </div>
  )
}


function TabButton({active , children , onClick}:{active:boolean , children:React.ReactNode , onClick:()=>void}){

  return <Button onClick={onClick} className={`w-full rounded-md ${active ? 'bg-red-900' : 'bg-black'} `} >
    {children}
  </Button>

}


export default ProfileCard
