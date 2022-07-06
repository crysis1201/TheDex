import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { SwapContext } from "../context/context"
import Image from "next/image"
import { BsFillPinAngleFill } from "react-icons/bs"
 
const styles = {
    input: `w-1/2 flex appearance-none items-center justify-center border border-white rounded-lg p-2 bg-transparent mt-6 text-white placeholder:text-white`,
    container: `grid grid-flow-row gap-3 w-full max-w-screen-sm bg-main-01 rounded-lg p-5 hover:border-main-02 border-2 border-transparent`,
    select: `w-1/2 grid overflow-scroll grid-flow-row items-center justify-center border border-white rounded-lg p-2 bg-transparent mt-6 text-white placeholder:text-white`,
    options: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-black mt-6 text-white placeholder:text-white`,
    button: 'font-bold text-green-500 cursor-pointer mt-5',
  }
  

const TokenSelect = () => {

    const { tokens, setToCoin, setPinnedToken, setCoinSelect, pinnedTokens } = useContext(SwapContext)

    const {asPath, push} = useRouter()

    const [search, setSearch] = useState('')

    const [disableClick, setDisableClick] = useState(false)

    
    const coinSelectFunction = (token) => {
        if (!disableClick) {
            if (asPath === "/swap/toCoin") {
                setToCoin(token)
                push('/')
            }
            else {
                setCoinSelect(token)
                push('/')
            }
        }
    }

    const setPinned = (token) => {
        let newArray = [...pinnedTokens];
        const index = newArray.findIndex((item) => item.name === token.name)
        console.log(index)
        if (index !== -1) {
            newArray.splice(index, 1);
            setPinnedToken(newArray)
        } else {
            setPinnedToken([...pinnedTokens, token])
        }
    }

    return tokens ? (
        <div style={{boxShadow: 'rgba(11, 22, 30, 0.8) -3px 1px 25px 5px;'}} className={styles.container}>
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input onChange={(e) => setSearch(e.target.value)} type="text" className="block p-4 pl-10 w-full text-sm text-gray-400 placeholder:text-gray-500 bg-main-00 rounded-lg focus:outline-none" placeholder="Search..." />
            </div>
            <div className="flex flex-wrap flex-row items-center gap-2">
                    {
                        pinnedTokens.map((token) => {
                            return (
                                <div onClick={() => coinSelectFunction(token)} key={token.symbol} className="p-2 flex gap-2 items-center cursor-pointer text-sm font-medium bg-main-00 text-sides-03">
                                    <Image width="18" height="18" layout="fixed" unoptimized="true" src={token.logoURI} />
                                    {token.name}
                                </div>
                            )
                        })
                    }
            </div>
            <div className="w-full h-0.5 bg-sides-00"></div>
            <div className="h-96 overflow-y-scroll">
                {

                    tokens.filter((token) => token.name.includes(search))
                    .map((token) => {
                     return (
                            <div className="flex p-3 mt-2 hover:bg-main-00 rounded-lg items-center justify-between" onClick={() => coinSelectFunction(token)} key={token.name} >
                                <div className="flex gap-2 items-center">
                                    <Image width="32" height="32" layout="fixed" unoptimized="true" src={token.logoURI} />
                                    <div>
                                        <p className="font-medium">{token.name}</p>
                                        <p className="text-xs text-sides-03 font-medium">{token.symbol}</p>
                                    </div>
                                </div>
                                <div className="hover:bg-main-01 cursor-pointer p-1 rounded-full ">
                                    <BsFillPinAngleFill onClick={() => setPinned(token)} onMouseEnter={() => setDisableClick(true)} onMouseLeave={() => setDisableClick(false)} className="text-sides-03" />
                                </div>
                            </div>
                    )
                    })
                }
            </div>
        </div>
    ) : null
}

export default TokenSelect