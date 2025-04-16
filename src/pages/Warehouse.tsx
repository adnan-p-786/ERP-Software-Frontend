import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useQuery } from 'react-query';
import { getWarehouse } from '../apis/warehouse/warehouseApi';
import { useCreateWarehouse } from '../apis/warehouse/warehouseHooks';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { getstores } from '../apis/storess/storesApi';
import { getLocation } from '../apis/location/locationApi';

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
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Stores ID',
    dataIndex: 'storeId',
    render: (stores: any) => stores?._id || 'N/A',
  },
  {
    title: 'Location ID',
    dataIndex: 'locationId',
    render: (location: any) => location?._id || 'N/A',
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

function Warehouse() {
  const { data: storedata, isLoading: storeloading } = useQuery('getStoreId', getstores)
  const { data: locationdata, isLoading: locationloading } = useQuery('getlocationId', getLocation)
  const { data, isLoading, error, refetch } = useQuery("getWarehouse", getWarehouse)
  const [addModal, setAddModal] = useState(false)
  const [updateLocation, setUpdateLocation] = useState(false)
  const [DeleteLocation, setDeleteLocation] = useState(false)
  const { mutate: Create } = useCreateWarehouse()


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
      <Divider>Warehouse</Divider>
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
          <Form.Item name={'name'} label="Name" rules={[{ required: true, message: "please enter Name" }]}>
            <Input placeholder='name' />
          </Form.Item>
          <Form.Item name={'phone'} label="Phone" rules={[{ required: true, message: "please enter Phone" }]}>
            <Input placeholder='Phone' />
          </Form.Item>
          <Form.Item name={'email'} label=" Email" rules={[{ required: true, message: "please enter Email" }]}>
            <Input placeholder='email' />
          </Form.Item>
          <Form.Item
            name={'storeId'}
            label="storeId"
            rules={[{ required: true, message: "Please select a Stores" }]}
          >
            <Select
              placeholder="Select a Store"
              options={
                !storeloading && storedata?.data?.map((stores: { _id: string; name: string }) => ({
                  value: stores._id,
                  label: stores.name
                }))
              }
            />
          </Form.Item>
          <Form.Item
            name={'locationId'}
            label="locationId"
            rules={[{ required: true, message: "Please select Location" }]}
          >
            <Select
              placeholder="Select a Location"
              options={
                !locationloading && locationdata?.data?.map((location: { _id: string; name: string }) => ({
                  value: location._id,
                  label: location.name
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

export default Warehouse