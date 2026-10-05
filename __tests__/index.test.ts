import { ExceptionName } from '@/error-names'
import { describe, expect, it } from 'vitest'
import { Exception } from '@/index'
import { ErrorCode } from '@/code'

describe('Exception', () => {
	it('can be thrown', () => {
		expect(() => {
			throw new Exception({
				message: 'Error message',
				code: 0,
			})
		}).toThrow(Exception)
	})

	it('supports custom `code` type', () => {
		try {
			throw new Exception({
				message: 'Not found',
				code: 'ERRNOTFOUND',
			})
		} catch (error) {
			if (Exception.isException(error)) {
				expect(error.code).toBe('ERRNOTFOUND')
			}
		}
	})

	it('can be created from another instance of Exception', () => {
		const error1 = new Exception({
			name: ExceptionName.ConstraintError,
			message: 'Error message',
			title: 'Error title',
			description: 'Error description',
			cause: 'Cause',
			code: 0,
			isCritical: true,
			status: 500,
		})

		const error2 = new Exception(error1)

		expect(error2.name).toBe(error1.name)
		expect(error2.message).toBe(error1.message)
		expect(error2.title).toBe(error1.title)
		expect(error2.description).toBe(error1.description)
		expect(error2.cause).toBe(error1.cause)
		expect(error2.code).toBe(error1.code)
		expect(error2.isCritical).toBe(error1.isCritical)
		expect(error2.status).toBe(error1.status)
	})

	it('can be created from an Exception JSON object', () => {
		const error1 = new Exception({
			name: ExceptionName.ConstraintError,
			message: 'Error message',
			title: 'Error title',
			description: 'Error description',
			cause: 'Cause',
			code: 0,
			isCritical: true,
			status: 500,
		})

		const error2 = new Exception(JSON.parse(JSON.stringify(error1)))

		expect(error2.name).toBe(error1.name)
		expect(error2.message).toBe(error1.message)
		expect(error2.title).toBe(error1.title)
		expect(error2.description).toBe(error1.description)
		expect(error2.cause).toBe(error1.cause)
		expect(error2.code).toBe(error1.code)
		expect(error2.isCritical).toBe(error1.isCritical)
		expect(error2.status).toBe(error1.status)
	})

	it('parses the given `cause` if it is an Exception instance or Exception JSON object', () => {
		const cause = new Exception({
			name: ExceptionName.ConstraintError,
			message: 'Error message',
			title: 'Error title',
			description: 'Error description',
			cause: 'Cause',
			code: 0,
			isCritical: true,
			status: 500,
		})

		expect(
			new Exception({
				code: 1,
				cause,
			}).cause,
		).toBeInstanceOf(Exception)

		expect(
			new Exception({
				code: 1,
				cause: JSON.parse(JSON.stringify(cause)),
			}).cause,
		).toBeInstanceOf(Exception)
	})

	it('supports parsing nested `cause` if it is an Exception instance or Exception JSON object', () => {
		const cause1 = new Exception({
			code: 0,
		})

		const cause2 = new Exception({
			code: 1,
			cause: JSON.parse(JSON.stringify(cause1)),
		})

		const cause3 = new Exception({
			code: 2,
			cause: JSON.parse(JSON.stringify(cause2)),
		})

		const error = new Exception({
			code: 3,
			cause: JSON.parse(JSON.stringify(cause3)),
		})

		const parsedError = new Exception(JSON.parse(JSON.stringify(error)))

		expect(parsedError.code).toBe(3)
		expect(parsedError.cause).toBeInstanceOf(Exception)

		if (Exception.isException(parsedError.cause)) {
			expect(parsedError.cause.code).toBe(2)
			expect(parsedError.cause.cause).toBeInstanceOf(Exception)

			if (Exception.isException(parsedError.cause.cause)) {
				expect(parsedError.cause.cause.code).toBe(1)

				if (Exception.isException(parsedError.cause.cause.cause)) {
					expect(parsedError.cause.cause.cause).toBeInstanceOf(Exception)
					expect(parsedError.cause.cause.cause.code).toBe(0)
				}
			}
		}
	})

	describe('Exception.isException()', () => {
		it('acts as type guard', () => {
			try {
				throw new Exception({
					message: 'Error message',
					code: 0,
				})
			} catch (error) {
				if (Exception.isException(error)) {
					expect(error.name).toBe(ExceptionName.Exception)
				}
			}

			try {
				throw new Error('Error message')
			} catch (err) {
				if (!Exception.isException(err)) {
					const error = err as Error
					expect(error.name).toBe('Error')
				}
			}
		})

		it('supports Exception JSON object', () => {
			const error = JSON.parse(
				JSON.stringify(
					new Exception({
						name: ExceptionName.AbortError,
						code: 0,
					}),
				),
			)

			expect(Exception.isException(error)).toBe(true)
		})
	})

	describe('Exception.isAbortError()', () => {
		it('checks if error is an AbortError with ABORT ErroCode', () => {
			expect(
				Exception.isAbortError(new Exception({ message: 'Abort Reason', code: ErrorCode.ABORT })),
			).toBe(true)
		})

		it('checks if error is an AbortError with custom ABORT ErroCode', () => {
			expect(
				Exception.isAbortError(
					new Exception({ message: 'Abort Reason', code: 'ERR:CUSTOM_ERROR_CODE' }),
					'ERR:CUSTOM_ERROR_CODE',
				),
			).toBe(true)
		})

		it('checks if error is an AbortError with AbortError as name', () => {
			expect(
				Exception.isAbortError(
					new Exception({
						name: ExceptionName.AbortError,
						message: 'Abort Reason',
						code: ErrorCode.ABORT,
					}),
				),
			).toBe(true)
		})

		it('supports AbortError JSON object', () => {
			const error = JSON.parse(
				JSON.stringify(
					new Exception({
						message: 'Abort Reason',
						code: ErrorCode.ABORT,
					}),
				),
			)

			const error2 = JSON.parse(
				JSON.stringify(
					new Exception({
						name: ExceptionName.AbortError,
						message: 'Abort Reason',
						code: ErrorCode.ABORT,
					}),
				),
			)

			expect(Exception.isAbortError(error)).toBe(true)
			expect(Exception.isAbortError(error2)).toBe(true)
		})
	})

	describe('Exception.toJSON()', () => {
		it('returns a JSON representation of the Exception', () => {
			const exception = new Exception({
				name: ExceptionName.AbortError,
				message: 'Error message',
				code: ErrorCode.ABORT,
				status: 400,
				cause: 'User aborted the request.',
			})

			const parsedException = JSON.parse(JSON.stringify(exception)) as Exception

			expect(Exception.isException(parsedException)).toBe(true)
			expect(parsedException.message).toBe(exception.message)
			expect(parsedException.code).toBe(exception.code)
			expect(parsedException.name).toBe(exception.name)
			expect(parsedException['__typename']).toBe(exception['__typename'])
			expect(parsedException.cause).toBe(exception.cause)
		})
	})
})
