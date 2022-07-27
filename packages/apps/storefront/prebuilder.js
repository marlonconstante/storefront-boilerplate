/* eslint-disable no-template-curly-in-string */
const replace = require('replace-in-file');

replace({
  files: 'node_modules/@oracle-cx-commerce/builder/esbuild/index.js',
  from: /entryPoints: \['src\/client.js'\]/g,
  to: "entryPoints: ['src/client.js', 'public/styles/tailwind.css']"
});

replace({
  files: 'node_modules/@oracle-cx-commerce/builder/esbuild/plugins/externalize.js',
  from: /external: true/g,
  to: 'external: false'
});

replace({
  files: 'node_modules/tailwindcss/lib/cli.js',
  from: /result.css/g,
  to: '`/*\\nLast build time: ${new Date().toISOString()}\\n*/\\n\\n${result.css}`'
});
