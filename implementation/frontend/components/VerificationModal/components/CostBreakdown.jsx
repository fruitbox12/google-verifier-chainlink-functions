const CostBreakdown = ({ billing }) => {
  return (
    <div className='cost-breakdown'>
      {billing &&
        Object.keys(billing).map((key) => (
          <div className='cost-breakdown-item' key={key}>
            <span className='label'>{key}: </span>
            <span className='value'>{billing[key]}</span>
          </div>
        ))}
    </div>
  );
};

export default CostBreakdown;
