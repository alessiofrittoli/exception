export interface ExceptionOptions<TCode = number> extends ErrorOptions
{
	code	: TCode
	name?	: string
	status?	: number
}


class Exception<TMessage = string, TCode = number> extends Error implements ExceptionOptions<TCode>
{
	// @ts-expect-error Type 'TMessage' is not assignable to type 'string'.ts(2416)
	message: TMessage
	status
	name
	typename: 'Exception'
	code


	constructor( message: TMessage, options: ExceptionOptions<TCode> ) 
	{
		super( '', options )

		this.typename	= 'Exception'
		this.name		= options.name || this.typename
		this.message	= message
		this.code		= options.code
		this.status		= options.status
	}

	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static isException<TMessage = string, TCode = number>( error: any ): error is Exception<TMessage, TCode>
	{
		return (
			error instanceof Exception ||
			( typeof error === 'object' && 'typename' in error && error.typename === 'Exception' )
		)
	}
}


export default Exception