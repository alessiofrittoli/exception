export interface ExceptionOptions<TCode = number> extends ErrorOptions
{
	code	: TCode
	name?	: string
	status?	: number
}


class Exception<TCode = number> extends Error implements ExceptionOptions<TCode>
{
	status
	name
	code


	constructor( message: string, options: ExceptionOptions<TCode> ) 
	{
		super( message, options )

		this.name		= options.name || 'Exception'
		this.message	= message
		this.code		= options.code
		this.status		= options.status
	}

	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static isException<TCause = number>( error: any ): error is Exception<TCause>
	{
		return error instanceof Exception
	}
}


export default Exception