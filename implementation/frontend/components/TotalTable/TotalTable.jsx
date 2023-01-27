import { Divider, Table, Tooltip } from 'antd';
import { useEffect } from 'react';
import { RoundedCurrency, SkeletonTable } from '../Utils';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useCMK } from '../../hooks';
import stores from '../../stores';

const TotalTable = () => {
  const { total: data, setTotal: setData } = stores.useSpreadsheetData();

  const columns = [
    {
      title: () => (
        <span>
          Total requests{' '}
          <Tooltip title='The numbers in this table might not be accurate, since some requests can be dropped by the spreadsheet during the API calls.'>
            <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
          </Tooltip>
        </span>
      ),
      dataIndex: 'totalRequests',
      key: 'totalRequests',
    },
    {
      title: 'Total cost',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (totalCost) => <CostCell value={totalCost} currency='LINK' />,
    },
    {
      title: 'Average cost per request',
      dataIndex: 'averageCost',
      key: 'averageCost',
      render: (averageCost) => <CostCell value={averageCost} currency='LINK' />,
    },
  ];

  useEffect(() => {
    setData();
  }, []);

  if (!data) return <SkeletonTable columns={columns} rows={1} />;

  return (
    <div className='total-table'>
      <Table
        columns={columns}
        dataSource={data ? [data] : []}
        rowKey='totalRequests'
        pagination={false}
      />
    </div>
  );
};

const CostCell = ({ value, currency }) => {
  const { priceInDollar } = useCMK(currency);
  return (
    <span>
      <RoundedCurrency value={value} currency={currency} />{' '}
      {priceInDollar && (
        <span style={{ fontSize: '1rem' }}>
          <Divider type='vertical' />
          <span style={{ color: 'var(--color-blue)' }}>
            <RoundedCurrency
              value={Number(value) * Number(priceInDollar)}
              currency='$'
            />
          </span>
        </span>
      )}
    </span>
  );
};

export default TotalTable;
