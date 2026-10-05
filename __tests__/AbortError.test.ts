import { ExceptionName } from '@/error-names'
import { describe, expect, it } from 'vitest'
import { AbortError } from '@/abort'
import { ErrorCode } from '@/code'

enum CustomErrorCodes {
	CUSTOM_CODE = 'ERR:CUSTOM_ABORT_CODE',
}

describe('AbortError', () => {
	it('creates an instance of AbortError with default options', () => {
		const message = 'Operation aborted'
		const error = new AbortError({ message })

		expect(error).toBeInstanceOf(AbortError)
		expect(error.name).toBe(ExceptionName.AbortError)
		expect(error.code).toBe(ErrorCode.ABORT)
		expect(error.message).toBe(message)
		expect(error.status).toBeUndefined()
	})

	it('creates an instance of AbortError with custom options', () => {
		const message = 'Operation aborted'
		const options = { message, status: 400 }
		const error = new AbortError(options)

		expect(error).toBeInstanceOf(AbortError)
		expect(error.name).toBe(ExceptionName.AbortError)
		expect(error.code).toBe(ErrorCode.ABORT)
		expect(error.message).toBe(message)
		expect(error.status).toBe(options.status)
	})

	it('allows a custom AbortError code', () => {
		const error = new AbortError({ message: 'Operation aborted', code: CustomErrorCodes.CUSTOM_CODE })

		expect(error.code).toBe(CustomErrorCodes.CUSTOM_CODE)
	})

	describe('AbortError.isAbortError()', () => {
		it('checks if error is an AbortError with ABORT ErroCode', () => {
			expect(AbortError.isAbortError(new AbortError({ message: 'Abort Reason' }))).toBe(true)
		})

		it('checks if error is an AbortError with custom ABORT ErroCode', () => {
			expect(
				AbortError.isAbortError(
					new AbortError({ message: 'Operation aborted', code: CustomErrorCodes.CUSTOM_CODE }),
					CustomErrorCodes.CUSTOM_CODE,
				),
			).toBe(true)
		})
	})
})
