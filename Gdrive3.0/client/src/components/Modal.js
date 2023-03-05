import { useEffect } from "react";
import "./Modal.css";
// We use Modal for creating Share Button
const Modal=({setModalOpen, contract})=>{
    const sharing=async()=>{
        // Now fetch shared Address
        const address=document.querySelector(".address").value;
        await contract.allow(address);
        console.log("Shared");
    };
    // To show the list of accounts which i gave access
    useEffect(()=>{
        const accessList= async()=>{
            const addressList = await contract.shareAccess();
            let select = document.querySelector("#selectNumber");
            const options = addressList;

            for(let i=0; i<options.length; i++)
            {
                let opt = options[i]; // i means to fetch a paticular address
                let e1 = document.createElement("option");
                e1.textContent=opt;
                // Input values into List
                e1.value=opt;
                select.appendChild(e1);
            }
        }
        // I can call this funtion when i have contract and accessList    ## ,[] --> Depedency List
        contract && accessList();
    }, []);
    return(
    <>
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="titile">Share with</div>
            <div className="body">
            <input type="text" className="address" placeholder="Enter Address"></input>
        </div>
        <form id="myForm">
            <select id = "selectNumber">
                <option className="address">People with Access</option>
            </select>
        </form>
        <div className="footer">
            <button onClick={()=>{setModalOpen(false)}} 
            id="cancelBtn">Cancel</button>
            <button onClick={()=>sharing()}>Share</button>
        </div>
        </div>
        </div>
    </>
    );
};
export default Modal;