import { useEffect, useState } from 'react';
import { Button, Input, Modal, Tooltip } from 'antd';
import { useAccount } from 'wagmi';
import { useEncryption, useWidth } from '../../hooks';
import stores from '../../stores';
import config from '../../default-config';

const VerificationModal = () => {
  const { isModalOpen, setIsModalOpen, isRequesting, setIsRequesting } =
    stores.useVerification();
  const { encrypt } = useEncryption();
  const { address } = useAccount();
  const width = useWidth();
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [reponseData, setResponseData] = useState({
    data: {},
    billing: {},
    error: false,
  });

  const requestVerification = async () => {
    const formatted = checkUsername.format();

    setIsRequesting(true);
    // Encrypt username & address
    const encrypted = encrypt(formatted, address);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formatted,
          address,
          encrypted,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data.data && data.billing) {
        setResponseData(data);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
        setResponseData({ data: {}, billing: {}, error: true });
      }

      setIsRequesting(false);
    } catch (e) {
      setErrorMessage('Something went wrong. Please try again.');
      setResponseData({ data: {}, billing: {}, error: true });
      setIsRequesting(false);
    }
  };

  const checkUsername = {
    format: () => username.replace(/@/g, '').replace(/&/g, ''),
    isValid: () => /^[a-zA-Z0-9_]{1,15}$/.test(checkUsername.format()),
  };

  const sendTweet = () => {
    const tweet = config.getTweet(address);
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, '_blank');
  };

  return (
    <Modal
      title='Verify your Twitter account'
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={width > 800 ? 'min(800px, 70%)' : '100%'}
    >
      <div className='verification-modal'>
        {/* Send tweet */}
        <div className='section'>
          <span className='label'>1</span>
          <span className='instruction'>
            Send{' '}
            <Tooltip
              title={
                // TODO ADD CLICK TO COPY AND CHANGE ICON
                config.getTweet(address)
              }
            >
              <a>the verification tweet</a>.
            </Tooltip>
          </span>
          <Button type='primary' onClick={sendTweet}>
            Send tweet
          </Button>
        </div>

        {/* Input username */}
        <div className='section'>
          <span className='label'>2</span>
          <span className='instruction' style={{ gridColumn: 'span 2' }}>
            Enter your Twitter username.
          </span>
          <div className='empty'></div>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={1}
            maxLength={15}
            style={{
              gridColumn: 'span 2',
              borderColor:
                username === ''
                  ? 'var(--color-blue)'
                  : checkUsername.isValid()
                  ? 'var(--color-green)'
                  : 'var(--color-orange-light)',
            }}
            placeholder='Username'
            // change the border color based on the validity
            prefix={
              <span
                style={{
                  color: 'var(--color-blue)',
                  fontWeight: 800,
                  opacity: 0.7,
                }}
              >
                @
              </span>
            }
          />
        </div>

        {/* Request verification */}
        <div className='section'>
          <span className='label'>3</span>
          <span className='instruction'>Request the verification.</span>
          <Button
            type='primary'
            onClick={requestVerification}
            disabled={!checkUsername.isValid()}
            loading={isRequesting}
          >
            Request verification
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default VerificationModal;
