import { Exception, ExceptionOptions } from '.'
import { ErrorCode } from './code'

/**
 * Interface representing the options for an Exception.
 *
 * @extends ExceptionOptions
 */
export interface AbortErrorOptions extends Omit<ExceptionOptions, 'code' | 'name'>
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
export class AbortError<TMessage> extends Exception<TMessage, ErrorCode.ABORT> implements AbortErrorOptions
{
	constructor( reason: TMessage, options?: AbortErrorOptions )
	{
		super( reason, { name: 'AbortError', code: ErrorCode.ABORT, ...options } )
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static isAbortError<TMessage = string>( error: any ): error is AbortError<TMessage>
	{
		return super.isAbortError( error )
	}
}