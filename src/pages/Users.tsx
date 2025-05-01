import { Divider, Table, TableColumnsType } from "antd";
import { getUser } from "../apis/users/userApi";
import { useQuery } from "react-query";


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
    title: 'Email',
    dataIndex: 'email',
  }
];

function Users() {
  const { data, isLoading,} = useQuery("getUser", getUser)

  return (
    <div>
      <Divider>User</Divider>
      <Table 
      columns={columns} 
      dataSource={data?.data} 
      loading={isLoading}
      size="middle" />
    </div>
  )
}

export default Users