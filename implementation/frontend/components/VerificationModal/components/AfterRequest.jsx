import { useEffect, useState } from 'react';
import {
  LoadingOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import CostBreakdown from './CostBreakdown';
import { TwitterUsername, Address } from '../../Utils';

const AfterRequest = ({ response, isRequesting }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isRequesting || response.data || response.error) setIsExpanded(true);
  }, [isRequesting, response.data, response.error]);

  if (!isExpanded) return null;

  return (
    <div className='verification-after'>
      <div className='header'>
        {isRequesting ? (
          <span className='status pending'>
            <ClockCircleOutlined />
            <span>Verification pending...</span>
          </span>
        ) : response.error ? (
          <span className='status failed'>
            <ExclamationCircleOutlined />
            <span>Error</span>
          </span>
        ) : Number(response.data.result) === 1 ? (
          <span className='status success'>
            <CheckCircleOutlined />
            Verification success
          </span>
        ) : (
          <span className='status failed'>
            <CloseCircleOutlined />
            Verification failed
          </span>
        )}
      </div>

      {isRequesting ? (
        <div className='content loading'>
          <LoadingOutlined />
        </div>
      ) : response.error ? (
        // TODO Set that to class
        <div className='content' style={{ color: 'var(--color-yellow' }}>
          {response.errorMsg ?? 'Something went wrong. Please try again.'}
        </div>
      ) : Number(response.data.result) === 1 ? (
        <div className='content'>
          <span>Twitter account</span>{' '}
          <TwitterUsername username={response.data.username} />{' '}
          <span>is now verified for</span>{' '}
          <Address address={response.data.address} />.
        </div>
      ) : (
        <div className='content'>
          <span>Twitter account</span>{' '}
          <TwitterUsername username={response.data.username} />{' '}
          <span className='emphasize'>could not be verified</span> for{' '}
          <Address address={response.data.address} />.
        </div>
      )}

      {response.billing && <CostBreakdown billing={response.billing} />}
    </div>
  );
};

export default AfterRequest;
