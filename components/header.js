import { useContext, useReducer, useState } from "react"
import { SwapContext } from "../context/context"
import { WalletDropdown } from "./walletDropDown"

const styles = {
    container: 'mx-auto mt-5 mb-10 flex items-center justify-between max-w-screen-xl',
    logo: 'text-white text-lg font-bold',
    menuItem: 'cursor-pointer text-white font-bold hover:text-green-500 duration-300'   
}


export const Header = () => {
    const {isAuthenticated, formatedAccount, popover, setPopover, login, currentAccount, logOut} = useContext(SwapContext)

    console.log(formatedAccount)
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                The Dex
            </div>
            <div>
                {
                    isAuthenticated && (
                        <div className="relative">
                            <div className={styles.menuItem} onClick={() => setPopover(!popover)}>
                                {formatedAccount}
                                { popover ? <WalletDropdown logOut={logOut} setPopover={setPopover} formatedAccount={formatedAccount} currentAccount={currentAccount}  /> : null }
                            </div>
                        </div>
                    )
                }
                {
                    !isAuthenticated && (
                        <>
                            <div className={styles.menuItem} onClick={() => login()}>
                                Login
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}