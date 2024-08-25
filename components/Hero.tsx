"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import dynamic from 'next/dynamic';

const LandingPageModelNew = dynamic(() => import('./LandingPageModel'), { ssr: false });

const Hero = () => {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session?.user) {
            router.push('/dashboard')
        }
    }, [session, router])

    return (
        <div className='w-screen h-screen flex flex-col items-center justify-between p-24'>
            {!session?.user &&
                <>
                    <div className="text-3xl md:text-5xl font-bold">
                        <span>
                            The Cryptocurrency DeCentralized for
                        </span>
                        <span className="text-orange-500 p-3 text-4xl md:text-6xl">
                            Tomorrow
                        </span>
                    </div>

                    <div className="py-4 text-lg md:text-xl font-medium text-slate-500">
                        Convert Currencies to Crypto in Clicks
                    </div>

                    <LandingPageModelNew />
                </>
            }
        </div>
    )
}

export default Hero
