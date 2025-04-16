import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useQuery } from 'react-query';
import { getLocation } from '../apis/location/locationApi';
import { useCreatelocation } from '../apis/location/locationHooks';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { getWarehouse } from '../apis/warehouse/warehouseApi';

interface DataType {
  key: React.Key;
  name: string;
  email: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Country',
    dataIndex: 'country',
  },
  {
    title: 'State',
    dataIndex: 'state',
  },
  {
    title: 'City',
    dataIndex: 'city',
  },
  {
    title: 'Zipcode',
    dataIndex: 'zipcode',
  },
  {
    title: 'Warehouse ID',
    dataIndex: 'warehouseId',
    render: (warehouse: any) => warehouse?._id || 'N/A',
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



function Location() {
  const { data: warehouseData, isLoading:warehouseloading } = useQuery("getwarehouse", getWarehouse)
  const { data, isLoading, error, refetch } = useQuery("getLocation", (getLocation))
  const [addModal, setAddModal] = useState(false)
  const [updateLocation, setUpdateLocation] = useState(false)
  const [DeleteLocation, setDeleteLocation] = useState(false)
  const { mutate: Create } = useCreatelocation()


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
      <Divider>Location</Divider>
      <div className="w-full flex justify-end">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data?.data}
        loading={isLoading}
        size="middle" />

      <Modal
        title="Add Location"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'address'} label="Address" rules={[{ required: true, message: "please enter Address" }]}>
            <Input placeholder='address' />
          </Form.Item>
          <Form.Item name={'country'} label="Country" rules={[{ required: true, message: "please enter Country" }]}>
            <Input placeholder='country' />
          </Form.Item>
          <Form.Item name={'state'} label=" State" rules={[{ required: true, message: "please enter State" }]}>
            <Input placeholder='state' />
          </Form.Item>
          <Form.Item name={'city'} label="City" rules={[{ required: true, message: "please enter City" }]}>
            <Input placeholder='city' />
          </Form.Item>
          <Form.Item name={'zipcode'} label="Zipcode" rules={[{ required: true, message: "please enter Zipcode" }]}>
            <Input placeholder='zipcode' />
          </Form.Item>
          <Form.Item
            name={'expenseTypeId'}
            label="expenseType"
            rules={[{ required: true, message: "Please select a ExpenseType" }]}
          >
            <Select
              placeholder="Select a ExpenseType"
              options={
                !warehouseloading && warehouseData?.data?.map((wh: { _id: string; name: string }) => ({
                  value: wh._id,
                  label: wh.name
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

export default Location