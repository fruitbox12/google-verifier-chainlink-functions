const TwitterUsername = ({ username }) => {
  const displayed = username ? `@ ${username}` : null;
  return (
    <a
      href={`https://twitter.com/${username}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      {displayed}
    </a>
  );
};

export default TwitterUsername;
