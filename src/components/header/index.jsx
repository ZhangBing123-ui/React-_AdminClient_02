import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {Modal,Button} from 'antd'
import LinkButton from '../link-button'
import {reqWeather} from '../../api'
import {formateDate} from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import './index.css'
 class Header extends Component {
     state={
         currentTime:formateDate(Date.now()) ,
         dayPictureUrl:'',
         weather:''
     }

    logout=()=>{
        Modal.confirm({
            title:'确认退出吗?',
            onOk:()=>{
                storageUtils.removeUser()
                memoryUtils.user={}
                this.props.history.replace('/login')
            },
            onCancel:()=>{

            }
        })
    }

    getTitle=()=>{
        let title=''
        const path=this.props.location.pathname
        menuList.forEach(item=>{
            if(item.key===path){
                title=item.title
            }else if(item.children){
               const cItem= item.children.find(cItem=>path.indexOf(cItem.key)===0)
                if(cItem){
                    title=cItem.title
                }
            }
        })
        return title
    }

    getWeather=  async()=>{
        const {dayPictureUrl,weather}=await reqWeather("北京")
        this.setState({dayPictureUrl,weather})
    }
    componentDidMount(){
      this.intervalId=setInterval(()=>{
        this.setState({currentTime:formateDate(Date.now()) })
        },1000)
        this.getWeather()
    }
    componentWillUnmount(){
        clearInterval(this.intervalId)
    }
    render() {
        const {currentTime,dayPictureUrl,weather}=this.state
        const user=memoryUtils.user
        const title=this.getTitle()
        return (
            <div className='header'>
                <div className="header-top">
                    欢迎，{user.username} &nbsp;
                    <LinkButton href="#;" onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
        <div className="header-bottom-left"><Button type='primary'>{title}</Button> </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="wather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)