import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecog from './Components/FaceRecog/FaceRecog';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Signin from './Components/Signin/Signin';
 
 const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 250
      }
    }
  }
}
const initialState = {
  input: '',
  imageURL: '',
  box : {},
  route : 'signin',
  isSignedin : false,
  user: {
    id : '',
    name : '',
    email : '',
    entries: 0,
    joined: ''
  }
}
 class App extends Component{
    constructor(){
      super();
      this.state = {
        input: '',
        imageURL: '',
        box : {},
        route : 'signin',
        isSignedin : false,
        user: {
          id : '',
          name : '',
          email : '',
          entries: 0,
          joined: ''
        }
      }
    }
    calculateFaceLocation = (data) => {
      console.log(data.outputs[0].data.regions[0].region_info.bounding_box)
      const face = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('image');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: face.left_col * width,
        topRow : face.top_row * height,
        rightCol : width - (face.right_col * width),
        bottomRow : height - (face.bottom_row * height),
      }
    }
    displayFaceBox = (box) => {
      this.setState({box:box});
    }
    onInputChange = (event) => {
      this.setState({input: event.target.value});
    }
  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
      fetch('https://mysterious-brushlands-25862.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://mysterious-brushlands-25862.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }
     onRouteChange = (route) => {
      if(route === 'signout')
        this.setState(initialState);
      else if(route === 'register')
        this.isSignedin = false;
      else
        this.isSignedin = true;
      this.setState({route:route});
    }
    loadUser = (data) =>{
  this.setState({user:{
    id: data.id,
    name:data.name,
    email:data.email,
    entries:data.entries,
    joined:data.joined
  }})
}
    render(){
      return(
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        
        <Nav isSignedin={this.isSignedin} onRouteChange = {this.onRouteChange}/>
        {this.state.route==='signin'
         ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        
        :(this.state.route==='home'
         ?<div>
            <Logo/>
             <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onButtonSubmit={this.onButtonSubmit} onInputChange={this.onInputChange}/>
            <FaceRecog box = {this.state.box} imageURL={this.state.imageURL}/> 
          </div>
          :<Register onRouteChange = {this.onRouteChange} 
          loadUser = {this.loadUser}/>
        )}
        
      </div>
    );}
 }

export default App;
