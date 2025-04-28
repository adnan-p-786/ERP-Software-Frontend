import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { getVariant } from '../apis/variant/variantApi';
import { useQuery } from 'react-query';
import { useCreateVariant } from '../apis/variant/variantHooks';

interface DataType {
  key: React.Key;
  name: string;
  email: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: "Action",
    render: (record) => (
      <div className="flex gap-2">
        <Button><CiEdit /> Edit</Button>
        <Button><MdDeleteOutline /> Delete</Button>
      </div>
    )
  }
];

function Variant() {
const {data,isLoading,error,refetch} = useQuery("getVariant",getVariant)
  const [addModal,setAddModal] = useState(false)
  const {mutate:Create} = useCreateVariant()


  const [form] = Form.useForm()
if(error){
  return message.error("data fetching error")
}


const onFinish = (value:any)=>{
  Create(value,{
   onSuccess(){
       message.success("add successfully")
       refetch()
       setAddModal(false)
       form.resetFields()
   },
   onError(){
       message.error("faild")
   }
  })
}

  return (
    <div>
      <Divider>Variant</Divider>
      <div className="w-full flex justify-end">
         <Button type='primary' onClick={()=>setAddModal(true)}>Add</Button>
      </div>
      <Table
      columns={columns} 
      dataSource={data?.data} 
      loading={isLoading}
      size="middle" />

<Modal
        title="Add Variant"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'name'} label="Name" rules={[{ required: true, message: "please enter variable name" }]}>
            <Input placeholder='name' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='w-full '>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Variant