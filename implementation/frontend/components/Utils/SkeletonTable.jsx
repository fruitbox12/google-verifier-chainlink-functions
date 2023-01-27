import { Table, Skeleton } from 'antd';

const SkeletonTable = ({ columns, rows }) => {
  return (
    <Table
      rowKey='key'
      pagination={false}
      dataSource={[...Array(rows)].map((_, index) => ({
        key: `key${index}`,
      }))}
      columns={columns.map((column) => {
        return {
          ...column,
          render: function renderPlaceholder() {
            return (
              <Skeleton
                active
                key={column.dataIndex}
                title={true}
                paragraph={false}
              />
            );
          },
        };
      })}
    />
  );
};

export default SkeletonTable;
