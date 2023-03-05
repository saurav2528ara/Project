import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload=({ contract,account,provider })=>{
    const [file,setFile]=useState(null); 
    const [fileName,setFileName]=useState("No image selected"); // to set file name
    const handleSubmit=async(e)=>{
        // we don't want when we submit the form, after submiting page should not be reload.
        e.preventDefault();
        if(file){
            try{
                const formData = new FormData();
                formData.append("file",file);

                //  Now make sure our image is Uploaded to Pinata   GET IT FROM PINATA WEBSITE
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                    pinata_api_key: `030aed1d111aa0faaa8a`,
                    pinata_secret_api_key: `5f2076689904dcaa10d0187f27a92200e26b2ef0296a30747392ac989d5c7f11`,
                    "Content-Type": "multipart/form-data",
                    },      
                });
                // creating a variable to containing image hash
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                //const signer = contract.connect(provider.getSigner());
                contract.add(account,ImgHash);
                alert("Successfully image uploaded");
                // once a image upload then it's shows again CHOOSE FILE to upload again next image
                setFileName("No image selected");
                setFile(null); 

            }catch(e){
                alert("Unable to upload image to Pinata");
            }
        }

    };
    // RetrieveFile hepls to fetch images data  Eg: GIF,PNG
    // event (e) ka use krk we get file data
    const retrieveFile=(e)=>{
        const data = e.target.files[0];  // Array of files object
        //console.log(data)
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend=()=> {  // after read the complete data (onloadend) eg:- name,modification,size,category
            setFile(e.target.files[0]);

        }
        setFileName(e.target.files[0].name); // name property
        e.preventDefault(); // for stop reloading

    };
    return <div className="top">
        <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
            Choose Image
        </label>
        <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile}/>
        <span className="textArea"> Image:{fileName}</span>         
        <button type="submit" className="upload" disabled={!file}>Upload File</button>
        </form>
    </div>
    //handleSubmit hi pinata ke through hamri images ko IPFS me store krayega
};
export default FileUpload;