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
                        <img className=" ml-1 h-4 w-4 " src= "./copy-icon.png" />
                    </button>
            </div>

            <div className="flex-grow mt-2">
                <p className="text-gray-600">{nft.description?.substr(0, 150)}...</p>
            </div>

            <div className="flex justify-center mb-1 mt-2">
                <a className="py-2 px-4 bg-blue-500 w-1/2 text-center rounded-md text-white cursor-pointer" 
                    target={"blank"} 
                    href={`https://etherscan.io/token/${nft.contract.address}`}
                >
                    View on etherscan</a>
            </div>
            </div>
        </div>
    )
}