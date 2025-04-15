import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Switch, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useQuery } from 'react-query';
import { getstores } from '../apis/storess/storesApi';
import { useCreateStores } from '../apis/storess/storesHooks';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';

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
    title: 'Username',
    dataIndex: 'username',
  },
  {
    title: 'Password',
    dataIndex: 'password',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Active',
    dataIndex: 'active',
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



function Stores() {
  const {data,isLoading,refetch,error}=useQuery("getStores",getstores)
  const [addModal, setAddModal] = useState(false)
  const [updateStores, setUpdateStores] = useState(false)
  const [DeleteStores, setDeleteStores] = useState(false)
  const { mutate: Create } = useCreateStores()

  const [form] = Form.useForm()
  if (error) {
    return message.error("data fetching error")
  }


  const onFinish = (value: any) => {
    Create(value, {
      onSuccess() {
        message.success("add successfully")
        refetch()
        setAddModal(false)
        form.resetFields()
      },
      onError() {
        message.error("faild")
      }
    })
  }
  return (
    <div>
      <Divider>Stores</Divider>
      <div className="w-full flex justify-end">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table 
      columns={columns} 
      dataSource={data?.data} 
      loading = {isLoading}
      size="middle" />

  <Modal
        title="Add Stores"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'name'} label="Name" rules={[{ required: true, message: "please enter Name" }]}>
            <Input placeholder='name' />
          </Form.Item>
          <Form.Item name={'username'} label="Username" rules={[{ required: true, message: "please enter Username" }]}>
            <Input placeholder='username' />
          </Form.Item>
          <Form.Item name={'password'} label="Password" rules={[{ required: true, message: "please enter Password" }]}>
            <Input placeholder='password' />
          </Form.Item>
          <Form.Item name={'phone'} label="Phone" rules={[{ required: true, message: "please enter Phone" }]}>
            <Input placeholder='Phone' />
          </Form.Item>
          <Form.Item name={'email'} label=" email" rules={[{ required: true, message: "please enter Email" }]}>
            <Input placeholder='email' />
          </Form.Item>
          <Form.Item
  name="active"
  label="Active"
  valuePropName="checked"
  rules={[{ required: true, message: "Please indicate if active" }]}
>
  <Switch />
</Form.Item>

          <Form.Item>
            <Button htmlType='submit' className='w-full '>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Stores