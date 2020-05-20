import { join } from 'https://deno.land/std/path/mod.ts'
import { mkdir } from './utils.ts'

export interface StoreOptions {
	name?: string
	path?: string
}

export class Store {
	public name: string
	public path: string

	private filePath: string
	private dirExists: boolean
	private data: any

	constructor(opts?: string | StoreOptions) {
		if (typeof opts === 'string') {
			opts = {
				name: opts
			}
		}

		const {
			name = '.datastore',
			path = '.'
		} = opts || {}

		this.name = name
		this.path = path.startsWith('/') ? path : join(Deno.cwd(), path)
		this.filePath = join(this.path, name)
		this.dirExists = false
	}

	private async load() {
		let data = this.data

		if (data) {
			return data
		}

		try {
			data = JSON.parse(new TextDecoder().decode(await Deno.readFile(this.filePath)))
			this.dirExists = true
		}
		catch (e) {
			if (e.name !== 'NotFound') {
				throw e
			}
		}

		data = data || {}
		this.data = data

		return data
	}

	private async save() {
		const { data, filePath } = this

		if (!data || !Object.keys(data).length) {
			return
		}

		if (!this.dirExists) {
			await mkdir(this.path)
		}

		try {
			await Deno.writeFile(filePath, new TextEncoder().encode(JSON.stringify(data)), {
				mode: 0o0600
			})
		}
		catch (e) {
			throw e
		}
	}

	async get (key: string) {
		this.load()

		return this.data[key]
	}

	async set (key: string | { [key: string]: any }, val?: any) {
		this.load()

		let dataChanged = false

		if (typeof key === 'string') {
			const oldVal = this.data[key]

			if (oldVal !== val) {
				this.data[key] = val
				dataChanged = true
			}
		}
		else {
			const keys = Object.keys(key)

			for (const k of keys) {
				const oldVal = this.data[k]
				const val = key[k]

				if (oldVal !== val) {
					this.data[k] = val
					dataChanged = true
				}
			}
		}

		if (dataChanged) {
			this.save()
		}
	}

	async has(key: string) {
		this.load()

		return !!this.data[key]
	}

	async toObject() {
		return this.data || this.load()
	}
}
