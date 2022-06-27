/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
const {app} = require('../../dist/server/main');

const port = process.env.PORT || 3008;

app.listen(port, '0.0.0.0', () => {
  console.warn(`Application is started on http://localhost:${port}/`);
});
