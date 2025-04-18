import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { useQuery } from 'react-query';
import { getDiscount } from '../apis/discount/discountApi';
import { useCreateDiscount } from '../apis/discount/discountHooks';

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
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Value',
    dataIndex: 'value',
  },
  {
    title: "Action",
    render : (_,record)=> (
      <div className="flex gap-2">
        <Button><CiEdit /> Edit</Button>
        <Button><MdDeleteOutline /> Delete</Button>
      </div>
    )
  }
];


function Discounts() {
  const {data,isLoading,error,refetch} = useQuery("getDiscount",getDiscount)
  const [addModal, setAddModal] = useState(false)
  const {mutate:Create} = useCreateDiscount()

  const [form] = Form.useForm()
  if (error) {
    return message.error("data fetching error")
  }


  const onFinish = (value: any) => {
    Create(value, {
      onSuccess() {
        message.success("added successfully")
        refetch()
        setAddModal(false)
        form.resetFields()
      },
      onError() {
        message.error("faild")
      }
    })
  }
  ;
  return (
    <div>
      <Divider>Discount</Divider>
      <div className="w-full flex justify-end">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table 
      columns={columns} 
      dataSource={data?.data} 
      loading={isLoading}
      size="middle" />

      <Modal
        title="Add Discount"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'name'} label="Name" rules={[{ required: true, message: "please enter Name" }]}>
            <Input placeholder='name' />
          </Form.Item>
          <Form.Item name={'type'} label="Type" rules={[{ required: true, message: "please enter Type" }]}>
            <Input placeholder='type' />
          </Form.Item>
          <Form.Item name={'value'} label="Value" rules={[{ required: true, message: "please enter Value" }]}>
            <Input placeholder='value' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='w-full '>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Discounts