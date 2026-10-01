/** A skiplist node, with one forward link per level it's on. */
interface SkiplistNode {
	val: number;
	next: (SkiplistNode | null)[];
}

const MAX_LEVELS = 16;

/**
 * 1206. Design Skiplist
 *
 * A sorted multiset of integers supporting `search`, `add` and `erase` (of
 * one copy, returning whether there was one).
 *
 * A skiplist: sorted linked lists stacked in levels, each node appearing on
 * the next level up with probability 1/2. A search starts at the top and
 * drops down a level whenever the next node would overshoot. `random` is
 * the source of randomness for choosing levels, `Math.random` by default.
 *
 * @see https://leetcode.com/problems/design-skiplist/
 * @difficulty Hard
 * @timeComplexity O(log n) expected per operation
 * @spaceComplexity O(n) expected
 *
 * @example
 * const skiplist = new DesignSkiplist();
 * skiplist.add(1);
 * skiplist.search(1); // true
 * skiplist.erase(1); // true
 * skiplist.search(1); // false
 */
export class DesignSkiplist {
	readonly #head: SkiplistNode = {
		val: -Infinity,
		next: new Array<SkiplistNode | null>(MAX_LEVELS).fill(null),
	};
	readonly #random: () => number;

	constructor(random: () => number = Math.random) {
		this.#random = random;
	}

	search(target: number): boolean {
		return this.#predecessors(target)[0]?.next[0]?.val === target;
	}

	add(num: number): void {
		const predecessors = this.#predecessors(num);
		let levels = 1;
		while (levels < MAX_LEVELS && this.#random() < 0.5) levels++;
		const node: SkiplistNode = { val: num, next: [] };
		for (let level = 0; level < levels; level++) {
			const before = predecessors[level] ?? this.#head;
			node.next[level] = before.next[level] ?? null;
			before.next[level] = node;
		}
	}

	erase(num: number): boolean {
		const predecessors = this.#predecessors(num);
		const node = predecessors[0]?.next[0];
		if (node?.val !== num) return false;
		for (let level = 0; level < node.next.length; level++) {
			const before = predecessors[level];
			if (before?.next[level] === node)
				before.next[level] = node.next[level] ?? null;
		}
		return true;
	}

	/** The last node before `value` on each level. */
	#predecessors(value: number): SkiplistNode[] {
		const predecessors = new Array<SkiplistNode>(MAX_LEVELS);
		let node = this.#head;
		for (let level = MAX_LEVELS - 1; level >= 0; level--) {
			for (
				let next = node.next[level];
				next && next.val < value;
				next = node.next[level]
			) {
				node = next;
			}
			predecessors[level] = node;
		}
		return predecessors;
	}
}
