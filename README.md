# Storefront Boilerplate

Modelo de projeto para um e-commerce utilizando o OSF (Open Storefront Framework) da Oracle.

## Pré-requisitos do ambiente

- [Node.js 14.x](https://nodejs.org/dist/latest-v14.x)
- [Yarn 1.x](https://legacy.yarnpkg.com/docs/install)

## Gerenciador de pacotes

Configure o **npm** para acessar o pacote `@oracle-cx-commerce`.

```
npm config set @oracle-cx-commerce:registry https://oracle-cx-commerce-repository.occa.ocs.oraclecloud.com
```

### OCC

No ambiente local será necessário configurar uma conexão com o servidor remoto desejado, adicionando o arquivo `.occ/config.js` em seu workspace.

```js
module.exports = {
  httpHost: 'localhost',
  httpPort: 80,
  httpsHost: 'localhost',
  httpsPort: 443,
  sslKey: 'config/ssl/key.pem',
  sslCert: 'config/ssl/cert.pem',
  serverEnv: 'development',
  appName: 'storefront',
  dsAssetMode: 'local',
  verbose: false,
  live: false,
  appContext: 'development',
  userName: 'marlon',
  defaultCluster: 'storefront',
  backup: true,
  baseURI: '/',
  serverConfig: {
    development: {
      appServerAdmin: '', // URL do servidor de administração do ambiente
      appKey: '' // Chave do aplicativo usada para autenticar o acesso
    }
  }
};
```

## Dependências

Dependências externas devem ser instaladas na pasta do aplicativo, dentro de **packages/apps/storefront** e adicionadas no arquivo `rollup.config.js` (vetor extraExternals).

## Comandos

- `yarn install`: Instala as dependências do projeto.
- `yarn storybook`: Abre o catálogo de componentes.
- `yarn dev`: Inicia o servidor de aplicação de desenvolvimento.
- `yarn deploy`: Implanta o aplicativo no servidor remoto.
