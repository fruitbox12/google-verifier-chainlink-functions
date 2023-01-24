import { Tooltip } from 'antd';

const ElapsedTime = ({ timestamp }) => {
  const now = new Date();
  const date = new Date(timestamp * 1000);
  const diff = now.getTime() - date.getTime();

  // Get the difference in various units
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const displayed =
    seconds < 60
      ? `${seconds} seconds ago`
      : minutes < 60
      ? `${minutes} minutes ago`
      : hours < 24
      ? `${hours} hours ago`
      : days < 7
      ? `${days} days ago`
      : weeks < 4
      ? `${weeks} weeks ago`
      : months < 12
      ? `${months} months ago`
      : `${years} years ago`;

  return <Tooltip title={date.toLocaleString()}>{displayed}</Tooltip>;
};

export default ElapsedTime;
