import { Exception, type ExceptionOptions } from '@/index'
import { ExceptionName } from '@/error-names'
import { ErrorCode } from '@/code'

/**
 * Interface representing the options for an Exception.
 *
 * @extends ExceptionOptions
 */
export type AbortErrorOptions<T = ErrorCode> = Partial<Omit<ExceptionOptions<T>, 'name'>>

/**
 * Exception Class.
 *
 * @template TMessage The type of the message property of the Exception. Defaults to `string`.
 *
 * @extends Exception
 */
export class AbortError<T = ErrorCode> extends Exception<T> implements AbortErrorOptions<T> {
	public constructor(options: AbortErrorOptions<T> = {}) {
		const { code = ErrorCode.ABORT as T, ...rest } = options

		super({
			...rest,
			name: ExceptionName.AbortError,
			code,
		})
	}

	/**
	 * Determines if the provided error is an instance of the AbortError class and has the ABORT ErrorCode.
	 *
	 * @template T The type of the code property of the Exception.
	 *
	 * @param error The error to check.
	 * @returns	`true` if the error is an `AbortError` and has the ABORT ErrorCode, `false` otherwise.
	 */
	public static override isAbortError<
		T = ErrorCode,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	>(error: any, code?: T): error is AbortError<T> {
		return super.isAbortError(error, code)
	}
}
