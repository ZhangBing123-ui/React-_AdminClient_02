import React, { Component } from 'react'
import './home.css'


export default class Home extends Component {
    render() {
        return (
            <div className='home'>
             <video src={require("./vm1.mp4")} controls></video>
            </div>
        )
    }
}
