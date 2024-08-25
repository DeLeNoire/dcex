"use client"
import React from 'react'
import { Button } from './ui/button'
import { Mail } from "lucide-react"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Topbar = () => {
    const session = useSession()
    const router = useRouter()
    const handleSignIn = async () => {
        await signIn()
        router.push("/dashboard")
    }
  return <div className='border-b-2 px-2 py-2 flex justify-between'>

    <div className='text-lg font-bold p-2'>
        DeCentralized Exchange
    </div>
    <div>

        {session.data ? 
            
            <Button onClick={() => {signOut()}} variant={'ghost'}>
                <Mail className="mr-2 h-4 w-4" /> SignOut 
            </Button> 
                        : 
            <Button onClick={handleSignIn} variant={'ghost'}>
                <Mail className="mr-2 h-4 w-4" /> SignIn
            </Button>
        }
    </div>
           
    </div>
  
}


export default Topbar
