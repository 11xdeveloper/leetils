import { Heap } from "../../internal/heap";

/**
 * 716. Max Stack
 *
 * A stack that can also find and remove its largest element: `push`,
 * `pop`, `top`, `peekMax`, and `popMax`, which removes the topmost of the
 * largest elements.
 *
 * Every element gets an increasing ID. A stack and a max-heap (ordered by
 * value, then by ID so the topmost wins ties) hold the same entries.
 * Removing from one only marks the ID as gone; the other drops marked
 * entries when they reach its top.
 *
 * @see https://leetcode.com/problems/max-stack/
 * @difficulty Hard
 * @timeComplexity O(log n) amortised per operation, O(1) amortised for top
 * @spaceComplexity O(n)
 *
 * @example
 * const stack = new MaxStack();
 * stack.push(5);
 * stack.push(1);
 * stack.push(5);
 * stack.popMax(); // 5, the topmost one
 * stack.top(); // 1
 */
export class MaxStack {
	readonly #stack: [value: number, id: number][] = [];
	readonly #heap = new Heap<[value: number, id: number]>(
		(a, b) => b[0] - a[0] || b[1] - a[1],
	);
	readonly #removed = new Set<number>();
	#nextId = 0;

	push(x: number): void {
		const entry: [number, number] = [x, this.#nextId++];
		this.#stack.push(entry);
		this.#heap.push(entry);
	}

	pop(): number {
		this.#clean();
		const [value, id] = this.#stack.pop() ?? [0, -1];
		this.#removed.add(id);
		return value;
	}

	top(): number {
		this.#clean();
		return this.#stack.at(-1)?.[0] ?? 0;
	}

	peekMax(): number {
		this.#clean();
		return this.#heap.peek()?.[0] ?? 0;
	}

	popMax(): number {
		this.#clean();
		const [value, id] = this.#heap.pop() ?? [0, -1];
		this.#removed.add(id);
		return value;
	}

	#clean(): void {
		while (
			this.#stack.length > 0 &&
			this.#removed.has(this.#stack.at(-1)?.[1] ?? -1)
		)
			this.#stack.pop();
		while (
			this.#heap.size > 0 &&
			this.#removed.has(this.#heap.peek()?.[1] ?? -1)
		)
			this.#heap.pop();
	}
}
