import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useQuery } from 'react-query';
import { getCustomerAccounts } from '../apis/customerAccount/customerAccountApi';
import { useCreateCustomerAccounts } from '../apis/customerAccount/customerAccountHooks';
import { getCustomers } from '../apis/customer/customerApi';

interface DataType {
  key: React.Key;
  name: string;
  email: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Debit',
    dataIndex: 'debit',
  },
  {
    title: 'Credit',
    dataIndex: 'credit',
  },
  {
    title: 'Customer Id',
    dataIndex: 'customerId',
    render: (customer: any) => customer?._id || 'N/A',
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


function CustomerAccount() {
  const {data:customerdata,isLoading:customerloading} = useQuery('getCustomer',getCustomers)
  const {data,isLoading,error,refetch} = useQuery("getCustomeraccounts",getCustomerAccounts,)
  const [addModal, setAddModal] = useState(false)
  const [updateCustomerAccount, setUpdateCustomerAccount] = useState(false)
  const [DeleteCustomerAccount, setDeleteCustomerAccount] = useState(false)
  const { mutate: Create } = useCreateCustomerAccounts()

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

  return (
    <div>
      <Divider>Customer Accounts</Divider>
       <div className="w-full flex justify-end">
          <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
        </div>
      <Table
       columns={columns} 
       dataSource={data?.data} 
       loading={isLoading}
       size="middle" />

<Modal
        title="Add Customer Accounts"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'type'} label="Type" rules={[{ required: true, message: "please enter Type" }]}>
            <Input placeholder='type' />
          </Form.Item>
          <Form.Item name={'debit'} label="Debit" rules={[{ required: true, message: "please enter Debit" }]}>
            <Input placeholder='debit' />
          </Form.Item>
          <Form.Item name={'credit'} label="Credit" rules={[{ required: true, message: "please enter Credit" }]}>
            <Input placeholder='credit' />
          </Form.Item>
          <Form.Item
            name={'customerId'}
            label="Customer"
            rules={[{ required: true, message: "Please select a Customer" }]}
          >
            <Select
              placeholder="Select a customer"
              options={
                !customerloading && customerdata?.data.map((cus: { _id: string; name: string }) => ({
                  value: cus._id,
                  label: cus.name
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

export default CustomerAccount