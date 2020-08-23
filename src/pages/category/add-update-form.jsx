import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'
const Item=Form.Item
export default class AddUpdateForm extends Component {
    static propTypes={
        setForm:PropTypes.func.isRequired,
        categoryName:PropTypes.string
    }
    componentDidMount(){
             this.props.setForm(this.form)
        }
    componentDidUpdate() {
            this.form.setFieldsValue({
                categoryName: this.props.categoryName,
            });
        }
    render() {

        const {categoryName}=this.props
       
        return (
            <Form
            ref={(ref)=>this.form=ref}
            >
                <Item
                name='categoryName'
                initialValue={categoryName||''}
                rules={[{required:true,message:'分类名称必须输入'}]}
                >
                    <Input placeholder='请输入分类名称'>
                    
                    </Input>
                </Item>

            </Form>
        )
    }
}
