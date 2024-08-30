import React, { useState, useEffect } from "react";

const GenerateQR = (props) => {

    const [url, setUrl] = useState("");
    const [dataUrl, setDataUrl] = useState(null);

    const handleQrCodeGenerator = async () => {

        const response = await fetch(`http://localhost:8080/shop/generate-qr?url=${url}`);
        const json = await response.json();

        // console.log(json);
        const {dataUrl: newDataUrl} = json;
        setDataUrl(newDataUrl);

    }

    return (
        <div style={{padding: "100px" }}>

            
            <div className="">
                <input
                    type="text"
                    placeholder="Enter a URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </div>

            <button onClick={handleQrCodeGenerator}>Generate QR Code</button>

            {dataUrl && <img src={dataUrl} alt="QR Code" />}

        </div>
    )
};

export default GenerateQR;
