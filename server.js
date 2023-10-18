const app = require("./app");

//starting the server
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });

app.on("error", (err) => {
  console.error(`Server cannot start. Error: ${err.message}`);
  process.exit(1);
});


