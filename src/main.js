const { app } = require('./app/app');
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
