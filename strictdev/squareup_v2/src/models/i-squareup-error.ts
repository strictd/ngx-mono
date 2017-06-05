export class ISquareupError {
  category: ISquareErrorCategory;
  code: ISquareErrorCode;
  detail: string;
  field?: string;
}

export type ISquareErrorCategory =
  "API_ERROR" // An error occurred with the Connect API itself.
  | "AUTHENTICATION_ERROR" // An authentication error occurred. Most commonly" the request had a missing" malformed" or otherwise invalid Authorization header.
  | "INVALID_REQUEST_ERROR" // The request was invalid. Most commonly" a required parameter was missing" or a provided parameter had an invalid value.
  | "RATE_LIMIT_ERROR" // Your application reached the Connect API rate limit. Retry your request after a while.
  | "PAYMENT_METHOD_ERROR" // An error occurred while processing a payment method. Most commonly" the details of the payment method were invalid (such as a card's CVV or expiration date).
  | "REFUND_ERROR" // An error occurred while attempting to process a refund.
;

export type ISquareErrorCode =
  "INTERNAL_SERVER_ERROR"
  | "UNAUTHORIZED"
  | "ACCESS_TOKEN_EXPIRED"
  | "ACCESS_TOKEN_REVOKED"
  | "FORBIDDEN"
  | "INSUFFICIENT_SCOPES"
  | "APPLICATION_DISABLED"
  | "V1_APPLICATION"
  | "V1_ACCESS_TOKEN"
  | "CARD_PROCESSING_NOT_ENABLED"
  | "BAD_REQUEST"
  | "MISSING_REQUIRED_PARAMETER"
  | "INCORRECT_TYPE"
  | "INVALID_TIME"
  | "INVALID_TIME_RANGE"
  | "INVALID_VALUE"
  | "INVALID_CURSOR"
  | "UNKNOWN_QUERY_PARAMETER"
  | "CONFLICTING_PARAMETERS"
  | "EXPECTED_JSON_BODY"
  | "INVALID_SORT_ORDER"
  | "VALUE_REGEX_MISMATCH"
  | "VALUE_TOO_SHORT"
  | "VALUE_TOO_LONG"
  | "VALUE_TOO_LOW"
  | "VALUE_TOO_HIGH"
  | "VALUE_EMPTY"
  | "ARRAY_EMPTY"
  | "EXPECTED_BOOLEAN"
  | "EXPECTED_INTEGER"
  | "EXPECTED_FLOAT"
  | "EXPECTED_STRING"
  | "EXPECTED_OBJECT"
  | "EXPECTED_ARRAY"
  | "EXPECTED_BASE64_ENCODED_BYTE_ARRAY"
  | "INVALID_ARRAY_VALUE"
  | "INVALID_ENUM_VALUE"
  | "INVALID_CONTENT_TYPE"
  | "INVALID_FORM_VALUE"
  | "ONE_INSTRUMENT_EXPECTED"
  | "NO_FIELDS_SET"
  | "CARD_EXPIRED"
  | "INVALID_EXPIRATION"
  | "INVALID_EXPIRATION_YEAR"
  | "INVALID_EXPIRATION_DATE"
  | "UNSUPPORTED_CARD_BRAND"
  | "INVALID_CARD"
  | "DELAYED_TRANSACTION_EXPIRED"
  | "DELAYED_TRANSACTION_CANCELED"
  | "DELAYED_TRANSACTION_CAPTURED"
  | "DELAYED_TRANSACTION_FAILED"
  | "CARD_TOKEN_EXPIRED"
  | "CARD_TOKEN_USED"
  | "AMOUNT_TOO_HIGH"
  | "UNSUPPORTED_INSTRUMENT_TYPE"
  | "REFUND_AMOUNT_INVALID"
  | "REFUND_ALREADY_PENDING"
  | "PAYMENT_NOT_REFUNDABLE"
  | "INVALID_CARD_DATA"
  | "IDEMPOTENCY_KEY_REUSED"
  | "UNEXPECTED_VALUE"
  | "CARD_DECLINED"
  | "VERIFY_CVV_FAILURE"
  | "VERIFY_AVS_FAILURE"
  | "CARD_DECLINED_CALL_ISSUER"
  | "NOT_FOUND"
  | "REQUEST_TIMEOUT"
  | "CONFLICT"
  | "REQUEST_ENTITY_TOO_LARGE"
  | "UNSUPPORTED_MEDIA_TYPE"
  | "RATE_LIMITED"
  | "NOT_IMPLEMENTED"
  | "SERVICE_UNAVAILABLE"
;
