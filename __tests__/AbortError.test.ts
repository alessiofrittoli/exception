import { AbortError } from '@/abort'
import { ErrorCode } from '@/code'

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


	describe( 'AbortError.isAbortError()', () => {
	
		it( 'checks if error is an AbortError with ABORT ErroCode', () => {

			expect(
				AbortError.isAbortError( new AbortError( 'Abort Reason' ) )
			).toBe( true )

		} )

	} )

} )