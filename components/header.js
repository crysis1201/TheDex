import { useContext } from "react"
import { SwapContext } from "../context/context"

const styles = {
    container: 'mx-auto mt-5 mb-10 flex items-center justify-between max-w-screen-xl',
    logo: 'text-white text-lg font-bold',
    menuItem: 'cursor-pointer text-white font-bold hover:text-green-500 duration-300'   
}

export const Header = () => {
    const {isAuthenticated, formattedAccount, login, logOut} = useContext(SwapContext)
    console.log(formattedAccount)
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                Simple Dex
            </div>
            <div>
                {
                    isAuthenticated && (
                        <>
                            <div className={styles.menuItem}>{formattedAccount}</div>
                            <div className={styles.menuItem} onClick={() => logOut()}>
                                Logout
                            </div>
                        </>
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