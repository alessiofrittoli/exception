import { AbortError } from '@/abort'
import { ErrorCode } from '@/code'

enum CustomErrorCodes
{
	CUSTOM_CODE = 'ERR:CUSTOM_ABORT_CODE',
}

describe( 'AbortError', () => {

	it( 'creates an instance of AbortError with default options', () => {

		const reason	= 'Operation aborted'
		const error		= new AbortError( reason )

		expect( error ).toBeInstanceOf( AbortError )
		expect( error.name ).toBe( 'AbortError' )
		expect( error.code ).toBe( ErrorCode.ABORT )
		expect( error.message ).toBe( reason )
		expect( error.status ).toBeUndefined()

	} )


	it( 'creates an instance of AbortError with custom options', () => {

		const reason	= 'Operation aborted'
		const options	= { status: 400 }
		const error		= new AbortError( reason, options )

		expect( error ).toBeInstanceOf( AbortError )
		expect( error.name ).toBe( 'AbortError' )
		expect( error.code ).toBe( ErrorCode.ABORT )
		expect( error.message ).toBe( reason )
		expect( error.status ).toBe( options.status )

	} )


	it( 'allows a custom AbortError code', () => {

		const error = new AbortError( 'Operation aborted', { code: CustomErrorCodes.CUSTOM_CODE } )

		expect( error.code ).toBe( CustomErrorCodes.CUSTOM_CODE )

	} )


	describe( 'AbortError.isAbortError()', () => {
	
		it( 'checks if error is an AbortError with ABORT ErroCode', () => {

			expect(
				AbortError.isAbortError( new AbortError( 'Abort Reason' ) )
			).toBe( true )

		} )


		it( 'checks if error is an AbortError with custom ABORT ErroCode', () => {
			
			expect(
				AbortError.isAbortError(
					new AbortError( 'Operation aborted', { code: CustomErrorCodes.CUSTOM_CODE } ),
					CustomErrorCodes.CUSTOM_CODE,
				)
			).toBe( true )
	
		} )

	} )

} )