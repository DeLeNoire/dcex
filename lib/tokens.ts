
export interface TokenDetails {
    name: string;
    mint: string;
    native: boolean;
    price: string;
    image: string;
    decimals: number;
}


export const SUPPORTED_TOKENS: TokenDetails[] = [{
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    native: true,
    price: "180",
    image: "/solana.png",
    decimals: 9
}, {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    price: "1",
    image: "/usdt.png",
    decimals: 6
},
{
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
    price: "1",
    image: "/usdc.png",
    decimals: 6
}
]