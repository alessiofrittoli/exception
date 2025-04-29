import { Exception, type ExceptionOptions } from '.'
import { ErrorCode } from './code'

/**
 * Interface representing the options for an Exception.
 *
 * @extends ExceptionOptions
 */
export interface AbortErrorOptions<TCode = ErrorCode> extends Partial<Omit<ExceptionOptions<TCode>, 'name'>>
{
	/** The HTTP status code associated with the Exception. */
	status?: number
}


/**
 * Exception Class.
 * 
 * @template TMessage The type of the message property of the Exception. Defaults to `string`.
 *
 * @extends Exception
 */
export class AbortError<
	TMessage = string, TCode = ErrorCode
> extends Exception<TMessage, TCode> implements AbortErrorOptions<TCode>
{
	constructor( reason: TMessage, options: AbortErrorOptions<TCode> = {} )
	{
		const name = 'AbortError'

		const {
			code = ErrorCode.ABORT as TCode, ...rest
		} = options

		super( reason, { ...rest, name, code } )
	}


	/**
	 * Determines if the provided error is an instance of the AbortError class and has the ABORT ErrorCode.
	 * 
	 * This won't work for `new DOMException( 'Abort reason', 'AbortError' )` since we type guard the checked value to `AbortError<TMessage>`.
	 *
	 * @template TMessage The type of the message property of the AbortError.
	 * 
	 * @param	error The error to check.
	 * @returns	`true` if the error is an `AbortError` and has the ABORT ErrorCode, `false` otherwise.
	 */
	static isAbortError<
		TMessage = string, TCode = ErrorCode
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	>( error: any, code?: TCode ): error is AbortError<TMessage, TCode>
	{
		return super.isAbortError( error, code )	
	}
}