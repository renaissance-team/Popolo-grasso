module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'yarn test --bail --findRelatedTests --watchAll=false'],
  '*.{scss, css, sass}': ['stylelint --fix'],
  '*.{ts,tsx}': () => ['tsc -p tsconfig.json --noEmit'],
};
