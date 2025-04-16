import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { getExpenseType } from '../apis/ExpenseType/expenseTypeApi';
import { useQuery } from 'react-query';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useCreateExpenseType } from '../apis/ExpenseType/expenseTypeHooks';

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


function ExpenseType() {
  const { data, isLoading, error, refetch } = useQuery("getExpenseType", getExpenseType)
  const [addModal, setAddModal] = useState(false)
  // const [updateVendors, setUpdateVendors] = useState(false)
  // const [DeleteVendors, setDeleteVendors] = useState(false)
  const { mutate: Create } = useCreateExpenseType()

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
    <Divider>Expense Type</Divider>
    <div className="w-full flex justify-end">
      <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
    </div>
    <Table columns={columns} 
    dataSource={data?.data} 
    loading={isLoading}
    size="middle" />

<Modal
        title="Add ExpenseType"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'name'} label="Name" rules={[{ required: true, message: "please enter ExpType" }]}>
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

export default ExpenseType