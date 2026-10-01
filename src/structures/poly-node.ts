/**
 * A polynomial term in a linked list, matching the `PolyNode` class
 * LeetCode provides for Add Two Polynomials Represented as Linked Lists.
 */
export class PolyNode {
	coefficient: number;
	power: number;
	next: PolyNode | null;

	constructor(coefficient?: number, power?: number, next?: PolyNode | null) {
		this.coefficient = coefficient ?? 0;
		this.power = power ?? 0;
		this.next = next ?? null;
	}
}

/**
 * Builds a polynomial list from LeetCode's format: one
 * `[coefficient, power]` pair per term.
 *
 * @example
 * polyListFromArray([[5, 3], [4, 1], [-7, 0]])?.next?.power; // 1
 */
export const polyListFromArray = (
	terms: readonly (readonly [coefficient: number, power: number])[],
): PolyNode | null => {
	let head: PolyNode | null = null;
	for (let i = terms.length - 1; i >= 0; i--) {
		const [coefficient, power] = terms[i] ?? [0, 0];
		head = new PolyNode(coefficient, power, head);
	}
	return head;
};

/**
 * Converts a polynomial list back into LeetCode's `[coefficient, power]`
 * format.
 *
 * @example
 * polyListToArray(polyListFromArray([[1, 1], [1, 0]])); // [[1, 1], [1, 0]]
 */
export const polyListToArray = (
	head: PolyNode | null,
): [coefficient: number, power: number][] => {
	const terms: [coefficient: number, power: number][] = [];
	for (let node = head; node !== null; node = node.next) {
		terms.push([node.coefficient, node.power]);
	}
	return terms;
};
