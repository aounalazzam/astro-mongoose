# Astro Plugin Mongoose

`astro-mongoose` is a plugin for integrating Mongoose with your Astro project, enabling seamless MongoDB connections and enhanced Developer Experience (DX) features.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Example](#basic-example)
  - [Advanced Configuration](#advanced-configuration)
- [Options](#options)
- [Connection Lifecycle](#connection-lifecycle)
- [Error Handling](#error-handling)
- [License](#license)

## Features

- **Easy MongoDB Connection**: Quickly connect to MongoDB using Mongoose in astro project.
- **Configurable Options**: Customize connection parameters with ease.
- **Automatic Connection Management**: Handles reconnections and disconnections automatically.
- **Detailed Logging**: Get clear and descriptive logs for connection states.
- **Graceful Shutdown**: Cleans up connections properly on server shutdown or interruption.
- **Error Handling**: Provides meaningful error messages for connection issues.

## Installation

You can install the plugin via npm:

```bash
npm install astro-mongoose mongoose
```

## Usage

### Basic Example

To get started, add `astro-mongoose` in astro config file

```typescript
import mongoose from "astro-mongoose";

export default {
  integrations: [
    mongoose(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
};
```

### Advanced Configuration

You can customize the connection with additional options:

```typescript
import mongoose from "astro-mongoose";
import type { ConnectOptions } from "mongoose";

const mongooseOptions: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default {
  integrations: [mongoose(process.env.MONGODB_URI, mongooseOptions)],
};
```

## Options

| Option    | Type             | Description                                        |
| --------- | ---------------- | -------------------------------------------------- |
| `uri`     | `string`         | The MongoDB connection string (required).          |
| `options` | `ConnectOptions` | Additional Mongoose connection options (optional). |

## Connection Lifecycle

The plugin automatically manages the MongoDB connection lifecycle:

- Connects when the Astro server starts.
- Closes the connection gracefully on server stop or interruption.
- Logs connection status and any errors.

## Error Handling

The plugin throws an error if the MongoDB URI is not provided during initialization. Custom error messages are logged during connection attempts and when closing the connection.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
