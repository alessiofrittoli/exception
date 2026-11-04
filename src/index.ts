import type { Omit, ReadOnly } from '@alessiofrittoli/type-utils'
import { ExceptionName } from '@/error-names'
import { ErrorCode } from '@/code'

export * from '@/error-names'

/**
 * The `Exception` severity.
 *
 */
export type Severity = typeof Exception.RECOVERABLE | typeof Exception.SEVERE | typeof Exception.CRITICAL

export interface JSONException<T = ErrorCode> extends ReadOnly<Omit<Exception<T>, 'toJSON'>> {
	readonly Symbol: typeof ExceptionName.Exception
}

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
	 * Indicates the error severity.
	 *
	 */
	severity?: Severity
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
 */
export class Exception<T = ErrorCode> extends Error {
	public static readonly Symbol = Symbol.for(ExceptionName.Exception)
	/**
	 * The error interface name.
	 *
	 */
	public override readonly name: string = ExceptionName.Exception
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
	 * The error severity.
	 *
	 */
	public readonly severity?: Severity
	/**
	 * Indicates whether the `Exception.severity` is critical.
	 *
	 */
	public readonly isCritical

	/**
	 * A non-critical error that could be resolved by retrying the algorithm maybe with different parameters.
	 *
	 */
	public static readonly RECOVERABLE = 1
	/**
	 * An error that interrupted some algorithms but the overall system still works.
	 *
	 */
	public static readonly SEVERE = 2
	/**
	 * An error that interrupts the algorithm.
	 *
	 */
	public static readonly CRITICAL = 3

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

		const { isCritical, severity = isCritical ? Exception.CRITICAL : undefined } = options

		this.message = message
		this.title = options.title
		this.description = options.description
		this.code = options.code
		this.severity = severity
		this.isCritical = isCritical ?? this.severity === Exception.CRITICAL
		this.status = options.status
		this.cause = Exception.normalizeCause(options.cause)
	}

	/**
	 * Determines if the provided error is an Exception instance or a JSON representation of the Exception.
	 *
	 * @template T The type of the code property of the Exception.
	 *
	 * @param error The error to check.
	 *
	 * @returns `true` if the error is an instance of Exception or a JSON representation of the Exception, `false` otherwise.
	 */
	public static isException<T = ErrorCode>(error: unknown): error is Exception<T> | JSONException<T> {
		if (!error || typeof error !== 'object') {
			return false
		}

		if (error instanceof Exception) {
			return true
		}

		if (!('Symbol' in error)) {
			return false
		}

		return (
			error.Symbol === Exception.Symbol ||
			(typeof error.Symbol === 'string' && Symbol.for(error.Symbol) === Exception.Symbol)
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
	public toJSON(): JSONException<T> {
		return {
			Symbol: ExceptionName.Exception,
			name: this.name,
			message: this.message,
			code: this.code,
			title: this.title,
			description: this.description,
			isCritical: this.isCritical,
			severity: this.severity,
			status: this.status,
			cause: this.cause,
		}
	}

	/**
	 * Attempts to normalize the given `cause` to a possible `Exception` instance.
	 *
	 * @param cause The error cause.
	 * @returns The cause as `Exception` instance if applicable, the given cause as is (`unknown`) otherwise.
	 */
	private static normalizeCause(cause: unknown): unknown {
		if (!Exception.isException(cause) || cause instanceof Exception) {
			return cause
		}

		return new Exception(cause)
	}
}
