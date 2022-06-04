import { useState } from "react"
import { NFTCard } from "./components/nftCard"

const Home = () => {
  const [wallet, setWallet] = useState("")
  const [collection, setCollectionAddress] = useState("")
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection] = useState(false)
  const [startToken, setStartToken] = useState('')

  // Fetch API 

  const fetchNFTs = async() => {
    let nfts;
    console.log("fetching nfts");
   
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTs/`;

    if(!collection.length) {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    
      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
        console.log("fetching nfts for collection owned by address")
        const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
        nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    }

    if(nfts) {
      console.log("nfts:", nfts);
      setNFTs([...NFTs, ...nfts.ownedNfts]);

      if(nfts.pageKey) {
        setStartToken(nfts.pageKey)
      }
    }
  }

  // Fetch API

  const fetchNFTsForCollection = async () => {
    if(collection.length) {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}&startToken=${startToken}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if(nfts) {
        console.log(nfts.nextToken)

        if(nfts.nextToken) {
          setStartToken(nfts.nextToken)
        }
        console.log(NFTs.length)
        console.log("NFTs in collection:", nfts)

        if(NFTs.length > 0) {
          setNFTs([...NFTs,...nfts.nfts])
        } else {
        setNFTs(nfts.nfts)
        }

    }
  }
  }

   return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3 font-mono">
      <h1 className="text-4xl text-blue-500 font-semibold">NFT Gallery</h1>
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          disabled={fetchForCollection}
          onChange={(e) => {setWallet(e.target.value)}} 
          value={wallet} 
          type={"text"} 
          placeholder="Add your wallet address"
        >
        </input>
        <input className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          onChange={(e) => {setCollectionAddress(e.target.value)}} 
          value={collection} 
          type={"text"} 
          placeholder="Add the collection address"
        >
        </input>
        <label className="text-gray-600 mt-2">
          <input className="mr-2"
            onChange={(e) => {setFetchForCollection(e.target.checked)}} 
            type={"checkbox"}
          >
          </input>Fetch for collection</label>
        <button className="disabled:bg-slate-500 text-white bg-blue-500 px-4 py-2 mt-3 rounded-md w-2/5"
          onClick={
            () => {
              if(fetchForCollection) {
                fetchNFTsForCollection()
              } else {
                fetchNFTs()
              }
            }
          } 
        >
          Fetch NFTs</button>
      </div>
      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-6 justify-center">
        {
          NFTs.length && NFTs.map((nft, index) => {
            return (
              <NFTCard nft={nft} key={index}></NFTCard>
            )
          })
        }
      </div>
      {startToken ? 
          <button 
            className={"disabled:bg-slate-500 text-white bg-blue-500 px-4 py-2 mt-6 rounded-md w-1/4"}
            onClick={
              () => {
                if (fetchForCollection) {
                  fetchNFTsForCollection()
                } else fetchNFTs()
              }
            }
          >
            Show More
          </button>
          : <></> } 
         
    </div>
  )
}

export default Home
