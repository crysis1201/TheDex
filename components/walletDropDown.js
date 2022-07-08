import { useEffect, useRef } from "react"
import { BiCopy, BiLinkExternal, BiLogOut } from "react-icons/bi"

export const WalletDropdown = ({currentAccount, formatedAccount, logOut, setPopover}) => {

    const logout = () => {
        logOut()
        setPopover(false)
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              setPopover(false)
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div ref={wrapperRef} className="origin-top-right w-72 bg-main-01 text-white absolute mt-2 right-0 z-50 shadow-lg border-2 border-main-02 rounded-lg p-4">
            <div className="flex flex-col items-stretch">
                    <div className="font-semibold mb-3">Your wallet</div>
                    <div className='flex items-center justify-between text-sm'>
                        <p>{formatedAccount}</p>
                        <div className='flex gap-2'>
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(currentAccount)
                                }}
                                className="bg-gray-700 hover:bg-opacity-100 h-8 w-8 flex items-center justify-center rounded-full focus:outline-none font-medium">
                                <BiCopy size={12} className="text-white" />
                            </button>

                            <a 
                                href={`https://etherscan.io/address/${currentAccount}`} 
                                rel="noreferrer"
                                target='_blank'
                                className="bg-gray-700 hover:bg-opacity-100 h-8 w-8 flex items-center justify-center rounded-full font-medium">
                                <BiLinkExternal size={12} className="text-white" />
                            </a>
                        </div>
                    </div>
                    <button
                        className="py-2 text-left flex items-center gap-3 rounded-full font-medium text-sm focus:outline-none"
                        onClick={() => logout()}
                    >
                        <div className="bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center">
                            <BiLogOut size={12} />
                        </div>
                        Logout
                    </button>
                </div>    
        </div>
        
    )
}