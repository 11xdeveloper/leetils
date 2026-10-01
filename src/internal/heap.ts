/**
 * A binary heap. `compare` orders items like `Array.prototype.sort`: the item
 * that sorts first is at the top.
 *
 * Shared by solutions; not exported from the package.
 */
export class Heap<T> {
	readonly #items: T[] = [];
	readonly #compare: (a: T, b: T) => number;

	constructor(compare: (a: T, b: T) => number, items: Iterable<T> = []) {
		this.#compare = compare;
		for (const item of items) this.push(item);
	}

	get size(): number {
		return this.#items.length;
	}

	/** The top item, without removing it. */
	peek(): T | undefined {
		return this.#items[0];
	}

	push(item: T): void {
		const items = this.#items;
		items.push(item);

		let i = items.length - 1;
		while (i > 0) {
			const parent = (i - 1) >> 1;
			if (!this.#before(i, parent)) break;
			this.#swap(i, parent);
			i = parent;
		}
	}

	/** Removes and returns the top item. */
	pop(): T | undefined {
		const items = this.#items;
		const top = items[0];
		const last = items.pop();
		if (items.length === 0 || last === undefined) return top;

		items[0] = last;
		let i = 0;
		for (;;) {
			const left = 2 * i + 1;
			const right = left + 1;
			let first = i;
			if (left < items.length && this.#before(left, first)) first = left;
			if (right < items.length && this.#before(right, first)) first = right;
			if (first === i) return top;
			this.#swap(i, first);
			i = first;
		}
	}

	#before(i: number, j: number): boolean {
		const a = this.#items[i];
		const b = this.#items[j];
		return a !== undefined && b !== undefined && this.#compare(a, b) < 0;
	}

	#swap(i: number, j: number): void {
		const items = this.#items;
		const temp = items[i];
		const other = items[j];
		if (temp === undefined || other === undefined) return;
		items[i] = other;
		items[j] = temp;
	}
}
