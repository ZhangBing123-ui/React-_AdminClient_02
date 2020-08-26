import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
} from 'antd'

/*
用来添加角色的form组件
 */
class AddForm extends PureComponent {

  static propTypes = {
    setForm: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.props.setForm(this.form)
    
  }


  render() {
  
    
    

    return (
      <Form
       ref={(ref)=>{
            this.form=ref
          }}
      >
        <Form.Item label="角色名称"
        name='roleName'
         initialValue= ''
          rules={
               [
                {required: true, message: '必须输入角色名称'}
              ]
          }
         
        >
         
             
             
            
              <Input type="text" placeholder="请输入角色名称" />
            
          
        </Form.Item>
      </Form>
    )
  }
}

export default AddForm