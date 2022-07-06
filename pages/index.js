import Asset from "../components/assets"
import { Header } from "../components/header"
import PortfolioChart from "../components/portfolioChart"
import { TokenSwap } from "../components/tokenSwap"

const styles = {
  wrapper: 'w-full h-screen',
  container: 'text-white max-w-screen-xl flex mx-auto',
  leftContainer: 'w-full flex justify-center',
  rightContainer: ''
}

export default function Home() {

  return (
      <TokenSwap />
  )
}
