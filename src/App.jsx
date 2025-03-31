import { useState } from 'react'
import './App.css'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {

  // Image state variable
  const [currentImage, setNextImage] = useState(null)

  // Attributes state variables
  const [currentAttributes, setNextAttributes] = useState([])

  // Bans state variables
  const [currentBans, setNextBan] = useState([]);

  const retreiveArtwork = () => {
    // Create a new API fetch request
    makeQuery();
    // (STRETCH) Display name
    // (STRETCH) Display details about the art piece
    // Display image
    // Display century, period, medium, and technique

  }

  const makeQuery = () => {
    // Make a query for an object
      // After the first click, these results might depend
      // on what the user selects to ban
    let objectQuery =`https://api.harvardartmuseums.org/object?apikey=${ACCESS_KEY}&hasimage=1&size=1`
    callAPI(objectQuery).catch(console.error)
  }

  const callAPI = async(objectQuery) => {
    const response = await fetch(objectQuery)
    const json = await response.json()
    console.log(json)
    if(json.url=null)
        alert("Oops: Something went wrong with that query. Art data couldn't be retreived.")
    else{
      // Get image and relevant attributes and place them into state variables
      let basicInfo = [json.records[0].title]
      let image = json.records[0].images[0].baseimageurl
      let attributes = [json.records[0].culture, json.records[0].period, json.records[0].medium]
      console.log(attributes)
      //setNextBasicInfo(basicInfo)
      setNextImage(image)
      setNextAttributes(attributes)
    }
  }

  return (
    <>
      <h1>Art Explorer</h1>
      <h3>Discover new art by surfing Harvard Art Museums' vast digital archives!</h3>
      {currentImage ? (
        <img className="image"
             src={currentImage}
             alt="Image returned"
        />
      ) : (
        <div></div>
      )}

      {currentAttributes[0] ? (
        <div className="culture">
          {currentAttributes[0]}
        </div>
      ) : (
        <div></div>
      )}

      {currentAttributes[0] ? (
        <div className="period">
          {currentAttributes[1]}
        </div>
      ) : (
        <div></div>
      )}

      {currentAttributes[0] ? (
        <div className="medium">
          {currentAttributes[2]}
        </div>
      ) : (
        <div></div>
      )}
      <br />
      <button onClick={retreiveArtwork}>Discover</button>
    </>
  )
}

export default App
