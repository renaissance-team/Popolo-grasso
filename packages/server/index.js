/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
const {app} = require('../../dist/server/main');

const port = process.env.PORT || 3008;

// if (process.env.NODE_ENV !== 'production') {
//   const https = require('https');
//   const selfSigned = require('openssl-self-signed-certificate');

//   const options = {
//     key: selfSigned.key,
//     cert: selfSigned.cert
//   };

//   https.createServer(options, app).listen(port, '0.0.0.0', () => {
//     console.warn(`Application is started on https://localhost:${port}/`);
//   });
// } else {
app.listen(port, '0.0.0.0', () => {
  console.warn(`Application is started on http://localhost:${port}/`);
});
// }
