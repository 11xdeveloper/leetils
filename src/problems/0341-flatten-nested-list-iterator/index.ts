import type { NestedInteger } from "../../structures/nested-integer";

/**
 * 341. Flatten Nested List Iterator
 *
 * Iterates over every integer in a nested list, in order, as if it were
 * flattened.
 *
 * Keeps a stack of the items still to visit, top of the stack first. When
 * asked whether there's a next integer, it opens lists at the top of the
 * stack until an integer is there (or the stack is empty). Lists are only
 * opened as the iteration reaches them, not all up front.
 *
 * @see https://leetcode.com/problems/flatten-nested-list-iterator/
 * @difficulty Medium
 * @timeComplexity O(1) on average per call
 * @spaceComplexity O(n)
 *
 * @example
 * const iterator = new FlattenNestedListIterator(nestedListFromArray([[1, 1], 2, [1, 1]]));
 * // next() returns 1, 1, 2, 1, 1
 */
export class FlattenNestedListIterator {
	readonly #stack: NestedInteger[];

	constructor(nestedList: readonly NestedInteger[]) {
		this.#stack = nestedList.toReversed();
	}

	hasNext(): boolean {
		for (
			let top = this.#stack.at(-1);
			top && !top.isInteger();
			top = this.#stack.at(-1)
		) {
			this.#stack.pop();
			this.#stack.push(...top.getList().toReversed());
		}
		return this.#stack.length > 0;
	}

	/** Returns the next integer. There must be one. */
	next(): number {
		this.hasNext();
		return this.#stack.pop()?.getInteger() ?? 0;
	}
}
