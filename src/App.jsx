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
    // Set default values for fetch request

    // Loop through bans and check if any values to the key-value
    // pairs are not null. If so, exclude the values from the fetch response
    // by checking if they're contained and refetching if so. If not, use
    // corresponding default value for fetch request

    // Create a new fetch request
    makeQuery();
    // (STRETCH) Display name
    // (STRETCH) Display details about the art piece
    // Display image
    // Display century, period, medium, and technique

  }

  const makeQuery = () => {
    // Make a query for an objectfff
      // After the first click, these results might depend
      // on what the user selects to ban
    let objectQuery =`https://api.harvardartmuseums.org/object?apikey=${ACCESS_KEY}&size=1&hasimage=1`
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
      if(json.records[0].images > 0 && 
         json.records[0].culture &&
         json.records[0].period &&
         json.records[0].medium){
        let image = json.records[0].images[0].baseimageurl
        let attributes = [json.records[0].culture, json.records[0].period, json.records[0].medium]
        //setNextBasicInfo(basicInfo)
        console.log(attributes)
        setNextAttributes(attributes)
        console.log(image)
        setNextImage(image)
      }
      else{
        let image = null
        console.log(image)
        let attributes = [null, null, null]
        console.log(attributes)
      }
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
        <div className="no-image"></div>
      )}

      {currentAttributes[0] ? (
        <button className="culture">
          {currentAttributes[0]}
        </button>
      ) : (
        <div></div>
      )}

      {currentAttributes[0] ? (
        <button className="period">
          {currentAttributes[1]}
        </button>
      ) : (
        <div></div>
      )}

      {currentAttributes[0] ? (
        <button className="medium">
          {currentAttributes[2]}
        </button>
      ) : (
        <div></div>
      )}

      <br />
      <br />
      
      <button onClick={retreiveArtwork}>Discover</button>
    </>
  )
}

export default App
