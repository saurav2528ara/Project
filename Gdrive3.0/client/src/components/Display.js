// import hooks
import {useState} from 'react';
import "./Display.css"
const Display=({contract,account})=>{
    const [data,setData]=useState("")  // helps to set images data
    const getdata=async()=>{
        let dataArray;
        const Otheraddress = document.querySelector(".address").ariaValueMax;
                 // if a user fill his address then we need to fetch and allow him to access
        if(Otheraddress){
            dataArray=await contract.display(Otheraddress);
            console.log(dataArray) // to show 

        }else{
            dataArray=await contract.display(account)  // Show connected Account Data
        }
        const isEmpty = Object.keys(dataArray).length==0; // we have nothing in our data array so we don't need to execute

        if(!isEmpty){
            const str = dataArray.toString();
            const str_array = str.split(",");
            // console.log(str);
            // console.log(str_array);
            const images = str_array.map((item,i)=>{
                return(
                    <a href={item} key={i} target="_blank">
                        <img key={i} src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                        alt="new"
                        className="image-list"
                        ></img>
                    </a>
                )
            })
            setData(images);
        } else{
            alert("No image to display");
        }
    };

    return<>
    <div className='image-list'>{data}</div>
    <input type="text" placeholder='Enter Address' className='address'></input>
    <button className='center button' onClick={getdata}>Get Data</button>
    </>;
};
export default Display;