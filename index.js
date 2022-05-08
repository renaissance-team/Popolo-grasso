const {app} = require('./dist/main');

const port = process.env.PORT || 3008;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Application is started on localhost:', port);
});
