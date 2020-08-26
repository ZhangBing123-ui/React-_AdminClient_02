import React, { Component } from 'react'
import './home.css'


export default class Home extends Component {
    render() {
        return (
            <div className='home'>
             <video src={require("./毛不易-呓语 (我是唱作人 第4期)(标清).mp4")} controls></video>
            </div>
        )
    }
}
