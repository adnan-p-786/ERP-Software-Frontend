import React from 'react';
import { Divider, message, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useQuery } from 'react-query';
import { getSubCategory } from '../apis/subCategory/subCategoryApi';

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
    title: 'Categories_Id',
    dataIndex: 'categoriesId',
  }
];



function SubCategories() {
  const {data,isLoading,error} = useQuery("getSubCategory",getSubCategory)
  if(error){
    return message.error("data fetching error")
  }

  return (
    <div>
      <Divider>Sub Categories</Divider>
      <Table 
      columns={columns}
      loading={isLoading}
       dataSource={data?.data} 
    size="middle" />
    </div>
  )
}

export default SubCategories