const tailwindConfig = require('storefront/tailwind.config');

export const getBaseStyleTag = () => `
<script src="/occ-public/tailwind.js"></script>
<script>
  tailwind.config = ${JSON.stringify(tailwindConfig)};
</script>
<style></style>
`;
