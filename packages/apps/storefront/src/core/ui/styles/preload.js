const path = require('path');
const fs = require('fs');

export function getFontPreloadLinks() {
  const dir = path.join(process.cwd(), 'packages/apps/storefront/public/fonts');

  return fs.readdirSync(dir).map(font => {
    const ext = path.extname(font).substring(1).toLowerCase();

    return `<link rel="preload" href="/occ-public/fonts/${font}" as="font" type="font/${ext}">`;
  });
}
