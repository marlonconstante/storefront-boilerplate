# Configuring the OCC Workspace
*Updated May 3, 2019*

# The following values can be configured
|Name  | Description |  Default |
|--|--|--|
| **appName** | The application name to use when it hasn't been provided on the command line.| blank-store |
| **appServer** | The url for the OCC storefront instance.| http://localhost:8080 |
| **appServerAdmin** |  The url for the OCC admin instance. | http://localhost:9080 |
| **appKey** |  The application key used to authenticate admin access. | N/A |
| **httpHost** | The hostname for the http express server. | localhost |
| **httpPort** | The port used for receiving http requests on the express server. | 80 |
| **httpsHost** | The hostname for the https express server. | localhost |
| **httpsPort** | The port used for receiving http requests on the express server. | 443 |
| **sslKey** | The path to the ssl key file used for https. | config/ssl/key.pem |
| **sslCert** | The path to the ssl certificate file used for https. | config/ssl/cert.pem |
| **serverConfig** | A map OCC server configurations by name, which can then be targeted when using the occ cli. Typically there are three separate OCC environments used in the development lifecyle: development,test and production.  | N/A |
| **serverEnv**| The key to the serverConfig used to identify OCC servers when the application needs to communicate with the OCC servers. See also **serverConfig** | development |

 ## Example serverConfig
  ```sh
    serverConfig: {
      development: {
        appServer: 'http://your.development.server.com:8080/',
        appServerAdmin: 'http://your.development.server.com:9080/'
      },
      test: {
        appServer: 'http://your.test.server.com:8080/',
        appServerAdmin: 'http://your.test.server.com:9080/'
      },
      production: {
        appServer: 'http://your.production.server.com:8080/',
        appServerAdmin: 'http://your.production.server.com:9080/'
      }
    }
  ```

# How to specify configuration
Configuration can be specified using a number of sources as described below.

## Global workspace config
**config/index.js** - used to specify configuration values that are shared by all applications and developers using the workspace. In the case of a workspace with a single application and a single developer, this file could be used to specify all configuration.
In the case of multiple developers using the workspace, this file might contain OCC server settings that all the developers share.
This file should be tracked in source control so it's automatically
created on each developer's workspace when they check out.

## Developer specific workspace config
 **.occ/config.js** - used to override global values on a per developer workspace/workstation. For example, for a workspace with a single application and multiple developers, a developer could create this config to specify their uinque authentication key.

 This file is specific to a developer's workspace. And as with all files in the .occ folder, doesn't need be tracked by source control.
## Environment variables
Values can be specified as environment variables.

*ex. export OCC_APP_SERVER_ADMIN=http://acme.us.oracle.com:9080*

Here all the names that can be set as environment variables. Each one maps to the configuration descriptions above
|Environment var name  | Config  |
|--|--|
| OCC_APP_NAME | appName |
| OCC_APP_KEY | appKey |
| OCC_APP_SERVER | appServer|
| OCC_APP_SERVER_ADMIN | appServerAdmin|
| OCC_HTTP_HOST | httpHost |
| OCC_HTTP_PORT | httpPort |
| OCC_HTTPS_HOST | httpsHost |
| OCC_HTTPS_PORT | httpsPort |
| OCC_SSL_KEY | sslKey |
| OCC_SSL_CERT | sslCert |
| OCC_SERVER_ENV | serverEnv|



## Command line arguments.
The CLI accepts the configurable values as command line arguments.

*ex. yarn deploy --help

*ex. yarn deploy --serverEnv test*

*ex. yarn deploy --appServer http://your.development.server.com:8080*

*ex. occ deploy packages/apps/react-ref-app --appKey*

## Sample configuration js file
```sh
module.exports = {
  httpPort: 4040,
  appName: 'blank-store',
  serverEnv: 'test',
  serverConfig: {
    development: {
      appServer: 'http://your.development.server.com:8080/',
      appServerAdmin: 'http://your.development.server.com:9080/',
      appKey : 'vasdfDAEDVdfg.eyJzdWIiOiI2NzMyZjdiZS1kODQwLTRkOWItYWFiNi='
    },
    test: {
      appServer: 'http://your.test.server.com:8080/',
      appServerAdmin: 'http://your.test.server.com:9080/'.
      appKey : 'vasdfDAEDVdfg.DFSDeyJzdWIiOiI2NzMyZjd1kODQwLTRkOWItYWFiNi='
   },
    production: {
      appServer: 'http://your.production.server.com:8080/',
      appServerAdmin: 'http://your.production.server.com:9080/',
      appKey : 'vasdfDAEDVdfg.DFSDFSAFSDeyJzdWIiOiI2NzMyZjd1kODQwLItYWFiNi='
    }
  }
};

```
## Sample developer specfic config with an app key for the development environment
```sh
module.exports = {
  serverConfig: {
    development: {
      appKey : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwNDAwOWY5MC0xYjU2LTQ3N2UtYjE4My1ilY2JmNGZlMDIiLCJpc3MiOiJhcHBsaWNhdGlvbkF1dGgiLCJleHAiOjE1ODQxMDc0MDEsImlhdCI6MTU1MjU3MTQwMX0=.M7TuThXklDzEhaauOvapJfH6ba4y9CPl7/14rUKZym0='
    }
  }
};
```

