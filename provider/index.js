const { app, loadData } = require("./provider");

const port = 5000;

loadData();

app.listen(port, () => {
  console.log(`Users API listening on port ${port}`);
});
