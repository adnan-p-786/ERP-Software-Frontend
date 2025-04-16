import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useQuery } from 'react-query';
import { getExpense } from '../apis/Expense/expenseApi';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useCreateExpense } from '../apis/Expense/expenseHooks';
import { getExpenseType } from '../apis/ExpenseType/expenseTypeApi';

interface DataType {
  key: React.Key;
  name: string;
  email: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'ExpenseType ID',
    dataIndex: 'expenseTypeId',
    render: (expenseType: any) => expenseType?._id || 'N/A',
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


function Expense() {
  const {data:ExpenseType , isLoading:ExpenseTypeLoading}=useQuery("getExpenseType",getExpenseType)
  const { data, isLoading, error, refetch } = useQuery("getExpense", getExpense)
  const [addModal, setAddModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const { mutate: Create } = useCreateExpense()
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
      <Divider>Expense</Divider>
      <div className="w-full flex justify-end">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table 
      columns={columns} 
      dataSource={data?.data} 
      loading={isLoading}
      size="middle" />
      <Modal
        title="Add Expense"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'date'} label="Date" rules={[{ required: true, message: "please enter Date" }]}>
            <Input placeholder='date' />
          </Form.Item>
          <Form.Item name={'amount'} label="Amount" rules={[{ required: true, message: "please enter Amount" }]}>
            <Input placeholder='amount' />
          </Form.Item>
          <Form.Item
            name={'expenseTypeId'}
            label="expenseType"
            rules={[{ required: true, message: "Please select a ExpenseType" }]}
          >
            <Select
              placeholder="Select a ExpenseType"
              options={
                !ExpenseTypeLoading && ExpenseType?.data?.map((expType: { _id: string; name: string }) => ({
                  value: expType._id,
                  label: expType.name
                }))
              }
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='w-full '>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Expense