import { useWidth } from '../../hooks';

const TwitterUsername = ({ username }) => {
  const width = useWidth();

  const displayed = username
    ? width > 700
      ? `@ ${username}`
      : username
    : null;
  return (
    <a
      href={`https://twitter.com/${username}`}
      target='_blank'
      rel='noopener noreferrer'
      // style no line break
      style={{ whiteSpace: 'nowrap' }}
    >
      {displayed}
    </a>
  );
};

export default TwitterUsername;
