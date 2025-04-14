import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useQuery } from 'react-query';
import { getVendors } from '../apis/vendorss/vendorApi';
import { useCreateVendors } from '../apis/vendorss/vendorHooks';

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
    title: 'VatNo',
    dataIndex: 'vatNo',
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

function Vendor() {
  const { data, isLoading, error, refetch } = useQuery("getVendors", getVendors)
  const [addModal, setAddModal] = useState(false)
  const [updateVendors, setUpdateVendors] = useState(false)
  const [DeleteVendors, setDeleteVendors] = useState(false)
  const { mutate: Create } = useCreateVendors()

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
      <Divider>Vendors</Divider>
      <div className="w-full flex justify-end">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table columns={columns} 
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
          <Form.Item name={'vatNo'} label="VatNo" rules={[{ required: true, message: "please enter VatNo" }]}>
            <Input placeholder='vatNo' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='w-full '>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Vendor