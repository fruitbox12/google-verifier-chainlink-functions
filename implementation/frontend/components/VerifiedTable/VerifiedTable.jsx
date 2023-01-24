import { Table } from 'antd';
import { useEffect } from 'react';
import { Address, ElapsedTime, TwitterUsername } from '../Utils';
import { useSearch } from '../../hooks';
import stores from '../../stores';

const VerifiedTable = () => {
  const { data, loaded, setData } = stores.useData();
  const { getColumnSearchProps } = useSearch();

  const columns = [
    {
      title: 'Date',
      dataIndex: 'timestamp',
      key: 'date',
      render: (timestamp) => <ElapsedTime timestamp={timestamp} />,
      sorter: (a, b) => a.timestamp - b.timestamp,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Ethereum address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      render: (address) => <Address address={address} />,
    },
    {
      title: 'Twitter username',
      dataIndex: 'username',
      key: 'username',
      ...getColumnSearchProps('username'),
      render: (username) => <TwitterUsername username={username} />,
    },
    {
      title: 'Verification',
      dataIndex: 'result',
      key: 'result',
      render: (result) => {
        if (Number(result) === -1) {
          return <span className='status error'>Error</span>;
        } else if (Number(result) === 0) {
          return <span className='status failed'>Failed</span>;
        } else if (Number(result) === 1) {
          return <span className='status success'>Success</span>;
        }
      },
      filters: [
        { text: 'Error', value: -1 },
        { text: 'Failed', value: 0 },
        { text: 'Success', value: 1 },
      ],
      onFilter: (value, record) => Number(record.result) === value,
    },
  ];

  useEffect(() => {
    setData();
  }, []);

  if (!loaded || !data) {
    return 'loading';
  }

  return (
    <div className='verified-table'>
      <span>
        For testing purpose, you can verify an account multiple times, which
        will create multiple entries in the table.
      </span>
      <Table
        columns={columns}
        dataSource={data.map((entry) => entry.data)}
        rowKey={(entry) => entry.timestamp}
      />
    </div>
  );
};

export default VerifiedTable;
