import { ErrorCode } from '@/code'
import { Exception } from '@/index'

describe( 'Exception', () => {

	it( 'can be thrown', () => {
		expect( () => {
			throw new Exception( 'Error message', {
				code: 0,
			} )
		} ).toThrow( Exception )
	} )


	it( 'supports custom `code` type', () => {
		try {
			throw new Exception( 'Not found', {
				code: 'ERRNOTFOUND',
			} )
		} catch ( error ) {
			if ( Exception.isException( error ) ) {
				expect( error.code ).toBe( 'ERRNOTFOUND' )
			}
		}
	} )

	
	describe( 'Exception.isException()', () => {
	
		it( 'acts as type guard', () => {
			try {
				throw new Exception( 'Error message', {
					code: 0,
				} )
			} catch ( error ) {
				if ( Exception.isException( error ) ) {
					expect( error.name ).toBe( 'Exception' )
				}
			}
			try {
				throw new Error( 'Error message' )
			} catch ( err ) {
				if ( ! Exception.isException( err ) ) {
					const error = err as Error
					expect( error.name ).toBe( 'Error' )
				}
			}
		} )
	
	
		it( 'supports Exception JSON object', () => {
			const error = (
				JSON.parse( JSON.stringify( new Exception( 'Exception with custom name.', {
					code: 0,
					name: 'AbortError',
				} ) ) )
			)
	
			expect( Exception.isException( error ) )
				.toBe( true )
		} )
	
	} )


	describe( 'Exception.isAbortError()', () => {

		it( 'checks if error is an AbortError with ABORT ErroCode', () => {

			expect(
				Exception.isAbortError( new Exception( 'Abort Reason', { code: ErrorCode.ABORT } ) )
			).toBe( true )

		} )
		
		
		it( 'checks if error is an AbortError with custom ABORT ErroCode', () => {

			expect(
				Exception.isAbortError(
					new Exception( 'Abort Reason', { code: 'ERR:CUSTOM_ERROR_CODE' } ),
					'ERR:CUSTOM_ERROR_CODE',
				)
			).toBe( true )

		} )


		it( 'checks if error is an AbortError with AbortError as name', () => {

			expect(
				Exception.isAbortError( new Exception( 'Abort Reason', { name: 'AbortError', code: ErrorCode.ABORT } ) )
			).toBe( true )

		} )

		
		it( 'supports AbortError JSON object', () => {
			const error = (
				JSON.parse( JSON.stringify( new Exception( 'Abort Reason', {
					code: ErrorCode.ABORT,
				} ) ) )
			)
			
			const error2 = (
				JSON.parse( JSON.stringify( new Exception( 'Abort Reason', {
					code: ErrorCode.ABORT,
					name: 'AbortError',
				} ) ) )
			)
	
			expect( Exception.isAbortError( error ) )
				.toBe( true )
			expect( Exception.isAbortError( error2 ) )
				.toBe( true )
		} )

	} )
	
	
	describe( 'Exception.toJSON()', () => {
	
		it( 'returns a JSON representation of the Exception Class', () => {
			const exception = (
				new Exception(
					'Error message', {
						code	: ErrorCode.ABORT,
						status	: 400,
						name	: 'AbortError',
						cause	: 'User aborted the request.',
					}
				)
			)
	
			const parsedException = JSON.parse( JSON.stringify( exception ) ) as Exception
	
			expect( Exception.isException( parsedException ) ).toBe( true )
			expect( parsedException.message ).toBe( exception.message )
			expect( parsedException.code ).toBe( exception.code )
			expect( parsedException.name ).toBe( exception.name )
			expect( parsedException[ '__typename' ] ).toBe( exception[ '__typename' ] )
			expect( parsedException.cause ).toBe( exception.cause )		
	
		} )
	
	} )

} )