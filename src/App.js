import './App.css';
import mintAbi from "./mintAbi.json";
import {ethers, BigNumber} from "ethers";
import { useEffect, useState } from 'react';

const mintAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  //save data that may change
  const [accounts, setAccounts] = useState([]);

  async function connectAccounts() {
    //is metamask running ?
    if (window.ethereum) {
         const accounts = await window.ethereum.request({
           method: "eth_requestAccounts"
         });
         //set the accounts that we have received
         //paste it in the state that we created
         setAccounts(accounts);
    }
  }

  //call connect function when the page loads

  useEffect(() =>{
      connectAccounts();
  }, []);

  //after account is connected user could then mint nfts

  const [mintAmount, setMintAmount] = useState(1);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new  ethers.Contract(
      mintAddress,
      mintAbi.abi,
      signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log("response:", response);
      } catch(err) {
           console.log("error:", err);
      }
    }
  }
  return (
    <div className="App">
      Simple Mint Buuton on NFT minting Site
      {accounts.length &&(
        <div>
          <button onClick={() => setMintAmount(mintAmount - 1)}>-</button>
          {mintAmount}
          <button onClick={() => setMintAmount(mintAmount + 1)}>+</button>
          <button onClick={handleMint}>Mint</button>
        </div>
      )}
    </div>
  );
}

export default App;
