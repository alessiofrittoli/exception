# Exception 🚦

Version 1.0.0

## Handle errors with ease

This documentation describes the `Exception` class, which provides a structured way to handle errors in TypeScript. It includes custom properties such as `code`, `name`, and `status` for more detailed error reporting and debugging.

### Table of Contents

- [Getting started](#getting-started)
- [API Reference](#api-reference)
	- [ExceptionOptions Interface](#exceptionoptions-interface)
	- [Exception Class](#exception-class)
	- [Usage Scenarios](#usage-scenarios)
- [Development](#development)
	- [ESLint](#eslint)
	- [Jest](#jest)
- [Contributing](#contributing)
- [Security](#security)
- [Credits](#made-with-)

---

### Overview

The `Exception` class extends the native JavaScript `Error` object, adding customizable fields to improve error classification and handling. It also includes a static utility method to check if an object is an instance of the `Exception` class.

### Getting started

Run the following command to start using `@alessiofrittoli/exception` in your projects:

```bash
npm i @alessiofrittoli/exception
```

or using `pnpm`

```bash
pnpm i @alessiofrittoli/exception
```

---

### API Reference

#### `ExceptionOptions` Interface

The `ExceptionOptions` interface defines the optional parameters for the `Exception` class constructor.

##### Properties

| Property | Type     | Default     | Description                                                      |
|----------|----------|-------------|------------------------------------------------------------------|
| `code`   | `TCode`  | -           | (Required) A numeric or custom code representing the error type. |
| `name`   | `string` | `Exception` | (Optional) A string representing the error name.                 |
| `status` | `number` | -           | (Optional) An HTTP status code associated with the error.        |

---

#### `Exception` Class

The `Exception` class extends the `Error` object and implements the `ExceptionOptions` interface.

##### Constructor

The constructor initializes an `Exception` instance with a custom message and options.

###### Parameters

| Parameter | Type               | Description                                                     |
|-----------|--------------------|-----------------------------------------------------------------|
| `message` | `TMessage`         | (Required) The error message. Can be a string or a custom type. |
| `options` | `ExceptionOptions` | (Required) An object containing the error options.              |

###### Example

```ts
import Exception from '@alessiofrittoli/exception'

try {
	throw new Exception( 'Resource not found', {
		code	: 'ERRNOTFOUND',
		status	: 404,
	} )
} catch ( error ) {
	console.error( error )
}
```

##### Static Methods

###### `isException`

A utility method to check if an object is an instance of the `Exception` class.

###### Example

```ts
try {
	throw new Exception( 'Something went wrong', { code: 'ERRUNKNOWN' } )
} catch ( error ) {
	if ( Exception.isException( error ) ) {
		// we can safely access `Exception` properties
		console.error( `Error [${ error.code }]: ${ error.message }` )
	} else {
		console.error( error )
	}
}
```

---

#### Usage Scenarios

##### Custom Error Handling

The `Exception` class is ideal for creating domain-specific errors with additional metadata, such as error codes and HTTP statuses.

###### Example

```ts
enum ErrorCode
{
	EMPTY_VALUE	= 'ERREMPTYVALUE',
	WRONG_FORMAT= 'ERRWRONGFORMAT',
	EXPIRED		= 'ERREXPIRED',
	TOO_EARLY	= 'ERRTOOEARLY',
	NOT_ALLOWED	= 'ERRNOTALLOWED',
}

try {
	await fetch( ... )
} catch ( error ) {
	// error thrown by the server: Exception( 'Wrong value.', { code: ErrorCode.WRONG_FORMAT, status: 422 } )
	if ( Exception.isException<string, ErrorCode>( error ) ) {
		console.log( error.code ) // `error.code` is type of `ErrorCode`.
	}
}
```

---

### Development

#### Install depenendencies

```bash
npm install
```

or using `pnpm`

```bash
pnpm i
```

#### Build your source code

Run the following command to build code for distribution.

```bash
pnpm build
```

#### [ESLint](https://www.npmjs.com/package/eslint)

warnings / errors check.

```bash
pnpm lint
```

#### [Jest](https://npmjs.com/package/jest)

Run all the defined test suites by running the following:

```bash
# Run tests and watch file changes.
pnpm test

# Run tests and watch file changes with jest-environment-jsdom.
pnpm test:jsdom

# Run tests in a CI environment.
pnpm test:ci

# Run tests in a CI environment with jest-environment-jsdom.
pnpm test:ci:jsdom
```

You can eventually run specific suits like so:

```bash
pnpm test:jest
pnpm test:jest:jsdom
```

---

### Contributing

Contributions are truly welcome!\
Please refer to the [Contributing Doc](./CONTRIBUTING.md) for more information on how to start contributing to this project.

---

### Security

If you believe you have found a security vulnerability, we encourage you to **_responsibly disclose this and NOT open a public issue_**. We will investigate all legitimate reports. Email `security@alessiofrittoli.it` to disclose any security vulnerabilities.

### Made with ☕

<table style='display:flex;gap:20px;'>
	<tbody>
		<tr>
			<td>
				<img src='https://avatars.githubusercontent.com/u/35973186' style='width:60px;border-radius:50%;object-fit:contain;'>
			</td>
			<td>
				<table style='display:flex;gap:2px;flex-direction:column;'>
					<tbody>
						<tr>
							<td>
								<a href='https://github.com/alessiofrittoli' target='_blank' rel='noopener'>Alessio Frittoli</a>
							</td>
						</tr>
						<tr>
							<td>
								<small>
									<a href='https://alessiofrittoli.it' target='_blank' rel='noopener'>https://alessiofrittoli.it</a> |
									<a href='mailto:info@alessiofrittoli.it' target='_blank' rel='noopener'>info@alessiofrittoli.it</a>
								</small>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>