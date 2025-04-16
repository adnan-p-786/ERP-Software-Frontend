import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useQuery } from 'react-query';
import { getVendors } from '../apis/vendorss/vendorApi';
import { getVendorsAccount } from '../apis/vendorsAccount/vendorAccountApi';
import { useCreateVendorsAccount } from '../apis/vendorsAccount/vendorAccountHooks';

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
    title: 'vendor Id',
    dataIndex: 'vendorsId',
    render: (vendors: any) => vendors?._id || 'N/A',
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

function VendorAccount() {
  const {data:vendorsdata,isLoading:vendorsloading} = useQuery('getVendors',getVendors)
  const {data,isLoading,error,refetch} = useQuery("getVendorsaccounts",getVendorsAccount,)
  const [addModal, setAddModal] = useState(false)
  const [updateVendorsAccount, setUpdateVendorsAccount] = useState(false)
  const [DeleteVendorsAccount, setDeleteVendorsAccount] = useState(false)
  const { mutate: Create } = useCreateVendorsAccount()

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
      <Divider>Vendors Account</Divider>
       <div className="w-full flex justify-end">
          <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
        </div>
      <Table columns={columns} 
      dataSource={data?.data} 
      loading={isLoading}
      size="middle" />

<Modal
        title="Add Vendor Accounts"
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
            name={'vendorsId'}
            label="Vendors"
            rules={[{ required: true, message: "Please select a Vendor" }]}
          >
            <Select
              placeholder="Select a Vendor"
              options={
                !vendorsloading && vendorsdata?.data.map((vendor: { _id: string; name: string }) => ({
                  value: vendor._id,
                  label: vendor.name
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

export default VendorAccount