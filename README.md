<h1 align="center">Exception 🚦</h1>
<h2 align="center">
  Handle errors with ease
</h2>
<p align="center">
This documentation describes the <code>Exception</code> class, which provides a structured way to handle errors in TypeScript. It includes custom properties such as <code>code</code>, <code>name</code>, and <code>status</code> for more detailed error reporting and debugging.
</p>
<p align="center">
  <a href="https://npmjs.org/package/@alessiofrittoli/exception">
    <img src="https://img.shields.io/npm/v/@alessiofrittoli/exception" alt="Latest version"/>
  </a>
  <a href="https://coveralls.io/github/alessiofrittoli/node-scripts">
    <img src="https://coveralls.io/repos/github/alessiofrittoli/node-scripts/badge.svg" alt="Test coverage"/>
  </a>
  <a href="https://socket.dev/npm/package/@alessiofrittoli/exception/overview">
    <img src="https://socket.dev/api/badge/npm/package/@alessiofrittoli/exception" alt="Socket Security score"/>
  </a>
  <a href="https://npmjs.org/package/@alessiofrittoli/exception">
    <img src="https://img.shields.io/npm/dm/@alessiofrittoli/exception.svg" alt="npm downloads"/>
  </a>
  <a href="https://bundlephobia.com/package/@alessiofrittoli/exception">
    <img src="https://badgen.net/bundlephobia/dependency-count/@alessiofrittoli/exception" alt="Dependencies"/>
  </a>
  <a href="https://libraries.io/npm/%40alessiofrittoli%2Fnode-scripts">
    <img src="https://img.shields.io/librariesio/release/npm/@alessiofrittoli/exception" alt="Dependencies status"/>
  </a>
</p>
<p align="center">
  <a href="https://bundlephobia.com/package/@alessiofrittoli/exception">
    <img src="https://badgen.net/bundlephobia/min/@alessiofrittoli/exception" alt="minified"/>
  </a>
  <a href="https://bundlephobia.com/package/@alessiofrittoli/exception">
    <img src="https://badgen.net/bundlephobia/minzip/@alessiofrittoli/exception" alt="minizipped"/>
  </a>
  <a href="https://bundlephobia.com/package/@alessiofrittoli/exception">
    <img src="https://badgen.net/bundlephobia/tree-shaking/@alessiofrittoli/exception" alt="Tree shakable"/>
  </a>
</p>
<p align="center">
  <a href="https://github.com/sponsors/alessiofrittoli">
    <img src="https://img.shields.io/static/v1?label=Fund%20this%20package&message=%E2%9D%A4&logo=GitHub&color=%23DB61A2" alt="Fund this package"/>
  </a>
</p>

[sponsor-badge]: https://img.shields.io/static/v1?label=Fund%20this%20package&message=%E2%9D%A4&logo=GitHub&color=%23DB61A2
[sponsor-url]: https://github.com/sponsors/alessiofrittoli

### Table of Content

