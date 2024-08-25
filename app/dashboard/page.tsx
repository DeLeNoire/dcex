import ProfileCard from "@/components/Profilecard";
import db from "@/app/db"
import { getServerSession } from "next-auth";
import {authConfig} from "@/lib/auth"
import { error } from "console";



async function getUserWallet(){

  const session = await getServerSession(authConfig)

  const userWallet = await db.solWallet.findFirst({
    where:{
      userId : session?.user.uid
    },
    select:{
      publicKey: true
    }
  })

  if(!userWallet){
    return {error:"NO USER FOUND WITH THE WALLET"}
  }

  return {error: null , userWallet}
}

export default async function Dashbard() {

  const userWallet = await getUserWallet()

  if(userWallet.error || !userWallet.userWallet?.publicKey) return <>NO WALLET FOUND</>
  
  return <div className="w-screen h-screen p-24">
    <ProfileCard  publicKey={userWallet?.userWallet?.publicKey}/>
  </div>
}
