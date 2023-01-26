import { BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  TwitterVerifier,
  OCRResponse,
  OwnershipTransferRequested,
  OwnershipTransferred,
  RequestFulfilled,
  RequestSent,
} from '../generated/TwitterVerifier/TwitterVerifier';
import { TwitterVerificationRequest } from '../generated/schema';

export function handleOCRResponse(event: OCRResponse): void {
  let verificationRequest = TwitterVerificationRequest.load(
    getIdFromEventParams(event.block.timestamp, event.params.requestId),
  );

  if (!verificationRequest) {
    verificationRequest = new TwitterVerificationRequest(
      getIdFromEventParams(event.block.timestamp, event.params.requestId),
    );
  }

  verificationRequest.requestId = event.params.requestId;
  verificationRequest.result = event.params.result;
  verificationRequest.timestamp = event.block.timestamp;

  verificationRequest.save();
}

export function handleOwnershipTransferRequested(
  event: OwnershipTransferRequested,
): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleRequestFulfilled(event: RequestFulfilled): void {}

export function handleRequestSent(event: RequestSent): void {}

function getIdFromEventParams(timestamp: BigInt, requestId: Bytes): string {
  return timestamp.toString() + '-' + requestId.toHexString();
}
