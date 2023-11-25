import React, { Component } from 'react'
import './style4.css'
import axios from 'axios'
export class Weatherapi extends Component {
    constructor(props) {
      super(props)
      this.state = {
         City:'',
         country:'',
         region:'',
         temp_c:'',
         temp_f:'',
         humidity:'',
         text:''
      }
    }
    handleSubmit= async ()=>{
      console.log(this.state) 
      const {City}=this.state
      let apiKey='887f8d8fbed04628be085053231007'
      let apiUrl=`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${City}&aqi=no`
      

      await axios.get(apiUrl)
      .then((res)=>{
        let loc=res.data.location
        let cur=res.data.current
        this.setState({country:loc.country})
        this.setState({region:loc.region})
        this.setState({temp_c:cur.temp_c})
        this.setState({temp_f:cur.temp_f})
        this.setState({humidity:cur.humidity})
        this.setState({text:cur.condition.text})
        // console.log(res.data)
        console.log(this.state)

      })
      .catch((err)=>{
        console.log(err)
      })
    }
    handleChange=(e)=>{
      console.log(e.target.value)
      this.setState({City:e.target.value})
    }
  render() {
    console.log(this.state)
    return (
      <div style={{margin:'3%',paddingLeft:'1%'}}>
        <div className='example'  style={{margin:'auto',maxWidth:'300px'}}>
          <div className='input-group mb-3'>
            <input type="text" onChange={(e)=>{this.handleChange(e)}} placeholder="Search.." name="search" style={{border:'2px solid grey'}}/>
            <button type="submit" className='btn btn-warning' onClick={()=>{this.handleSubmit()}}><i className='fa fa-search'></i></button>
            {/* <span className='input-group-text' id="inputGroup-sizing-default"></span> */}
          </div>
        {this.state.City&&this.state.country?<div id='maindiv'>
        City:{this.state.City}<hr/>
        Country:{this.state.country}<hr/>
        State:{this.state.region}<hr/>
        Temperature(in C):{this.state.temp_c}<hr/>
        Temperature(in F):{this.state.temp_f}<hr/>
        Humidity:{this.state.humidity}<hr/>
        Weather:{this.state.text}</div>:<div></div>}
        </div>
      </div>
    )
  }
}

export default Weatherapi