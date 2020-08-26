import React, { Component } from 'react'
import { Form, Input, Button ,Checkbox, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../redux/actions'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {reqLogin} from '../../api'
import './login.css'
import logo from './logo.png'
const Item=Form.Item
 class Login extends Component {

     onFinish = async({username,password}) => {
        this.props.login(username,password)
        }
        

        validatePwd=(rele,value)=>{
          value=value.trim()
          if(!value){
            return Promise.reject('密码必须输入')
          }else if(value.length<4){
            return Promise.reject('密码不能小于4位')
          }else if(value.length>12){
            return Promise.reject('密码不能大于12位')
          }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            return Promise.reject('密码必须是英文、数字、下划线')
          }else{
            return Promise.resolve()
          }
        }
    render() {

      //const user=JSON.parse( localStorage.getItem("uesr_key",)||'{}')
      const user=this.props.user
       if(user._id){
          // this.props.history.replace('/login')
          return <Redirect to='/home'></Redirect>
       }

       const errorMsg=user.errorMsg
        return (
            <div className='login'>
               <div className='login-header'>
                <img src={logo} alt=""/>
                <h1>React项目:后台管理系统</h1>
               </div>
               <div className="login-content">
                 {errorMsg?<div style={{color:'red'}}>{errorMsg}</div>:null}
                <h1>用户登录</h1>
           <Form
                ref={(ref)=>this.form=ref}
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
    >
      <Item
        name="username"
        initialValue=''
        rules={[{ required: true, whitespace:true,
          message: '请输入用户名!' },
          {min:4,message:'用户名不能小于4位!'},
          {max:12,message:'用户名不能大于12位!'},
          {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字、下划线!'},
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,.25)'}}/>} placeholder="Username" />
      </Item>
      <Item
       initialValue=''
        name="password"
        rules={[{validator:this.validatePwd}]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,.25)'}}/>}
          type="password"
          placeholder="Password"
        />
      </Item>
      <Item>
        
        <Checkbox>Remember me</Checkbox>
        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Item>

      <Item>
        <Button type="primary" htmlType="submit"
         className="login-form-button" >
         登录
        </Button>
       
      </Item>
    </Form>
               </div>
            </div>
        )
    }
}
export default connect(
  state=>({
    user:state.user
  }),{
    login
  }
)(Login)