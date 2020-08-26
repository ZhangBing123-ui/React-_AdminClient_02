import React, { Component } from 'react'
import {
    Card,Form,Input,Select,Button, message
} from 'antd'
import LinkButton from '../../components/link-button'
import { ArrowLeftOutlined } from '@ant-design/icons';
import memoryUtils from "../../utils/memoryUtils";
import {reqCategorys,reqAddUpdateProduct} from '../../api'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-texty-editor'
const Item=Form.Item
const Option=Select.Option

export default class ProductDetail extends Component {
    constructor(props){
        super(props)
        this.pwRef=React.createRef()
        this.editorRef=React.createRef()
    }

    state={
       categorys:[]
    }

    getCategorys= async()=>{
        const result=await reqCategorys()
        if(result.status===0){
            const categorys=result.data
            this.setState({categorys})
        }
    }
    validatePrice=(rule,value)=>{
        if(value===''){
            return Promise.reject()
        }else if(value*1<=0){
            return Promise.reject('价格必须大于0')
        }else {
            return Promise.resolve()
        }
    }

    handleSubmit= async()=>{
        
        const  {name,desc,price,categoryId}= this.form.getFieldValue()
       const imgs=this.pwRef.current.getImgs()
       const detail=this.editorRef.current.getDetail()
        const product={name,desc,price,categoryId,imgs,detail}
        if(this.isUpdate){
            product._id=this.product._id
        }
        const result=await reqAddUpdateProduct(product)
        if(result.status===0){
            message.success(`${this.isUpdate?'修改':'添加'}商品成功`)
            this.props.history.replace('/product')
        }
      
     
    }
    componentDidMount(){
        
            this.getCategorys()
        
    }
    componentWillMount(){
        this.product=memoryUtils.product
        this.isUpdate=!!this.product._id
    }
    render() {
        const {categorys}=this.state
      const {product,isUpdate}=this
        
       
        const title=(
            <span>
                <LinkButton onClick={()=>this.props.history.goBack()}>
                <ArrowLeftOutlined></ArrowLeftOutlined>
                </LinkButton>
                <span>{isUpdate?"修改商品": "添加商品"}</span>
            </span>
        )
        return (
            <Card title={title}>
               <Form
               onSubmitCapture={this.handleSubmit}
               labelCol={{span:3}}
               wrapperCol={{span:8}}
               ref={(ref=>this.form=ref)}>
                   <Item
                   label='商品名称'
                   name='name'
                   initialValue={product.name||''}
                   rules={[{required:true,message:'必须输入商品名称'}]}
                   >
                       <Input placeholder='商品名称'/>
                   </Item>
                   <Item
                   label='商品描述'
                   name='desc'
                   initialValue={product.desc}
                   rules={[{required:true,message:'必须输入商品描述'}]}
                   >
                       <Input placeholder='商品描述'/>
                   </Item>
                   <Item
                   label='商品价格'
                   name='price'
                   initialValue={product.price}
                   rules={[{validator:this.validatePrice},{required:true,message:'必须输入商品价格'}]}
                   >
                       <Input type='number' placeholder='商品价格' addonAfter='元'/>
                   </Item>
                   <Item
                   label='商品分类'
                   name='categoryId'
                   initialValue={product.categoryId ||''}
                   rules={[{required:true,message:'必须输入商品分类'}]}
                   >
                       <Select>
                           <Option value=''>未选择</Option>
                           {
                               categorys.map(c=><Option value={c._id} key={c._id}>{c.name}</Option>)
                           }
                       </Select>
                   </Item>

                   <Item
                   label='商品图片'
                   >
                       <PicturesWall ref={this.pwRef} imgs={product.imgs}></PicturesWall>
                   </Item>
                    
                   <Item
                   label='商品详情'
                   wrapperCol={{span:15}}>
                       <RichTextEditor detail={product.detail} ref={this.editorRef}></RichTextEditor>
                     
                   </Item>
                   <Item>
                   
                     <Button type='primary' htmlType='submit'>提交</Button>
                   </Item>
               </Form>

            </Card>
        )
    }
}