- [Getting started](#getting-started)
- [Development](#development)
  - [Local development](#local-development)
  - [Production build](#production-build)
  - [Unit tests](#unit-tests)
    - [Run tests with coverage](#run-tests-with-coverage)
  - [Contributing](#contributing)
  - [Security](#security)
- [API Reference](#api-reference)
  - [ExceptionOptions Interface](#exceptionoptions-interface)
  - [Exception Class](#exception-class)
  - [AbortError Class](#aborterror-class)
    - [AbortError Usage Scenarios](#aborterror-usage-scenarios)
  - [`ErrorCode` enum](#errorcode-enum)
  - [Examples](#examples)
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

### Development

Run the following to start development

```shell
nvm use

pnpm i
```

#### Local development

Run the following

```shell
pnpm dev
```

This will generate unminified output code, sourcemaps and will enable source file watcher.

---

#### Production build

Run the following to create a local production build

```shell
pnpm build
```

This will generate minified output code without sourcemaps.

---

#### Unit tests

Run all the defined test suites by running the following:

```shell
# Run tests and watch file changes.
pnpm test:watch

# Run tests in a CI environment.
pnpm test:ci
```

---

##### Run tests with coverage

An HTTP server is then started to serve coverage files from `./coverage` folder.

⚠️ You may see a blank page the first time you run this command. Simply refresh the browser to see the updates.

```shell
pnpm test:coverage:serve
```

---

#### Contributing

Contributions are truly welcome!

Please refer to the [Contributing Doc](./CONTRIBUTING.md) for more information on how to start contributing to this project.

Help keep this project up to date with [GitHub Sponsor][sponsor-url].

[![GitHub Sponsor][sponsor-badge]][sponsor-url]

---

#### Security

If you believe you have found a security vulnerability, we encourage you to **_responsibly disclose this and NOT open a public issue_**. We will investigate all legitimate reports. Email `security@alessiofrittoli.it` to disclose any security vulnerabilities.

---

### API Reference

#### `ExceptionOptions` Interface

The `ExceptionOptions` interface defines the optional parameters for the `Exception` class constructor.

##### Properties

| Property | Type     | Default     | Description                                                      |
| -------- | -------- | ----------- | ---------------------------------------------------------------- |
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
| --------- | ------------------ | --------------------------------------------------------------- |
| `message` | `TMessage`         | (Required) The error message. Can be a string or a custom type. |
| `options` | `ExceptionOptions` | (Required) An object containing the error options.              |

###### Example

```ts
import { Exception } from '@alessiofrittoli/exception'

try {
  throw new Exception('Resource not found', {
    code: 'ERR:NOTFOUND',
    status: 404,
  })
} catch (error) {
  console.error(error)
}
```

##### Static Methods

###### `isException`

A utility method to check if an object is an instance of the `Exception` class.

It supports also a JSON representation of the `Exception` class (commonly returned by server responses).

###### Example

```ts
try {
  throw new Exception('Something went wrong', { code: 'ERR:UNKNOWN' })
} catch (error) {
  if (Exception.isException(error)) {
    // we can safely access `Exception` properties
    console.error(`Error [${error.code}]: ${error.message}`)
  } else {
    console.error(error)
  }
}
```

```ts
/** Simulates JSON Exception returned by a server JSON Response. */
const error = JSON.parse(
  JSON.stringify(
    new Exception('Exception with custom name.', {
      code: 0,
      name: 'AbortError',
    }),
  ),
)

console.log(Exception.isException(error)) // Outputs: true
```

---

#### `AbortError` Class

The `AbortError` class extends the [`Exception` Class](#exception-class) and offers a preset configuration for easier usage.

##### Constructor

The constructor initializes an `AbortError` instance with a custom message and options.

###### Parameters

| Parameter | Type                | Description                                                                                                                                                                                                                            |
| --------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `message` | `TMessage`          | (Required) The error message. Can be a string or a custom type.                                                                                                                                                                        |
| `options` | `AbortErrorOptions` | (Optional) An object containing the error options. It extends the [`ExceptionOptions` Interface](#exceptionoptions-interface) and omit the `name` property. The `code` defaults to `ErrorCode.ABORT` but can be optionally customized. |

---

##### AbortError Usage Scenarios

###### Precise Abort Errors Handling

```ts
import { AbortError } from '@alessiofrittoli/exception/abort'

try {
  const controller = new AbortController()
  const { signal } = controller

  button.addEventListener( 'click', () => {
    controller.abort( new AbortError( 'User cancelled the request.' ) )
  } )

  await fetch( ..., { signal } )
} catch ( error ) {

  if ( AbortError.isException( error ) ) {
    if ( AbortError.isAbortError( error ) ) {
      // handle abort error
      console.log( error.code ) // `error.code` is type of `ErrorCode.ABORT`.
      return
    }
    // handle other Exception errors
    return
  }
  // handle other unknown errors

}
```

---

###### Using custom Abort Error codes

```ts
import { AbortError } from '@alessiofrittoli/exception/abort'

enum CustomAbortCode
{
  CUSTOM_CODE = 'ERR:CUSTOM_ABORT_CODE',
}

try {
  const controller = new AbortController()
  const { signal } = controller

  button.addEventListener( 'click', () => {
    controller.abort(
      new AbortError( 'User cancelled the request.', { code: CustomAbortCode.CUSTOM_CODE } )
    )
  } )

  await fetch( ..., { signal } )
} catch ( error ) {

  if ( AbortError.isException( error ) ) {
    if ( AbortError.isAbortError( error, CustomAbortCode.CUSTOM_CODE ) ) {
      // handle abort error
      console.log( error.code ) // `error.code` is type of `CustomAbortCode.CUSTOM_CODE`.
      return
    }
    // handle other Exception errors
    return
  }
  // handle other unknown errors

}
```

---

#### `ErrorCode` enum

The `ErrorCode` enum is a utility that provides pre-defined constants for the most common error codes.\
It is designed to simplify error handling and improve feedback quality returned to the user.

<details>

<summary>Constants Overview</summary>

| Constant        | Value                      | Description                                                                  |
| --------------- | -------------------------- | ---------------------------------------------------------------------------- |
| `UNKNOWN`       | `ERR:UNKNOWN`              | Returned when an unexpected error occured.                                   |
| `ABORT`         | `ERR:ABORT`                | Returned when user abort the request.                                        |
| `EMPTY_VALUE`   | `ERR:EMPTYVALUE`           | Returned when a required value is "falsy".                                   |
| `WRONG_VALUE`   | `ERR:WRONGVALUE`           | Return when a required value is not the expected value.                      |
| `EXPIRED`       | `ERR:EXPIRED`              | Returned when a requested has been performed too late.                       |
| `TOO_EARLY`     | `ERR:TOOEARLY`             | Returned when a request has been performed too early.                        |
| `TOO_MANY`      | `ERR:TOOMANY`              | Could be return in combination with a 429 Too Many Requests Response Status. |
| `QUOTA_REACHED` | `ERR:QUOTAREACHED`         | Returned when a specific quota has been reached.                             |
| `NOT_FOUND`     | `ERR:NOTFOUND`             | Returned when a resource cannot be found.                                    |
| `OFFLINE`       | `ERR:INTERNETDISCONNECTED` | Could be used to throw errors when user is offline.                          |

</details>

---

<details>

<summary>Extending the `enum` in your project</summary>

For obvious reasons the default `ErrorCode` provided by this library might be not enough to cover all the error cases in your project.

To fill this gap, you can "extend" the `ErrorCode` enum by doing so:

```ts
// myproject/src/error-code.ts
import { ErrorCode as Exception } from '@alessiofrittoli/exception/code'

/** Your project custom `ErrorCode`. */
export const MyProjectErrorCode = {
  INVALID_SIGN: 'ERR:INVALIDSIGN',
} as const

export const ErrorCode = { ...Exception, ...MyProjectErrorCode }
export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode]
```

</details>

---

#### Examples

##### Using the default `ErrorCode` to throw a new `Exception`

```ts
import { ErrorCode } from '@alessiofrittoli/exception/code'
import { Exception } from '@alessiofrittoli/exception'

throw new Exception('Password is a required field to log you in.', {
  code: ErrorCode.EMPTY_VALUE,
  status: 422,
})
```

##### Using custom `ErrorCode` to throw a new `Exception`

```ts
import { Exception } from '@alessiofrittoli/exception'
import { ErrorCode } from '@/error-code' // previously created in `myproject/src/error-code.ts` (see - Extending the `enum` in your project)

throw new Exception('Invalid signature.', {
  code: ErrorCode.INVALID_SIGN,
  status: 403,
})
```

##### Using `ErrorCode` to handle errors

```ts
import { ErrorCode } from '@/error-code' // previously created in `myproject/src/error-code.ts` (see - Extending the `enum` in your project)

try {
  ...
} catch ( error ) {
  if ( Exception.isException<string, ErrorCode>( error ) ) {
    switch ( error.code ) { // `error.code` is now type of `ErrorCode` (custom).
      case ErrorCode.INVALID_SIGN:
        console.log( 'The signature is not valid.' )
        break
      case ErrorCode.Exception.UNKNOWN:
      default:
        console.log( 'Unexpected error occured.' )
    }
  }
}
```

---

### Development

#### Install dependencies

```bash
npm install
```

or using `pnpm`

```bash
pnpm i
```

#### Build the source code

Run the following command to test and build code for distribution.

```bash
pnpm build
```

#### [ESLint](https://www.npmjs.com/package/eslint)

Run warnings and errors checks.

```bash
pnpm lint
```

#### [Jest](https://npmjs.com/package/jest)

Run all the defined test suites by running the following:

```bash
# Run tests and watch file changes.
pnpm test:watch

# Run tests in a CI environment.
pnpm test:ci
```

- See [`package.json`](./package.json) file scripts for more info.

Run tests with coverage.

An HTTP server is then started to serve coverage files from `./coverage` folder.

⚠️ You may see a blank page the first time you run this command. Simply refresh the browser to see the updates.

```bash
test:coverage:serve
```

---

### Contributing

Contributions are truly welcome!

Please refer to the [Contributing Doc](./CONTRIBUTING.md) for more information on how to start contributing to this project.

Help keep this project up to date with [GitHub Sponsor][sponsor-url].

[![GitHub Sponsor][sponsor-badge]][sponsor-url]

---

### Security

If you believe you have found a security vulnerability, we encourage you to **_responsibly disclose this and NOT open a public issue_**. We will investigate all legitimate reports. Email `security@alessiofrittoli.it` to disclose any security vulnerabilities.

### Made with ☕

<table style='display:flex;gap:20px;'>
  <tbody>
    <tr>
      <td>
        <img alt="avatar" src='https://avatars.githubusercontent.com/u/35973186' style='width:60px;border-radius:50%;object-fit:contain;'>
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
