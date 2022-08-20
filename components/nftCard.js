import { useState } from "react"

export const NFTCard = ({nft}) => {
    const [copied, setCopied] = useState(false);

    const copy = (address) => {
        navigator.clipboard.writeText(address);
        setCopied(true);

        setTimeout(() => {
            setCopied(false)
        }, 1500);
    };

    return (
        <div className="flex flex-col w-1/4">
            <div className="rounded-md">
                <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway}></img>
            </div>

            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110">
                <div className="">
                    <h2 className="text-xl text-gray-800">{nft.title}</h2>
                    <p className="text-gray-600">ID: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
                    <p className="inline text-gray-600">{`${nft.contract.address.substr(0, 5)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
                    
                    {!copied && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline-block ml-2 relative cursor-pointer text-slate-500"
                            height="18"
                            viewBox="0 0 24 24"
                            width="18"
                            onClick={() => copy(nft.contract.address)}
                        >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path
                              fill="currentColor"
                              d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm4 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"
                            />
                        </svg>
                    )}
                    {copied && (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline-block ml-2 relative cursor-pointer text-slate-500"
                        >
                            <path fill="none" d="M0 0h24v24H0V0Z"/>
                            <path
                              fill="currentColor"
                              d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0 -.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41 -.39-.39-1.02-.39-1.41 0L9 16.17Z"
                            />
                        </svg>
                    )}
            </div>
            

            <div className="flex justify-center mb-1 mt-2">
                <a className="py-2 px-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 w-4/5 text-center rounded-md text-white cursor-pointer" 
                    target={"blank"} 
                    href={`https://etherscan.io/token/${nft.contract.address}`}
                >
                    View on etherscan</a>
            </div>
            </div>
        </div>
    )
};
