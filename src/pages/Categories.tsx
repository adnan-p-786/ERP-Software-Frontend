import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useQuery } from 'react-query';
import { getCategory } from '../apis/category/categoryApi';
import { useCreateCategory } from '../apis/category/CategoryHooks';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

interface DataType {
  key: React.Key;
  name: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'id',
    dataIndex: '_id',
  },
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


function Categories() {
  const { data, isLoading, error, refetch } = useQuery("getCategoryies", getCategory)
  const [addModal, setAddModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const { mutate: Create } = useCreateCategory()
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
    <>
      <div>
        <Divider>Categories</Divider>
        <div className="w-full flex justify-end">
          <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
        </div>
        <Table
          columns={columns}
          style={{ height: '350px', overflowY: 'auto' }} 
          pagination={false} 
          dataSource={data?.data}
          loading={isLoading}
          size="middle" />
      </div>

      <Modal
        title="Add Category"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'name'} label="Category Name" rules={[{ required: true, message: "please enter category name" }]}>
            <Input placeholder='name' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='w-full '>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>

  )
}

export default Categories