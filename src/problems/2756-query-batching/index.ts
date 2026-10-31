interface Request {
	readonly key: string;
	readonly resolve: (value: string) => void;
	readonly reject: (reason: unknown) => void;
}

/**
 * 2756. Query Batching
 *
 * Batch single-key lookups into calls of `queryMultiple(keys)`, which
 * resolves with one value per key. A `getValue` call outside a cooldown is
 * sent on its own at once and starts a `t` millisecond cooldown. Calls
 * during a cooldown are held, and when it ends they're sent together and
 * start the next cooldown. Each `getValue` promise settles with its key's
 * value, or rejects if its batch does.
 *
 * Like throttling: queue the held requests, and have each cooldown's timer
 * flush the queue and start another cooldown if it wasn't empty.
 *
 * @see https://leetcode.com/problems/query-batching/
 * @difficulty Hard
 * @timeComplexity O(1) per `getValue`, plus O(b) per batch of b keys
 * @spaceComplexity O(b)
 *
 * @example
 * const batcher = new QueryBatching(async (keys) => keys.map((k) => `${k}!`), 100);
 * await batcher.getValue("a"); // "a!"
 */
export class QueryBatching {
	readonly #queryMultiple: (keys: string[]) => Promise<readonly string[]>;
	readonly #t: number;
	#cooling = false;
	#held: Request[] = [];

	constructor(
		queryMultiple: (keys: string[]) => Promise<readonly string[]>,
		t: number,
	) {
		this.#queryMultiple = queryMultiple;
		this.#t = t;
	}

	getValue(key: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const request = { key, resolve, reject };
			if (this.#cooling) this.#held.push(request);
			else this.#send([request]);
		});
	}

	#send(requests: readonly Request[]): void {
		this.#queryMultiple(requests.map(({ key }) => key)).then(
			(values) =>
				requests.forEach(({ resolve }, i) => {
					resolve(values[i] ?? "");
				}),
			(reason) =>
				requests.forEach(({ reject }) => {
					reject(reason);
				}),
		);
		this.#cooling = true;
		setTimeout(() => {
			this.#cooling = false;
			const held = this.#held;
			this.#held = [];
			if (held.length > 0) this.#send(held);
		}, this.#t);
	}
}
