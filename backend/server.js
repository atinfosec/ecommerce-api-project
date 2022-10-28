const path = require("path")
require("dotenv").config({path: path.resolve(__dirname,"../.env")});

const app = require("./app");
const databaseConnection = require("./config/database");

//uncaught exception handling
process.on("uncaughtException", (err) =>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
})

/**************************Connecting database**********************/
databaseConnection();


/**************************port listening**********************/
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
const server = app.listen(port, function(){
	console.log("Server has started on " + port);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);

  server.close(()=>{
    process.exit(1);
  })
})