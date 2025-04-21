import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { useQuery } from 'react-query';
import { getRacks } from '../apis/racks/racksApi';
import { useCreateRacks } from '../apis/racks/racksHooks';

interface DataType {
  key: React.Key;
  name: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'id',
    dataIndex: '_id',
  },
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



function Racks() {
  const {data,isLoading,error,refetch} = useQuery("getRacks",getRacks)
  const [addModal,setAddModal] = useState(false)
  const [updateRacks,setUpdateRacks] = useState(false)
  const [DeleteRacks,setDeleteRacks] = useState(false)
  const {mutate:Create} = useCreateRacks()


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
      <Divider>Racks</Divider>
      <div className="w-full flex justify-end">
         <Button type='primary' onClick={()=>setAddModal(true)}>Add</Button>
      </div>
      <Table
        columns={columns}
         dataSource={data?.data}
         loading={isLoading}
        size="middle" />

<Modal
        title="Add Racks"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'name'} label="Category Name" rules={[{ required: true, message: "please enter category name" }]}>
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

export default Racks