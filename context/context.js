import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useMoralis } from "react-moralis"

export const SwapContext = createContext()

export const SwapContextProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState(null)
    const [popover, setPopover] = useState(false)
    const [formatedAccount, setFormatedAccount] =  useState(null)
    const [balance, setBalance] = useState(0)
    const [tokens, setTokens] = useState(null)
    const [coinSelect, setCoinSelect] = useState(null)
    const [toCoin, setToCoin] = useState(null)
    const [toCoinLoading, setToCoinLoading] = useState(false)
    const [amount, setAmount] = useState("0")
    const [toCoinAmount, setToCoinAmount] = useState('0')
    const [estimatedGas, setEstimatedGas] = useState('0')
    const [usdPrice, setUsdPrice] = useState(0)
    const [pinnedTokens, setPinnedToken] = useState(null)
    const [allowance, setAllowance] = useState(false)

    const { authenticate, isAuthenticated, Moralis, isAuthenticating, user, account, logout, isInitialized } = useMoralis();

    useEffect(() => {
        if (isInitialized) {
            getSupportedTokens() 
        } 
    }, [isInitialized])

    const getSupportedTokens = async () => {
        await Moralis.initPlugins()
        let tokens = await Moralis.Plugins.oneInch.getSupportedTokens({
        chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
        });
        tokens = Object.keys(tokens.tokens).map(key => tokens.tokens[key])
        let pinnedToken = tokens.filter(token => token.symbol.toLowerCase() === "eth" || token.symbol.toLowerCase() === "mana" || token.symbol.toLowerCase() === "matic")
        setPinnedToken(pinnedToken)
        setTokens(tokens)
        setCoinSelect(tokens[0])
        setToCoin(tokens[2])
    }

    console.log({pinnedTokens})

    useEffect(() => {
        if (isAuthenticated) {
            const account = user.get('ethAddress')
            const formatedAccount= account.slice(0,7)+'...'+account.slice(-4)
            setCurrentAccount(account)
            setFormatedAccount(formatedAccount)
        }
    }, [isAuthenticated, user])

    async function abcd (account) {
      const Monster = Moralis.Object.extend("_EthAddress");
      const query = new Moralis.Query(Monster);
      query.equalTo("objectId", account);
      const results = await query.find();
      console.log(results)
    }

    const login = async () => {
        if (!isAuthenticated) {
          await authenticate({signingMessage: "Log in using Moralis" })
            .then(function (user) {
              console.log("logged in user:", user);
              console.log(user.get("ethAddress"));
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    }

    console.log(amount)

    useEffect(() => {
      if (isInitialized && coinSelect && toCoin) {
        getQuote()
      }
    }, [amount, toCoin, coinSelect])

    async function getQuote() {
      if (!coinSelect || !toCoin || !amount) return;      
      await Moralis.initPlugins()
      setToCoinLoading(true)
      try {
        const quote = await Moralis.Plugins.oneInch.quote({
          chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
          fromTokenAddress: coinSelect.address.toString(), // The token you want to swap
          toTokenAddress: toCoin.address.toString(), // The token you want to receive
          amount: Moralis.Units.Token(amount, coinSelect.decimals,).toString()
        });
        setToCoinAmount(Moralis.Units.FromWei(quote.toTokenAmount, toCoin.decimals))
        setEstimatedGas(quote.estimatedGas)
        const options = {
          address: coinSelect.address,
          chain: "eth",
        };
        const price = await Moralis.Web3API.token.getTokenPrice(options);
        setUsdPrice(price.usdPrice)
        setToCoinLoading(false)
      } 
      catch (err) {
        console.log(err.message)
      }
    }

    async function doSwap() {
      if (!isAuthenticated) {
        login()
        return
      }
      try {
        const allowance = await Moralis.Plugins.oneInch.hasAllowance({
          chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
          fromTokenAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", // The token you want to swap
          fromAddress: currentAccount, // Your wallet address
          amount: Moralis.Units.Token(amount, coinSelect.decimals,).toString(),
        });
        console.log(`The user has enough allowance: ${allowance}`);
        setAllowance(true)
      } catch (err) {
        console.log(err.message)
        setAllowance(false)
      }
      const approve = async () => {
        if (!allowance)
          try {
            const approve  = await Moralis.Plugins.oneInch.approve({
              chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
              tokenAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", // The token you want to swap
              fromAddress: currentAccount, // Your wallet address
            });
            console.log(approve)
          } 
          catch ({...err}) {
            console.log(err.message)
            toast.error(err.message.data.data.description)
          }
      }
      await approve()
      try {
        const receipt = await Moralis.Plugins.oneInch.swap({
          chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
          fromTokenAddress: "0x0da6ed8b13214ff28e9ca979dd37439e8a88f6c4", // The token you want to swap
          toTokenAddress: toCoin.address, // The token you want to receive
          amount: Moralis.Units.Token(amount, coinSelect.decimals,).toString(),
          fromAddress: currentAccount, // Your wallet address
          slippage: 1,
        });
        console.log(receipt);
      } catch (err) {
        console.log(err.message)
      }
    }

    const logOut = async () => {
      await logout();
      console.log("logged out");
    }

    return (
        <SwapContext.Provider value={{logOut, isAuthenticated, popover, toCoinLoading, setPopover, setPinnedToken, pinnedTokens, usdPrice, doSwap, toCoinAmount, estimatedGas, tokens, login, currentAccount, formatedAccount, isAuthenticated, coinSelect, setCoinSelect, toCoin, setToCoin, amount, setAmount}}>
            {children}
        </SwapContext.Provider>
    )
}