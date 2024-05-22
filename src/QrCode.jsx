import { useState } from "react"

export const QrCode = () => {
  const [img,setImg]=useState("")
  const [load,setLoad]=useState(false)
  const [qrData,setQrData]=useState("")
  const [size,setSize]=useState("")
  async function generateQr(){
    setLoad(true)
    try {
      const url=`https://api.qrserver.com/v1/create-qr-code/?
      size=${size}x${size}&data=${encodeURIComponent(qrData)}`
      setImg(url)
    } catch (error) {
      console.error("Error generating QR..",error)
    }
    finally{
      setLoad(false)
    }
  }

  function downloadQR() {
    fetch(img).then((response)=>response.blob())
    .then((blob)=>{
      const link=document.createElement("a")
      link.href=URL.createObjectURL(blob)
      link.download="qrcode.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }
  return (
    <div className="app-cont">
      <h2>Qr Generator</h2>
      {load && <p>Please wait loading...</p>}
        {img && <img src={img} alt="qrimg" />}
        <div>
            <label htmlFor="data" className="inp-lab"> Data for Qr code:</label>
            <input type="text" value={qrData} onChange={(e)=>setQrData(e.target.value)} id="data" placeholder="Enter data here.." />
            <label htmlFor="size" className="inp-lab">Image size(eg: 150):</label>
            <input type="text" value={size} onChange={(e)=>setSize(e.target.value)} id="size" placeholder="Enter img size.." />
            <button className="gen" disabled={load} onClick={()=>generateQr("guru")}>Generate</button>
            <button className="down" onClick={downloadQR}>Download</button>
        </div>
        <p><span>Done by </span>@Guru</p>
    </div>
  )
}
