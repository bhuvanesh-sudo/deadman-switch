'use client'

import { useAccount, useConnect, useDisconnect, useWriteContract } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { ABI, CONTRACT_ADDRESS } from '../constants/abi' // Ensure you created this file!

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { writeContract, isPending, isSuccess, error } = useWriteContract()

  // This function triggers the wallet transaction
  const handlePing = () => {
    writeContract({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: 'ping',
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-900 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8 text-red-500 tracking-tighter">
          💀 DEAD MAN'S SWITCH
        </h1>
      </div>

      <div className="relative flex flex-col place-items-center bg-slate-800 p-10 rounded-2xl border border-slate-700 shadow-2xl w-full max-w-md">
        
        {/* State 1: Not Connected */}
        {!isConnected && (
          <div className="text-center">
            <p className="mb-6 text-slate-400">Connect your wallet to prove you are alive.</p>
            <button
              onClick={() => connect({ connector: injected() })}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-blue-500/20"
            >
              Connect Wallet
            </button>
          </div>
        )}

        {/* State 2: Connected */}
        {isConnected && (
          <div className="w-full text-center">
            <div className="mb-6 p-3 bg-slate-900 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Status</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-mono text-sm">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </div>
            </div>

            <button
              onClick={handlePing}
              disabled={isPending}
              className={`w-full py-6 text-xl font-black rounded-xl transition-all transform hover:scale-105 active:scale-95 ${
                isPending 
                  ? 'bg-yellow-600 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-500 shadow-xl shadow-red-900/50'
              }`}
            >
              {isPending ? 'SIGNING...' : 'I AM ALIVE'}
            </button>

            {isSuccess && (
              <div className="mt-4 p-3 bg-green-900/30 border border-green-800 rounded text-green-400 text-sm">
                ✅ Ping Confirmed on Blockchain!
              </div>
            )}
             
            {error && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded text-red-400 text-sm break-words">
                ❌ Error: {error.message.split('.')[0]}
              </div>
            )}

            <button
              onClick={() => disconnect()}
              className="mt-8 text-xs text-slate-500 hover:text-slate-300 underline"
            >
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>
    </main>
  )
}