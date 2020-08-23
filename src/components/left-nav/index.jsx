import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu } from 'antd';
import {
   HomeFilled,MailOutlined
  } from '@ant-design/icons';
  
import menuList from '../../config/menuConfig'
import logo from './logo.png'
import  './index.css'
const { SubMenu } = Menu;
const Item=Menu.Item

 class LeftNav extends Component {
   
        
      getMenuNodes2=(menuList)=>{

        const path=this.props.location.pathname
        return menuList.reduce((pre,item)=>{
            if(!item.children){
                pre.push(
                    <Item key={item.key}
                     icon={<HomeFilled/>}
                    >
                       <Link to={item.key}>
              <span>{item.title}</span>
                       </Link>
                    </Item>
                )
            }else{
               const cItem=item.children.find(item=>item.key===path)
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
        
        const selectKey=this.props.location.pathname
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
export default withRouter(LeftNav)