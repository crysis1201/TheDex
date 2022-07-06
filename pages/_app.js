import { MoralisProvider } from 'react-moralis'
import { Header } from '../components/header'
import { SwapContextProvider } from '../context/context'
import '../styles/globals.css'

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
      <div className={styles.wrapper}> 
          <Header />
            <div className={styles.container}>
              <div className={styles.container}>
                <Component {...pageProps} />
              </div>
            </div>
      </div>
      </SwapContextProvider>
    </MoralisProvider>

)
}

export default MyApp
