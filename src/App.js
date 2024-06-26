import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Rank from './components/Rank/Rank.js';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [{}],
  route: 'signin',
  isSignedIn: false,
  user: {
    email: '',
    name: '',
    id: '',
    entries: 0,
    joined:''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      email: data.email,
      name: data.name,
      id: data.id,
      entries: data.entries,
      joined:data.joined
    }})
  }

  // This function is called however many faces there are in an input pic
  calculateFaceLocation = (topRow, leftCol, bottomRow, rightCol) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const newBox =  {
      top_row: topRow * height,
      left_col: leftCol * width,
      bottom_row: height - (bottomRow * height),
      right_col: width - (rightCol * width)
    }
    
    return newBox;
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value});
  }

  afterInputChange = (value) => {
    this.setState({ input: value });
  }

  onButtonSubmit = () => {
    // console.log(this.state.input);
    this.setState({ imageUrl: this.state.input});
    /*
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    // PAT is exposed to user if defining it in frontend. Move it to backend
    const PAT = 'f8d13ed4152b4448925b78256ba91475';

    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'dice-k5599';
    const APP_ID = 'my-first-application-6414y';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = this.state.input;
    // To use image bytes, assign its variable   
    // const IMAGE_BYTES_STRING = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAoACgDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYDBQcE/8QAMBAAAQMDAwMDAgQHAAAAAAAAAQIDBAAFEQYSIQcTMTJBURRhCBYikSNScXKhsdH/xAAZAQACAwEAAAAAAAAAAAAAAAAFBgIDBAf/xAAtEQABAwMBBgQHAQAAAAAAAAABAgMRAAQhMQUSE0FRYQaBocEUFiJCcrHR8P/aAAwDAQACEQMRAD8A3+RYY1unSYzCS0ttZUkAgktn0q5yT7jPyDUC4wdGwycH5U2Kt9ZQ7VI1qw5PkvQy3CSVPpf7aQjuKyFH25xzn3pHn3TVNy01Hl2hyy6YdkSpKsS9sl/6RlI3rRu3dxWd6spwnAGPIJTfl925fcLaoSDHXvyo6i9SlCQrU9wKln3OyWiaDN1RAbW3kKbSd7gPtwMkH/tTWy9afuy1iPfnXMAblITwkE4yf08cn3pSbYt1uts24XH6fUbiLAuY1MWyGkLEmUW0rcCRvUpQ5CtwKQCPgi4S1ZbDe4sd9NntDEe79m3uOBLTr0IR9jzodSMqUpTu9JJ8owD7UTT4ZCfv9PbP7860m+s+HBSrejWRuz2kAxoesGYxTW/Zlpkwo1vkuSly3UgKWQUhHJUvIHsAaKTemF8XE6sWmxyZkiaZrMh1jv8ArQNpUVqB8FW0njHqx4zRVVhsph1KlKk5xQ+7uHmikaSJrQerMByet2IwvtuTLa4xv2k7Rk84H9x/esHv92d01boenLXGcuiWrFIhLlpbcaQ2/JdK3VJCkAq2pAR7Zz7YxWudY9fxNIdQbNGkR5TyX4aisNNpUMFZAzkj4NK0jq9ZpbLr0PSlzkhrlZDaQlP3P8Q4/ap3F87bPucJEkx/hHv60b2TYXLrKN5sramYECSQRk9M6c6zmJ+eb5Hi22M7cnWGIQgFLbX0zSo4PDa1YBcTgDyMjJ/qbGPabH08SJt1Uzc9QqRliGg5QySPKvgc+TyfYDmmTUWpNYz7ctxoQdPQshCktupckDJUPUcJT6DwMq8YyaQ9VL0pCS8zapcq4SVOBZmPDO8/cnknlWcDBwn4NYnPjLkQ+qE9OtOVlYpeVHDCEkkkJyT+SuQzy5Y0ru6Ez511/Efa5s1fdkOtyVurIxgdlQAA9gOKKPwolU7remU5hCGYEgo38KUv9I/0TRTDYJCWQBSF4rIN/CRgAR0iTpVD1j1g/qDqJcJqlKcjB9bcda142MpOEJAzgeMnjyTSyze5KEuNRpDoDvC0oe4X9iAeaKKFK+oya6fbOqYbDTeEiAPKpHdS3gBLYc7RQkp3ApQog+cq8nwPJrljzxnPZbUfnugn/NFFRgEVch9xKsH0H8pg6e3x3T3UC1ajaZITGkJLoS4MKbOUrzz/ACKVRRRVzVwtoQmhG1NkWu0HuI+JI8u/Kv/Z';

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                        // "base64": IMAGE_BYTES_STRING
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    */

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID +  "/outputs", requestOptions)
    fetch('http://localhost:4000/api', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then((response) => {
        if (response.status === 500) {
          throw new Error("API connection cannot be established at the momment");
        }
        return response.json();
    })
      .then(result => {
          if (result)
          {
            fetch('http://localhost:4000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count }))
              })
              .catch(console.log);
          }
          const regions = JSON.parse(result).outputs[0].data.regions;
          console.log(regions);
          
          // array will hold all the boxes that covers the regions of detected faces
          // regions.map will return the regions of box for each faces
          const boxesArray = regions.map(region => {
            // Accessing and rounding the bounding box values
            const boundingBox = region.region_info.bounding_box;
            const topRow = boundingBox.top_row.toFixed(3);
            const leftCol = boundingBox.left_col.toFixed(3);
            const bottomRow = boundingBox.bottom_row.toFixed(3);
            const rightCol = boundingBox.right_col.toFixed(3);

            
            return this.calculateFaceLocation(topRow, leftCol, bottomRow, rightCol);
        }); // end of regions.map()

        // after locating all the box location in boxesArray, set boxes state to this array
        this.setState({boxes: boxesArray});
      })
      .catch(error => console.log('error', error));

  }

  // this funciton will be called every time a route change must occur
  onRouteChange = (route) => {
    this.setState({ route: route });  // change route state to argument passed
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
  }

  render() {
    const { imageUrl, boxes, route, user} = this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>

        { route === 'home' 
          ? <div>
              <Logo />
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div>
          : (
            route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          ) 
        }
        <div>
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.5" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.5" />
              {/* <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.7" /> */}
            </g>
          </svg>
        </div>
        {/* Wave div ends */}
      </div>
    );
  }
}

export default App;