## Using the CLI to configure
The CLI provides a command to configure the workspace.

The CLI can be used to configure the workspace for the first time or to modify configurations afterwards.

*ex. occ configure --appServerAdmin http://myserver.us.oracle.com:9080 --appKey*

It supports listing the current set of configurations for the workspace.

*ex. occ configure --list*

Here is the spec for the configure command:
```sh
Options:
  -V, --version           output the version number
  --verbose               Provides verbose logging where available
  --force                 If configuration already exists, this flag is needed to overwrite it with the new config.
  --appName <name>        The application name to use as the default.
  --appKey                With this option you will be prompted for an application key (OAuth access token)
  --appServer <url>       Application server URL
  --appServerAdmin <url>  Application admin server URL
  --serverEnv <env>       Cloud Commerce server environment to use
  --httpHost <host>       Presentation server hostname (http)
  --httpPort <port>       Presentation server port (http)
  --httpsHost <host>      Presentation server hostname (https)
  --httpsPort <port>      Presentation server port (https)
  --sslKey <path>         The path to the ssl key file used for https.
  --sslCert <path>        The path to the ssl cert file used for https.
  --list                  Displays the current configuration settings
  -h, --help              output usage information

Description:
  This command updates the workspace's configuration values.

  One or more of the options can be specifed. Previously set values are preserved.

  Note that the serverEnv option has no affect on this command.

Examples:
  $ occ configure --force --appName blank-store --appServerAdmin http://someserver.oracle.com:9080 --appKey
  $ occ configure --force --httpPort 5050 --httpsPort 5051
  $ occ configure --list
```



### For example, when running the cli for the first time without any options, the configuration will be initialized with the defaults.

*ex. occ configure*

```sh
[cli] info: {
  "production": false,
  "appServer": "http://localhost:8080",
  "appServerAdmin": "http://localhost:9080",
  "httpHost": "localhost",
  "httpPort": 80,
  "httpsHost": "localhost",
  "httpsPort": 443,
  "sslKey": "config/ssl/key.pem",
  "sslCert": "config/ssl/cert.pem",
  "serverEnv": "development",
  "appName": "blank-store",
  "serverConfig": {
    "development": {
      "appServerAdmin": "http://localhost:9080",
      "appServer": "http://localhost:8080"
    },
    "test": {
      "appServerAdmin": "http://testadminserver.com:9080",
      "appServer": "http://testserver.com:9080"
    },
    "production": {
      "appServerAdmin": "http://prodadminserver.com:9080",
      "appServer": "http://prodserver.com:9080"
    }
  },
  "appDir": "packages/apps/blank-store"
}
```

### You can specify configuration values with the cli. Note that the --force option is required to overwrite configuration that already exists.

*ex. occ configure --force --appServerAdmin http://myserver.us.oracle.com:9080 --appServer http://myserver.us.oracle.com:8080 --appKey

Please provide an appKey: dsfvsfdfsdfsdd=vfsdf *

```sh
[cli] info: {
  "production": false,
  "appServer": "http://myserver.us.oracle.com:8080",
  "appServerAdmin": "http://myserver.us.oracle.com:9080",
  "httpHost": "localhost",
  "httpPort": 80,
  "httpsHost": "localhost",
  "httpsPort": 443,
  "sslKey": "config/ssl/key.pem",
  "sslCert": "config/ssl/cert.pem",
  "serverEnv": "development",
  "appName": "blank-store",
  "serverConfig": {
    "development": {
      "appServerAdmin": "http://myserver.us.oracle.com:9080",
      "appServer": "http://myserver.us.oracle.com:8080",
      "appKey": "dsfvsfdfsdfsdd=vfsdf"
    },
    "test": {
      "appServerAdmin": "http://testadminserver.com:9080",
      "appServer": "http://testserver.com:9080"
    },
    "production": {
      "appServerAdmin": "http://prodadminserver.com:9080",
      "appServer": "http://prodserver.com:9080"
    }
  },
  "appKey": "dsfvsfdfsdfsdd=vfsdf",
  "appDir": "packages/apps/blank-store"
}
```

