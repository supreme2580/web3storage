import { Web3Storage } from "web3.storage"

const Home = () => {

  function getAccessToken () {
    return process.env.WEB3STORAGE_TOKEN
  }

 const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

  async function makeFileObjects () {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const file = document.getElementById("file")?.files[0]
    const data = await toBase64(file)
    const obj = { data: data }
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
  
    const files = [
      new File(['contents-of-file-1'], 'plain-utf8.txt'),
      new File([blob], 'data.json')
    ]
    return files
  }

  const storeFiles = async () => {
    const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFkMTREQ2VFNkQ3M0JEQjQwQjYwZDgwMkI3RWE1Qzg3NzZmRGQxNGQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA4OTQ0ODQ2NTIsIm5hbWUiOiJXRUIzUlNWUCJ9.LzMmEbuXJNkc9MfEK1lmzcHMN6BlsqPKiu27C1Z9qRo" })
    const cid = await client.put(await makeFileObjects())
    console.log('stored files with cid:', cid)
  }

  return (
    <div>
      <input type="file" id="file" />
      <button id="save" onClick={storeFiles}>Save File to ipfs</button>
    </div>
  )
}

export default Home