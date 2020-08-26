import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu } from 'antd';
import {
   HomeFilled,MailOutlined
  } from '@ant-design/icons';
import {connect} from 'react-redux'  
import {setHeaderTitle} from '../../redux/actions'
import menuList from '../../config/menuConfig'
import logo from './logo.png'
import  './index.css'

const { SubMenu } = Menu;
const Item=Menu.Item

 class LeftNav extends Component {
   
    hasAuth=(item)=>{
        const user=this.props.user
        const menus=user.role.menus
            if(user.username==='admin'||item.pubilc||menus.indexOf(item.key)!==-1){
                return true
            }else if(item.children){
                const cItem=item.children.find(cItem=>menus.indexOf(cItem.key)!==-1)
                return !!cItem
            }
        
        return false
    }
        
      getMenuNodes2=(menuList)=>{

        const path=this.props.location.pathname
        return menuList.reduce((pre,item)=>{
            if(this.hasAuth(item)){
                 if(!item.children){
                     if(item.key===path||path.indexOf(item.key)===0){
                         this.props.setHeaderTitle(item.title)
                     }
                pre.push(
                    <Item key={item.key}
                     icon={<HomeFilled/>}
                    >
                       <Link to={item.key} onClick={()=>this.props.setHeaderTitle(item.title)}>
              <span>{item.title}</span>
                       </Link>
                    </Item>
                )
            }else{
               const cItem=item.children.find(item=>path.indexOf(item.key)===0)
                if(cItem){
                   this.OptionKey=item.key
                }
                pre.push(
                    <SubMenu
                    key={item.key}
                    icon={<MailOutlined/>} 
                 title={item.title}>
                     {
                         this.getMenuNodes2(item.children)
                     }
 
                    </SubMenu> 
                )
            }
            }
           
            return pre
        },[])
      }

    //   getMenuNodes=(menuList)=>{
    //       return menuList.map(item=>{
    //           if(!item.children){
    //                 return ( <Item key={item.key}
    //                  icon={<HomeFilled/>}
    //                 >
    //                    <Link to={item.key}>
    //           <span>{item.title}</span>
    //                    </Link>
    //                 </Item>     )
    //           }else{
    //                return  <SubMenu
    //                key={item.key}
    //                iicon={<MailOutlined />} 
    //             title={item.title}>
    //                 {
    //                     this.getMenuNodes(item.children)
    //                 }

    //                </SubMenu> 
    //           }
               
                    
    //       })
    //   }

    componentDidMount(){

    }
    componentWillMount(){
        this.menuNodes=this.getMenuNodes2(menuList)
    }
    render() {
        
        let selectKey=this.props.location.pathname
        if(selectKey.indexOf('/product')===0){
            selectKey='/product'
        }
        return (
            <div className='left-nav'>
                <Link className="left-nav-link" to='/home'>  
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                    
                </Link>
                <Menu
         selectedKeys={[selectKey]}
          defaultOpenKeys={[this.OptionKey]}
          mode="inline"
          theme="dark"
         
        >
           
            {
               this.menuNodes
            }
          
         
        </Menu>
            </div>
        )
    }
}
export default connect(
    state=>({
        user:state.user
    }),{
    setHeaderTitle
    }
)( withRouter(LeftNav))