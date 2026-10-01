import type { ListNode } from "../../structures/list-node";

/**
 * 382. Linked List Random Node
 *
 * Built from a linked list, returns the value of a uniformly random node on
 * each call to `getRandom`.
 *
 * Reservoir sampling, which answers the follow-up of a list too long to
 * store or of unknown length: walking the list, the `i`th node replaces the
 * pick so far with probability `1 / i`, which leaves every node equally
 * likely without copying the list. `random` is the source of randomness,
 * `Math.random` by default.
 *
 * @see https://leetcode.com/problems/linked-list-random-node/
 * @difficulty Medium
 * @timeComplexity O(n) per call
 * @spaceComplexity O(1)
 *
 * @example
 * const picker = new LinkedListRandomNode(listFromArray([1, 2, 3]));
 * picker.getRandom(); // 1, 2 or 3, each with probability 1/3
 */
export class LinkedListRandomNode {
	readonly #head: ListNode | null;
	readonly #random: () => number;

	constructor(head: ListNode | null, random: () => number = Math.random) {
		this.#head = head;
		this.#random = random;
	}

	getRandom(): number {
		let chosen = this.#head?.val ?? 0;
		let seen = 0;
		for (let node = this.#head; node; node = node.next) {
			seen++;
			if (this.#random() * seen < 1) chosen = node.val;
		}
		return chosen;
	}
}
