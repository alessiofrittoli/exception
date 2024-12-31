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