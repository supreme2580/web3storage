import { useState, useEffect } from "react";
import { Web3Storage } from "web3.storage"
import Link from "next/link"

const Home = () => {

  const [file, setFile] = useState(null)
  const [fileType, setFileType] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [cid, setCid] = useState(null)

  const getFile = (e) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    setFileType(e.target.files[0].type)
    setFileName(e.target.files[0].name)
    setFile(e.target.files[0])
  }

  function makeFile() {
    const files = [new File([file], fileName)]
    console.log(file)
    return files
  }

  const store = async () => {
    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN })
    const cid = await client.put(makeFile())
    setCid(cid)
  }

  return (
    <div>
      <input type="file" onChange={getFile} />
      <button onClick={store}>Save File to ipfs</button>
      <div id="url"></div>
      {
        useEffect (() => {
          const link = document.createElement("a")
          link.href = `https://${cid}.ipfs.w3s.link/${fileName}`
          link.innerHTML = "Click me to view file"
          cid != null ? document.getElementById("url").appendChild(link) : ""
        }, [cid])
      }
    </div>
  )
}

export default Home