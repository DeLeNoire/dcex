import GoogleProvider from "next-auth/providers/google";
import db from "@/app/db";
import { Keypair } from "@solana/web3.js";

import { Session } from 'next-auth';


export interface session extends Session {
    user: {
      email: string;
      name: string;
      image: string
      uid: string;
    };
}

export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET || 'secr3t',
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    callbacks: {
        async jwt({ token, account, profile, user }: any) {
            if (account) {
                console.log('Provider Account ID:', account.providerAccountId);
    
                // Fetch the user from the database
                const user = await db.user.findFirst({
                    where: {
                        sub: account.providerAccountId
                    }
                });
    
                if (user) {
                    token.uid = user.id;
                } else {
                    // You can log here or handle the case where the user is not found
                    console.log('User not found, creating a new one.');
                    token.uid = account.providerAccountId;
                }
            }
    
            return token;
        },
    
        session: ({ session, token }: any): session => {
            const newSession: session = session as session;
    
            if (newSession.user && token.uid) {
                newSession.user.uid = token.uid ?? "";
            }
    
            return newSession!;
        },
    
        async signIn({ user, account, profile, email, credentials }: any) {
            if (account?.provider === "google") {
                const email = user.email;
    
                if (!email) {
                    return false;
                }
    
                const userDb = await db.user.findFirst({
                    where: {
                        username: email
                    }
                });
    
                if (userDb) {
                    return true;
                }
    
                const keypair = Keypair.generate();
                const publicKey = keypair.publicKey.toBase58();
                const privateKey = keypair.secretKey;
    
                await db.user.create({
                    data: {
                        username: email,
                        name: profile?.name,
                        profile: profile?.picture ?? "", // Fallback if picture is undefined
                        provider: "Google",
                        sub: account.providerAccountId,
                        solWallet: {
                            create: {
                                publicKey: publicKey,
                                privateKey: privateKey.toString()
                            }
                        },
                        inrWallet: {
                            create: {
                                balance: 0
                            }
                        }
                    }
                });
    
                return true;
            }
    
            return false;
        },
    }
    
}