import { useContext, useEffect, useState } from "react"
import { SwapContext } from "../context/context"
import { BiChevronDown, BiDownArrowAlt } from 'react-icons/bi'
import { useRouter } from "next/router"
import Skeleton from "react-loading-skeleton"
import styles from 'react-loading-skeleton/dist/skeleton.css'

const style = {
  input: `w-1/2 flex appearance-none items-center justify-center border border-white rounded-lg p-2 bg-transparent mt-6 text-white placeholder:text-white`,
  container: `items-center bg-main-01 rounded-lg p-5 hover:border-main-02 max-w-screen-sm w-full border-2 border-transparent`,
  select: `w-1/2 grid overflow-scroll grid-flow-row items-center justify-center border border-white rounded-lg p-2 bg-transparent mt-6 text-white placeholder:text-white`,
  options: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-black mt-6 text-white placeholder:text-white`,
  button: 'font-bold text-green-500 cursor-pointer mt-5',
}

export const TokenSwap = () => {

    const { setCoinSelect, usdPrice, isAuthenticated, doSwap, toCoinLoading, toCoinAmount, coinSelect, toCoin, setToCoin, amount, setAmount, tokens } = useContext(SwapContext)

    const { push } = useRouter()

    const [rotate, setRotate] = useState(false)

    const swapToken = () => {
        setToCoin(coinSelect)
        setCoinSelect(toCoin)
    }

    return coinSelect && toCoin ? (
        <div style={{boxShadow: 'rgba(11, 22, 30, 0.8) -3px 1px 25px 5px;'}} className={style.container}>
            <div className="bg-main-00 p-4 rounded-lg flex items-center justify-between">
                <div className="text-white">
                    <h1 className="text-sides-03 mb-2 font-medium text-sm">You sell</h1>
                    <div className="">
                        <div className="flex items-center justify-between">
                            <div onClick={() => push('/swap/selectCoin')} className="flex items-center rounded-2xl hover:bg-main-01 -ml-2 p-2 cursor-pointer">
                                <img className="w-8 h-8 mr-2" src={coinSelect.logoURI} />
                                <p className="text-xl font-medium">{coinSelect.symbol}</p>
                                <BiChevronDown className="text-sides-03 h-6 w-6" />
                            </div>
                            <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} className=' appearance-none bg-transparent text-xl focus:outline-none font-medium text-right'/>
                        </div>
                        <div className="flex items-center text-sides-03 text-xs  justify-between mt-2">
                            <p className="uppercase">{coinSelect.symbol}</p>
                            {amount != 0 && (toCoinLoading ? <Skeleton width={20} /> : <p>{usdPrice.toFixed(2)}</p>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex -mt-2 justify-center" onClick={() => swapToken()}>
                <BiDownArrowAlt className="text-3xl bg-sides-01 relative z-10 rounded-full p-1 transform transition-all hover:rotate-180 cursor-pointer" />
            </div>
            <div className="border-2 -mt-2 border-sides-01 p-4 rounded-lg flex items-center justify-between">
                <div className="text-white w-full">
                    <h1 className="text-sides-03 mb-2 font-medium text-sm">You buy</h1>
                    <div className="flex items-center w-full justify-between">
                        <div onClick={() => push('/swap/toCoin')} className="flex items-center rounded-2xl hover:bg-main-00 -ml-2 p-2 cursor-pointer">
                            <img className="w-8 h-8 mr-2" src={toCoin.logoURI} />
                            <p className="text-xl font-medium">{toCoin.symbol}</p>
                            <BiChevronDown className="text-sides-03 h-6 w-6" />
                        </div>
                        {toCoinLoading ? <Skeleton width={180}  /> : <div className="text-right text-xl font-medium"><p className="w-full">{parseFloat(toCoinAmount).toFixed(4)}</p></div>}
                    </div>
                </div>
            </div>
            <button onClick={() => doSwap()} className='w-full bg-main-00 p-2 rounded-lg mt-4 font-medium text-main-03'>{isAuthenticated ? "Approve" : "Connect Wallet"}</button>
        </div>
    ) : null
}