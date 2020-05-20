# Store

A key-value store that persists on disk for Deno.

**Requires the `--allow-read` and `--allow-write` flags.**

## Usage

```ts
import { Store } from 'https://deno.land/x/store/mod.ts'

const store = new Store()

await store.set('username', 'deno')

await store.get('username')
// --> deno

await store.set({
  username: 'acathur',
  age: 25
})

await store.toObject()
// --> { username: 'acathur', age: 25 }
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

## License

[MIT](https://github.com/Acathur/store/blob/master/LICENSE)

Copyright (c) 2020, Acathur
