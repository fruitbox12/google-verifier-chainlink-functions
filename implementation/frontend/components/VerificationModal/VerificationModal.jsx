import { Modal } from 'antd';
import stores from '../../stores';

const VerificationModal = () => {
  const { isModalOpen, setIsModalOpen } = stores.useVerification();

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
