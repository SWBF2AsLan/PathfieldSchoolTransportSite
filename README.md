# PathfieldSchoolTransportSite
A small, bespoke Node.js web server for the use of Pathfield School IT staff to facilitate pupil transport.

## Installation
These instructions will guide you through setting up the Pathfield School Transport Site.
This is a bespoke solution, and as such is not highly configurable; certain elements - namely the bus pages - have been hard-coded based on the given specification, though this may change in future.

### Prerequisites

- Node.js v14.6.1 or newer (https://nodejs.org/en/download/)

Please ensure that the npm package manager is installed as part of the Node installation (this is included by default).

### Setup
Extract all files to a destination of your choosing. Open command line and navigate to this destination (this folder should contain app.js along with the rest of the extracted files and folder structures) and run the following command:

`npm ci`

This will install all the dependencies needed to run the server.

The web server runs on port 3000 on the localhost (127.0.0.1) by default. The port can be changed by editing the following line in `./bin/www` using any text editor:

```xml
var port = normalizePort(process.env.PORT || '3000');
```

For example, the following change would result in the server running on port 8080.

```xml
var port = normalizePort(process.env.PORT || '8080');
```

The address can likewise be editing the following line `./bin/www`:

```xml
server.listen(port, "127.0.0.1");
```

For example, the following change would result in the server running at the address 123.123.123.123:

```xml
server.listen(port, "123.123.123.123");
```

## Running the server.

In order to start the server, from the installation location in command line, run the command:

`npm run serverstart`

Should you wish to run the server in development mode, which will send extra debugging information to the console window, instead run the command:

`npm run devstart`

Either of these commands can be used in a batch file for user convenience, provided the batch file is placed in or navigates to the installation directory.

### Logging
The web app's logs are stored in `./logs`.
- `server.log` contains full logs from the web app, including all HTTP traffic and debugging.
- `errors.log` contains any warnings or errors thrown by the web app.
- When the server is started in standard production mode, the console will display only `info` level messages, warnings and errors. When started in development mode it will display all `debug` level logs and below, including HTTP traffic logs.

## Authors

This project was written by Barnaby Webster (https://github.com/SWBF2AsLan).

## License

This project is licensed under the GNU Public License (GPL) - see the [LICENSE.md](LICENSE.md) file for details.
Licenses for all of this project's npm module dependencies can be found in the module's respective folder in `./node_modules/` after they have been installed.
