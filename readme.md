# A mocking server

This program listens to HTTP requests and returns the body it is sent. More information is found in the console.

## Installing

Locally:
`npm install http-request-inspector`

Globally:
`npm install -g http-request-inspector`

## Running

The inspector can be run from the command line:

`http-request-inspector`

Or using the API:

    import Api from "http-request-inspector";

    const a = new Api();
    a.port = 2000;
    a.endpoint = "/mirror"
    a.start(() => console.log("Listening for requests...));
