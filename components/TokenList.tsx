import { TokenWithbalance } from "@/app/api/hooks/useTokens"


export function TokenList({tokens}: {
    tokens: TokenWithbalance[]
}) {
    return <div>
        {tokens.map(t => <TokenRow key={t.name} token={t} />)}
    </div>
}

function TokenRow({token}: {
    token: TokenWithbalance
}) {
    return <div className="flex justify-between">
        <div className="flex p-3">
            <div>
                <img src={token.image} className="h-10 w-10 rounded-full mr-2" />
            </div>
            <div>
                <div className="font-semibold text-sm">
                    {token.name}
                </div>
                <div className="font-slim text-slate-300 text-sm">
                    1 {token.name} = ~${token.price}
                </div>
            </div>
        </div>
        <div className="pt-3">
            <div>
                <div className="font-bold flex justify-end text-sm">
                    $ {token.usdBalance}
                </div>
                <div className="font-slim flex justify-end text-sm text-slate-300">
                    {token.balance}
                </div>
            </div>
        </div>
    </div>
}