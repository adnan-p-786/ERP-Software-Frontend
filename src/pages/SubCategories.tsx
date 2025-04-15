import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useQuery } from 'react-query';
import { getSubCategory } from '../apis/subCategory/subCategoryApi';
import { useCreateSubCategory } from '../apis/subCategory/subCategoryHooks';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { getCategory } from '../apis/category/categoryApi';

interface DataType {
  key: React.Key;
  name: string;
  Categories_Id: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Category Id',
    dataIndex: 'categoriesId',
    render: (category: any) => category?._id || 'N/A',
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



function SubCategories() {
  const { data: categorydata, isLoading: categoryloading } = useQuery('getcategory', getCategory)
  const { data, isLoading, error, refetch } = useQuery("getSubCategory", getSubCategory)
  const [addModal, setAddModal] = useState(false)
  const [updateStores, setUpdateStores] = useState(false)
  const [DeleteStores, setDeleteStores] = useState(false)
  const { mutate: Create } = useCreateSubCategory()

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
      <Divider>Sub Categories</Divider>
      <div className="w-full flex justify-end">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={data?.data}
        size="middle" />

      <Modal
        title="Add SubCategory"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'name'} label="Name" rules={[{ required: true, message: "please enter Name" }]}>
            <Input placeholder='name' />
          </Form.Item>
          <Form.Item
            name={'categoriesId'}
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Select a Category"
              options={
                !categoryloading && categorydata?.data.map((cat: { _id: string; name: string }) => ({
                  value: cat._id,
                  label: cat.name
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

export default SubCategories