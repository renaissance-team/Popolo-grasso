const {app} = require('../../dist/server/main');

const port = process.env.PORT || 3008;

app.listen(port, () => {
  console.warn(`Application is started on http://localhost:${port}/`);
});
