import { Modal } from 'antd';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useEncryption } from '../../hooks';
import stores from '../../stores';

const VerificationModal = () => {
  const { isModalOpen, setIsModalOpen } = stores.useVerification();
  const { encrypt } = useEncryption();
  const { address } = useAccount();
  const username = 'wagmi';

  const requestVerification = async () => {
    // Encrypt username & address
    const encrypted = encrypt(username, address);

    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, address, encrypted }),
    });
    const data = await res.json();
    console.log(data);

    // TODO Handle error, maybe the decryption failed: try again
  };

  useEffect(() => {
    if (isModalOpen) {
      requestVerification();
    }
  }, [isModalOpen]);

  return (
    <Modal
      title='Verify your Twitter account'
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <p>Coming soon...</p>
    </Modal>
  );
};

export default VerificationModal;
