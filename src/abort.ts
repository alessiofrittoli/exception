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
}