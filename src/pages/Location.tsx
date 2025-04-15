import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useQuery } from 'react-query';
import { getLocation } from '../apis/location/locationApi';
import { useCreatelocation } from '../apis/location/locationHooks';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';

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
    title: 'WarehouseId',
    dataIndex: 'warehouseId',
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

  const {data,isLoading,error,refetch} = useQuery("getLocation",(getLocation))
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
      loading = {isLoading}
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
          <Form.Item name={'warehouseId'} label="Warehouse Id" rules={[{ required: true, message: "please enter WarehouseId" }]}>
            <Input placeholder='warehouseId' />
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