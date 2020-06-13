# Store

A key-value store that persists on disk for Deno.

**Requires the `--allow-read` and `--allow-write` flags.**

## Usage

```ts
import { Store } from 'https://cdn.depjs.com/store/mod.ts'

const store = new Store()

await store.set('username', 'deno')

await store.get('username')
// --> deno

await store.set({
  username: 'acathur',
  age: 25
})

await store.delete('username')

await store.toObject()
// --> { age: 25 }

await store.clear()
```

You can also initialize a new `Store` with the given `name` and `path`.

```ts
const store = new Store('mystore')

// or
const store = new Store({
  name: 'cachedata',
  path: './store'
})
```

## API

- .set(key, value)
- .get(key)
- .has(key)
- .delete(key)
- .clear()
- .toObject()

## License

[MIT](https://github.com/Acathur/store/blob/master/LICENSE)

Copyright (c) 2020, Acathur
