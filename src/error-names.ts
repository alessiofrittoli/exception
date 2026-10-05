/**
 * Exception Name.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/DOMException#error_names)
 */
export const ExceptionName = {
	Exception: 'Exception',
	AbortError: 'AbortError',
	NotAllowedError: 'NotAllowedError',
	NotFoundError: 'NotFoundError',
	NotSupportedError: 'NotSupportedError',
	InvalidStateError: 'InvalidStateError',
	InvalidAccessError: 'InvalidAccessError',
	NetworkError: 'NetworkError',
	SecurityError: 'SecurityError',
	TimeoutError: 'TimeoutError',
	QuotaExceededError: 'QuotaExceededError',
	DataError: 'DataError',
	EncodingError: 'EncodingError',
	OperationError: 'OperationError',
	ConstraintError: 'ConstraintError',
	TransactionInactiveError: 'TransactionInactiveError',
	ReadOnlyError: 'ReadOnlyError',
	VersionError: 'VersionError',
	NoModificationAllowedError: 'NoModificationAllowedError',
	HierarchyRequestError: 'HierarchyRequestError',
	WrongDocumentError: 'WrongDocumentError',
	InvalidCharacterError: 'InvalidCharacterError',
	NamespaceError: 'NamespaceError',
	SyntaxError: 'SyntaxError',
	DataCloneError: 'DataCloneError',
	URLMismatchError: 'URLMismatchError',
	InvalidModificationError: 'InvalidModificationError',
	NotReadableError: 'NotReadableError',
} as const

export type ExceptionName = (typeof ExceptionName)[keyof typeof ExceptionName]
