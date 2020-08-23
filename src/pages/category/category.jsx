import React, { Component } from 'react';
import { Card,Button,Table, message ,Modal} from 'antd';
import {
        PlusOutlined
   } from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import {reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api'
import AddUpdateForm from './add-update-form'   
  
  
class Category extends Component {
    state={
        categorys:[],
        loading:false,
        showStatus:0,

    }

    initColumns=()=>{
        this.columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
 
    },
    {
      title: '操作',
      width:300,
        render:(category)=><LinkButton onClick={()=>{
            this.category=category
            this.setState({showStatus:2})}}>修改分类</LinkButton>
    },
    
  ];
    }

    getCategorys=async()=>{
        this.setState({loading:true})
       const result=await reqCategorys()
       this.setState({loading:false})
       if(result.status===0){
           const categorys=result.data
            this.setState({categorys})
       }else{
           message.error('获取分类列表失败！')
       }
    }

    handleOk= ()=>{
        this.form.validateFields()
        .then(async values=>{
            const {categoryName}=values
            const {showStatus}=this.state
            let result
            if(showStatus===1){
                  result=await reqAddCategory(categoryName)
            }else{
                const categoryId=this.category._id
                 result=await reqUpdateCategory({categoryId,categoryName})
            }
           
     this.setState({showStatus:0})
      const action=showStatus===1?'添加':'修改'
      if(result.status===0){
          this.getCategorys()
          message.success(action+'分类成功')
      }else{
          message.error(action+"分类失败")
      }
        })
        .catch(values=>{
            message.error("请求失败")
        })
       
     
      
    }

    handleCancel=()=>{
        this.setState({showStatus:0})
    }

    componentWillMount(){
        this.initColumns()
        
    }
    componentDidMount(){
        this.getCategorys()
    }

    render() {
        const {categorys,loading,showStatus}=this.state

        const category= this.category||{}
        const extra=(
            <Button type='primary' onClick={()=>{ this.category={}
            this.setState({showStatus:1})}}>
                <PlusOutlined></PlusOutlined>
                添加
            </Button>
        )
        return (
            <Card  extra={extra}>
                <Table
                  bordered={true}
                  rowKey='_id'
                columns={this.columns}
                dataSource={categorys}
                pagination={{defaultPageSize:6,showQuickJumper:true}}
                loading={loading}
                />
              <Modal
          title={showStatus===1?"添加分类":"修改分类"}
          visible={showStatus!==0}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
            <AddUpdateForm setForm={form=>this.form=form} categoryName={category.name}/>
         
        </Modal>
                
            </Card>
        );
    }
}

export default Category;