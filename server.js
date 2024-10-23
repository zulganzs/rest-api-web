require("./settings");
const http = require("http");
const app = require("./index");
const port = process.env.PORT || 3001;
//const host = 'localhost';

http.createServer(app).listen(port, () => {
    console.log(`
ZUL REST APIs
Server running on port ${port}`)
console.log(`Hello ${creator}`)
})
