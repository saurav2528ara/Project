import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import {useState,useEffect} from "react";
import {ethers} from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";

import './App.css';

function App() {
  const [account,setAccount]=useState("");
  const [contract,setContract]=useState(null);
  const [provider,setProvider]=useState(null);
  const[modalOpen,setModalOpen]=useState(false);
  
  // now interact with smart contract then we need to write code for this
  useEffect(()=>{  // Provider helps to read data from Blockchain not write For write we use Signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider=async()=>{
      if(provider){     // for reload the webpage 
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        // first we check we have provider or not
      // if Provider is available then 
      await provider.send("eth_requestAccounts",[]);
      const Signer = provider.getSigner();
      const address = await Signer.getAddress();
      // as soon as i get the address then set the address
      setAccount(address);
      // here we set contract address
      let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

      // here we create a instance of contract
      const contract = new ethers.Contract(
        contractAddress,Upload.abi,Signer
      );
      //console.log(contract);
      setContract(contract);
      setProvider(provider);

      }else{
        console.error("Metamask is not installed");
      }
      
    };
    // first check provider is available or not
    provider && loadProvider();
    
  }, []);

  return (
  <> 
  {!modalOpen && (<button className="share" onClick={() => setModalOpen(true)}>Share</button>)}
  {modalOpen && (<Modal setModalOpen={setModalOpen} contract={contract}></Modal>) } 
  <div className="App">
  <h1 style= {{color:"white"}}>Gdrive 3.0</h1>
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>


  <p style={{color:"white"}}>Account : {account ? account:"Please connect your account with meta"}</p>

  
  <FileUpload account={account} provider={provider} contract={contract} ></FileUpload> 
  <Display contract={contract} account={account} ></Display>
  </div>
  </>
  );
}


export default App;
