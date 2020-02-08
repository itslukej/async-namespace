import NP from './namespace.mjs';
import { createServer } from 'http';

const context = new NP;

createServer((req, res) => {
  if (req.url === '/1') {
    context.set('user', 1);
    console.log(1, context.get('user'));
    console.log(1, context.keys());
    console.log(1, context.map);
    console.log(1, context.clear());
    console.log(1, context.map);
  }

  if (req.url === '/3') {
    console.log(context);
    console.log('3', context.get('user'));
  }

  if (req.url === '/2') {
    console.log(context);
  }

  res.end();
}).listen(8080);
