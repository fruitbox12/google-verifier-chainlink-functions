import { Tooltip } from 'antd';

const RoundedCurrency = ({ value, currency }) => {
  const rounded = () => {
    if (isNaN(value) || Number(value) === 0) return 0;
    // If > 1 LINK, round to 2 decimal places
    if (Number(value) >= 1) {
      return Number(Number(value).toFixed(2));
    }
    console.log(value);
    const trailingZeros = value.toString().split('.')[1].match(/0+/)[0].length;
    return Number(Number(value).toFixed(trailingZeros + 3));
  };

  if (!value) return null;

  if (currency === '$')
    return (
      <>
        {currency}
        {rounded()}
      </>
    );

  return (
    <Tooltip title={`${value} ${currency}`}>
      {rounded()} {currency}
    </Tooltip>
  );
};

export default RoundedCurrency;
