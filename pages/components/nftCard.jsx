export const NFTCard = ({nft}) => {
    return (
        <div>
            <div>
                <img src={nft.media[0].gateway}></img>
            </div>
            <div>
                <h2>{nft.title}</h2>
                <p>{nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
                <p>{`${nft.contract.address.substr(0, 5)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
            </div>
            <div>
                <p>{nft.description?.substr(0, 150)}</p>
            </div>
        </div>
    )
}