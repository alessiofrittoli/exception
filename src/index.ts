import { ExceptionName } from '@/error-names'
import { ErrorCode } from '@/code'

/**
 * Interface representing the options for an Exception.
 *
 * @template T The type of the error code.
 *
 * @extends ErrorOptions
 */
export interface ExceptionOptions<T = ErrorCode> extends ErrorOptions {
	/**
	 * The error interface name.
	 *
	 * @see {@link ExceptionName} for a list of possible standard values.
	 *
	 * @default ExceptionName.Exception
	 */
	name?: string
	/**
	 * The error message containing technical informations about the error.
	 *
	 * It shouldn't be rendered to the user.
	 */
	message?: string
	/**
	 * The error title.
	 *
	 */
	title?: string
	/**
	 * The error description.
	 *
	 */
	description?: string
	/**
	 * The error code associated with the Exception.
	 *
	 */
	code: T
	/**
	 * Indicates whether the error is a critical error.
	 *
	 * @default false
	 */
	isCritical?: boolean
	/**
	 * The HTTP status code associated with the Exception.
	 *
	 */
	status?: number
	/**
	 * The error cause.
	 *
	 */
	cause?: unknown
}

/**
 * Exception Class.
 *
 * @template T The type of the code property of the Exception. Defaults to `ErrorCode`.
 *
 * @extends Error
 * @implements ExceptionOptions<T>
 */
export class Exception<T = ErrorCode> extends Error {
	private readonly __typename = ExceptionName.Exception
	/**
	 * The error interface name.
	 *
	 */
	public override readonly name: string = this.__typename
	/**
	 * The error message containing technical informations about the error.
	 *
	 * ⚠️ do not render `Exception.message` to the user.
	 */
	public override readonly message
	/**
	 * The error title that can be rendered to the user.
	 *
	 */
	public readonly title
	/**
	 * The error description that can be rendered to the user.
	 *
	 */
	public readonly description
	/**
	 * The error code.
	 *
	 */
	public readonly code
	/**
	 * Indicates whether the error is a critical error.
	 *
	 */
	public readonly isCritical
	/**
	 * The HTTP status code associated with the Exception.
	 *
	 */
	public readonly status
	/**
	 * The error cause.
	 *
	 */
	public override readonly cause: unknown

	/**
	 * Constructs a new Exception instance.
	 *
	 * @param options An object defining Exception options. See {@link ExceptionOptions} for more info.
	 */
	public constructor(options: ExceptionOptions<T>) {
		const { message = 'Unknown error.' } = options

		super(message)

		if (options.name) {
			this.name = options.name
		}

		this.message = message
		this.title = options.title
		this.description = options.description
		this.code = options.code
		this.isCritical = options.isCritical ?? false
		this.status = options.status
		this.cause = Exception.isException(options.cause) ? new Exception(options.cause) : options.cause
	}

	/**
	 * Determines if the provided error is an instance of the Exception class.
	 *
	 * @template T The type of the code property of the Exception.
	 *
	 * @param error The error to check.
	 * @returns `true` if the error is an instance of Exception or has a `__typename` property equal to 'Exception', `false` otherwise.
	 */
	public static isException<T = ErrorCode>(
		// oxlint-disable-next-line typescript/no-explicit-any
		error: any,
	): error is Exception<T> {
		return (
			error instanceof Exception ||
			(typeof error === 'object' &&
				'__typename' in error &&
				error.__typename === ExceptionName.Exception)
		)
	}

	/**
	 * Determines if the provided error is an instance of the Exception class and has the ABORT ErrorCode.
	 *
	 * @template T The type of the code property of the Exception.
	 *
	 * @param error The error to check.
	 * @returns `true` if the error is an `Exception` and has the ABORT ErrorCode, `false` otherwise.
	 */
	public static isAbortError<T = ErrorCode>(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		error: any,
		code: T = ErrorCode.ABORT as T,
	): error is Exception<T> {
		return (
			Exception.isException(error) && (error.name === ExceptionName.AbortError || error.code === code)
		)
	}

	/**
	 * Converts the instance to a JSON object.
	 *
	 * @returns A JSON representation of the instance, including the message property.
	 */
	public toJSON(): this {
		return {
			...this,
			message: this.message,
			cause: this.cause,
		}
	}
}
