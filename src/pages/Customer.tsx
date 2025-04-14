import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useQuery } from 'react-query';

import { useCreateCustomers } from '../apis/customer/customerHooks';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { getCustomers } from '../apis/customer/customerApi';

interface DataType {
  key: React.Key;
  name: string;
  email: string;
  phone: Number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'Address',
    dataIndex: 'address',
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



function Customer() {
  const { data, isLoading, error, refetch } = useQuery("getCustomers", getCustomers)
  const [addModal, setAddModal] = useState(false)
  const [updateCustomer, setUpdateCustomer] = useState(false)
  const [DeleteCustomer, setDeleteCustomer] = useState(false)
  const { mutate: Create } = useCreateCustomers()

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
      <Divider>Customers</Divider>
      <div className="w-full flex justify-end">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data?.data}
        loading={isLoading}
        size="middle" />

      <Modal
        title="Add Customers"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'name'} label="Name" rules={[{ required: true, message: "please enter Name" }]}>
            <Input placeholder='name' />
          </Form.Item>
          <Form.Item name={'email'} label=" email" rules={[{ required: true, message: "please enter Email" }]}>
            <Input placeholder='email' />
          </Form.Item>
          <Form.Item name={'phone'} label="Phone" rules={[{ required: true, message: "please enter Phone" }]}>
            <Input placeholder='Phone' />
          </Form.Item>
          <Form.Item name={'address'} label="Address" rules={[{ required: true, message: "please enter Address" }]}>
            <Input placeholder='address' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='w-full '>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Customer