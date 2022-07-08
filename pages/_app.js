import { MoralisProvider } from 'react-moralis'
import { Header } from '../components/header'
import { SwapContextProvider } from '../context/context'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'

const styles = {
  wrapper: 'w-full h-screen',
  container: 'text-white max-w-screen-xl flex mx-auto',
  leftContainer: 'w-full flex justify-center',
  rightContainer: ''
}

function MyApp({ Component, pageProps }) {

  return (
    <MoralisProvider appId={'fkGOX095eWVdA0HcVxV2PyNObo1AiHYMWyIrkLAG'} serverUrl={'https://s5z02resnrnf.usemoralis.com:2053/server'}>
      <SwapContextProvider>
          <SkeletonTheme baseColor='#2B4C63' highlightColor='#4B7B9D'>
            <div className={styles.wrapper}> 
                <Header />
                  <div className={styles.container}>
                    <div className={styles.container}>
                      <Component {...pageProps} />
                    </div>
                  </div>
            </div>
          </SkeletonTheme>
      </SwapContextProvider>
    </MoralisProvider>

)
}

export default MyApp
