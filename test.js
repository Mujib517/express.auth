
let http = require('http');

let os = require('os').cpus();
let cluster = require('cluster');


if (cluster.isMaster) {
    console.log(`master is running on ${process.pid}`)
    for (let i = 0; i < 2; i++) {
        cluster.fork();
    }
}
else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world\n' + process.pid);
    }).listen(8000);

    console.log(`Worker ${process.pid} started`);
}

cluster.on('exit', (worker, code, signal) => console.log(`worker ${worker.process.pid} died`));



// var server = http.createServer(handle);

// function handle(req, response) {

//     let request = http.get('http://jsonplaceholder.typicode.com/users', res => {

//         res.on('data', data => {
//             response.write(data);
//             response.end();
//         });

//     });

//     request.on('error', err => console.log(err));
// }


// server.listen(4000);


// const server = require('net').createServer();

// server.on('connection', socket => {
//     console.log('client connected');
//     socket.write('hello');

//     socket.on('end', () => {
//         console.log('client disconnected');
//     });
// });

// server.listen(4000, () => console.log('server connected'));




// process.on('uncaughtException', (err) => {

// });

// console.log(module);

//process.stdin.resume();