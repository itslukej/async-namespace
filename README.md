# async-namespace

```js
import Namespace from 'async-namespace';

const ctx = new Namespace;
```

simple example:
```js

const log = (...args) => console.log(ctx.get('userid'), args);

server.use(() => {
  // some auth logic..
  ctx.set('user', new User({...}));
  ctx.set('userid', 123456789123456789);

  log('auth finished'); // => 123456789123456789 ['auth finished']
});

server.get('/cpu/work', event => {
  log('very big cpu work!! :)'); // => 123456789123456789 ['very big cpu work!! :)']
});
```

```js
const ctx = new Namespace;

// safe methods
ctx.get(key); // Map.prototype.get
ctx.set(key, value); // Map.prototype.set (returns value)

ctx.keys(); // Map.prototype.keys
ctx.clear(); // Map.prototype.clear
ctx.values(); // Map.prototype.values
ctx.entries(); // Map.prototype.entries
ctx.delete(key); // Map.prototype.delete

// unsafe underlaying map access
ctx.map // => Map | undefined


ctx.destroy() // destroys the async hook and all maps
```
