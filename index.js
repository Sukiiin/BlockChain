import { useState, useEffect } from "react";
import { ethers } from "ethers";
import chocolateShopABI from "C:/Users/Sukin/Desktop/Main/Solidity-Frontend-Integration/artifacts/contracts/Assessment.sol/ChocolateShop.json";

export default function ChocolateShopPage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [chocolateShop, setChocolateShop] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5Ac6eA3b9c91222d3c2aED50cf3C1f2a0191Dd0B"; // Replace with your contract address
  const chocolateshopABI = chocolateShopABI.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected:", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // Once wallet is set, we can get a reference to our deployed contract
    getChocolateShopContract();
  };

  const getChocolateShopContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const chocolateShopContract = new ethers.Contract(contractAddress, chocolateshopABI, signer);

    setChocolateShop(chocolateShopContract);
  };

  const getBalance = async () => {
    if (chocolateShop) {
      const userBalance = await chocolateShop.getBalance(account);
      setBalance(userBalance.toString());
    }
  };

  const buyChocolate = async () => {
    if (!chocolateShop) {
      console.error("Chocolate Shop contract not initialized.");
      return;
    }
  
    try {
      const quantity=prompt("Enter quantity");
      // Call the buyChocolate function on the contract
      const contributionWei = ethers.utils.parseEther("0.02");
      const tx = await chocolateShop.buyChocolate(quantity,{ value: contributionWei  });
  
      // Wait for the transaction to be mined
      await tx.wait();
  
      // Transaction mined successfully, update the balance
       await getBalance();
      
      console.log(`Bought ${quantity} unit(s) of chocolate successfully.`);
    } catch (error) {
      console.error("Error buying chocolate:", error);
    }
  };
  

  const sellChocolate = async () => {
    if (!chocolateShop) {
      console.error("Chocolate Shop contract not initialized.");
      return;
    }
  
    try {
      let quantity=prompt("Enter quantity");
      // Call the sellChocolate function on the contract
      const tx = await chocolateShop.sellChocolate(quantity);
  
      // Wait for the transaction to be mined
      await tx.wait();
  
      // Transaction mined successfully, update the balance
      await getBalance();
  
      console.log(`Sold ${quantity} unit(s) of chocolate successfully`);
    } catch (error) {
      console.error("Error selling chocolate:", error);
    }
  };
  

  const initUser = () => {
    // Check if user has MetaMask installed
    if (!ethWallet) {
      return <p>Please install MetaMask in order to use this Chocolate Shop.</p>;
    }

    // Check if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your MetaMask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Balance: {balance}</p>
        <button onClick={buyChocolate}>Buy Chocolate</button>
        <button onClick={sellChocolate}>Sell Chocolate</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Chocolate Shop</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          border: 8px solid brown;
          padding: 10px;
        }
      `}</style>
    </main>
  );
}