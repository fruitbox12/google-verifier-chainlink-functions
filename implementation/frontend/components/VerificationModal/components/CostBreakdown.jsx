import { Divider, Table } from 'antd';
import { useState } from 'react';
import { useCMK } from '../../../hooks';
import { RoundedCurrency } from '../../Utils';

const columns = [
  {
    title: 'Transmission cost',
    dataIndex: 'transmissionCost',
    key: 'transmissionCost',
  },
  {
    title: 'Base fee',
    dataIndex: 'baseFee',
    key: 'baseFee',
  },
  {
    title: 'Total cost',
    dataIndex: 'totalCost',
    key: 'totalCost',
  },
];

const CostBreakdown = ({ billing }) => {
  // We just need an estimate so we can make a regular unprotected API call
  // to get the price in USD
  const { priceInDollar } = useCMK('LINK');

  const billingFormatted = {
    transmissionCost: (
      <RoundedCurrency value={billing.transmissionCost} currency='LINK' />
    ),
    baseFee: <RoundedCurrency value={billing.baseFee} currency='LINK' />,
    totalCost: (
      <span style={{ fontWeight: 600 }}>
        <RoundedCurrency value={billing.totalCost} currency='LINK' />{' '}
        {priceInDollar && (
          <span style={{ fontSize: '1rem' }}>
            <Divider type='vertical' />
            <span style={{ color: 'var(--color-blue)' }}>
              <RoundedCurrency
                value={Number(billing.totalCost) * Number(priceInDollar)}
                currency='$'
              />
            </span>
          </span>
        )}
      </span>
    ),
  };

  return (
    <div className='cost-breakdown'>
      {billing && (
        <Table
          columns={columns}
          dataSource={[billingFormatted]}
          rowKey='totalCost'
          pagination={false}
        />
      )}
    </div>
  );
};

export default CostBreakdown;
