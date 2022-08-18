export const NFTCard = ({nft}) => {
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
                    <button className="inline hover:scale-110" onClick={() =>  navigator.clipboard.writeText(nft.contract.address)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline-block ml-2 relative cursor-pointer text-slate-500"
                        height="18"
                        viewBox="0 0 24 24"
                        width="18"
            
                      >
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path
                          fill="currentColor"
                          d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm4 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"
                        ></path>
                      </svg>
                    </button>
            </div>
            
            <div className="flex-grow w-full mt-2">
                <p className="text-gray-600 break-words">{nft.description?.substr(0, 150)}...</p>
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
