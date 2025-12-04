/**
 * Most common error codes.
 * 
 */
export const ErrorCode = {
	UNKNOWN			: 'ERR:UNKNOWN',
	ABORT			: 'ERR:ABORT',
	EMPTY_VALUE		: 'ERR:EMPTYVALUE',
	WRONG_VALUE		: 'ERR:WRONGVALUE',
	EXPIRED			: 'ERR:EXPIRED',
	TOO_EARLY		: 'ERR:TOOEARLY',
	TOO_MANY		: 'ERR:TOOMANY',
	QUOTA_REACHED	: 'ERR:QUOTAREACHED',
	NOT_FOUND		: 'ERR:NOTFOUND',
	OFFLINE			: 'ERR:INTERNETDISCONNECTED',
} as const

export type ErrorCode = typeof ErrorCode[ keyof typeof ErrorCode ]