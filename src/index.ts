import { ErrorCode } from './code'

/**
 * Interface representing the options for an Exception.
 *
 * @template TCode The type of the error code.
 * @extends ErrorOptions
 */
export interface ExceptionOptions<TCode = ErrorCode> extends ErrorOptions
{
	/** The error code associated with the Exception. */
	code: TCode
	/**  The name of the Exception. */
	name?: string
	/** The HTTP status code associated with the Exception. */
	status?: number
}


/**
 * Exception Class.
 * 
 * @template TMessage	The type of the message property of the Exception. Defaults to `string`.
 * @template TCode		The type of the code property of the Exception. Defaults to `ErrorCode`.
 *
 * @extends Error
 * @implements ExceptionOptions<TCode>
 */
export class Exception<TMessage = string, TCode = ErrorCode> extends Error implements ExceptionOptions<TCode>
{
	// @ts-expect-error Type 'TMessage' is not assignable to type 'string'.ts(2416)
	message: TMessage
	status
	name
	private __typename: 'Exception'
	code


	/**
	 * Constructs a new Exception instance.
	 *
	 * @param message The message describing the exception.
	 * @param options Additional options for the exception.
	 */
	constructor( message: TMessage, options: ExceptionOptions<TCode> ) 
	{
		super( '', options )

		this.__typename	= 'Exception'
		this.name		= options.name || this.__typename
		this.message	= message
		this.code		= options.code
		this.status		= options.status
	}

	
	
	/**
	 * Determines if the provided error is an instance of the Exception class.
	 *
	 * @template TMessage	The type of the message property of the Exception.
	 * @template TCode		The type of the code property of the Exception.
	 * 
	 * @param	error The error to check.
	 * @returns	`true` if the error is an instance of Exception or has a `__typename` property equal to 'Exception', `false` otherwise.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static isException<TMessage = string, TCode = ErrorCode>( error: any ): error is Exception<TMessage, TCode>
	{
		return (
			error instanceof Exception ||
			( typeof error === 'object' && '__typename' in error && error.__typename === 'Exception' )
		)
	}
	

	/**
	 * Determines if the provided error is an instance of the Exception class and has the ABORT ErrorCode.
	 * 
	 * This won't work for `new DOMException( 'Abort reason', 'AbortError' )` since we type guard the checked value to `Exception<TMessage, ErrorCode.ABORT>`.
	 *
	 * @template TMessage The type of the message property of the Exception.
	 * 
	 * @param	error The error to check.
	 * @returns	`true` if the error is an `Exception` and has the ABORT ErrorCode, `false` otherwise.
	 */
	static isAbortError<TMessage = string, TCode = ErrorCode>(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		error: any, code: TCode = ErrorCode.ABORT as TCode
	): error is Exception<TMessage, TCode>
	{
		return (
			Exception.isException( error ) &&
			( error.name === 'AbortError' || error.code === code )
		)
	}


	/**
	 * Converts the instance to a JSON object.
	 *
	 * @returns A JSON representation of the instance, including the message property.
	 */
	toJSON()
	{
		return {
			...this,
			message	: this.message,
			cause	: this.cause,
		}
	}
}