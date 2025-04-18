import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useQuery } from 'react-query';
import { getProduct } from '../apis/products/productApi';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useCreateProduct } from '../apis/products/productHooks';
import { getCategory } from '../apis/category/categoryApi';
import { getSubCategory } from '../apis/subCategory/subCategoryApi';
import { getBrand } from '../apis/brand/brandApi';
import { getUnits } from '../apis/units/unitsApi';
import { getRacks } from '../apis/racks/racksApi';

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
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Categories ID',
    dataIndex: 'categoriesId',
    render: (category: any) => category?._id || 'N/A',
  },
  {
    title: 'SubCategories ID',
    dataIndex: 'subCategoriesId',
    render: (subcategory: any) => subcategory?._id || 'N/A',
  },
  {
    title: 'Brand ID',
    dataIndex: 'brandId',
    render: (brand: any) => brand?._id || 'N/A',
  },
  {
    title: 'Units ID',
    dataIndex: 'unitsId',
    render: (unit: any) => unit?._id || 'N/A',
  },
  {
    title: 'Racks ID',
    dataIndex: 'racksId',
    render: (rack: any) => rack?._id || 'N/A',
  },
  {
    title: 'Quantity Alert',
    dataIndex: 'quantityAlert',
  },
  {
    title: 'VAT',
    dataIndex: 'vat',
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


function Products() {
    const { data: categorydata, isLoading: categoryloading } = useQuery('getcategory', getCategory)
    const { data: SubCategoriesdata, isLoading: SubCategoriesloading } = useQuery('getSubcategory', getSubCategory)
    const { data: branddata, isLoading: brandloading } = useQuery('getBrand', getBrand)
    const { data: unitsdata, isLoading: unitsloading } = useQuery('getUnits', getUnits)
    const { data: racksdata, isLoading: racksloading } = useQuery('getRacks',getRacks)
    const { data, isLoading, error, refetch } = useQuery("getProduct",getProduct)
    const [addModal, setAddModal] = useState(false)
    const { mutate: Create } = useCreateProduct()
  
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
      <Divider>Products</Divider>
      <div className="w-full flex justify-end">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table 
      columns={columns} 
      dataSource={data?.data} 
      loading={isLoading}
      size="middle" />

<Modal
        title="Add products"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'name'} label="Name" rules={[{ required: true, message: "please enter Name" }]}>
            <Input placeholder='name' />
          </Form.Item>
          <Form.Item name={'description'} label="Description" rules={[{ required: true, message: "please enter Description" }]}>
            <Input placeholder='description' />
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
          <Form.Item
            name={'subCategoriesId'}
            label="Sub Category"
            rules={[{ required: true, message: "Please select a Subcategory" }]}
          >
            <Select
              placeholder="Select a Sub Category"
              options={
                !SubCategoriesloading && SubCategoriesdata?.data.map((subcat: { _id: string; name: string }) => ({
                  value: subcat._id,
                  label: subcat.name
                }))
              }
            />
          </Form.Item>
          <Form.Item
            name={'brandId'}
            label="Brand ID"
            rules={[{ required: true, message: "Please select a Brand Id" }]}
          >
            <Select
              placeholder="Select a Brand Id"
              options={
                !brandloading && branddata?.data.map((brand: { _id: string; name: string }) => ({
                  value: brand._id,
                  label: brand.name
                }))
              }
            />
          </Form.Item>
          <Form.Item
            name={'unitsId'}
            label="Units ID"
            rules={[{ required: true, message: "Please select a  Units Id" }]}
          >
            <Select
              placeholder="Select a Units Id"
              options={
                ! unitsloading&& unitsdata?.data.map((unit: { _id: string; name: string }) => ({
                  value: unit._id,
                  label: unit.name
                }))
              }
            />
          </Form.Item>
          <Form.Item
            name={'racksId'}
            label="Racks ID"
            rules={[{ required: true, message: "Please select a Racks Id" }]}
          >
            <Select
              placeholder="Select a Racks Id"
              options={
                ! racksloading&& racksdata?.data.map((racks: { _id: string; name: string }) => ({
                  value: racks._id,
                  label: racks.name
                }))
              }
            />
          </Form.Item>
          <Form.Item name={'quantityAlert'} label="Quantity Alert" rules={[{ required: true, message: "please enter VAT" }]}>
            <Input placeholder='quantityAlert' />
          </Form.Item>
          <Form.Item name={'vat'} label="VAT" rules={[{ required: true, message: "please enter VAT" }]}>
            <Input placeholder='vat' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='w-full '>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Products