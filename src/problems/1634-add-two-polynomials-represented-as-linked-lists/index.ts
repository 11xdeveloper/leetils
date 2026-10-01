import { PolyNode } from "../../structures/poly-node";

/**
 * 1634. Add Two Polynomials Represented as Linked Lists
 *
 * Both lists hold polynomial terms in strictly decreasing powers. Returns
 * their sum in the same form, leaving out zero terms.
 *
 * Merges the lists like sorted lists, adding coefficients of equal powers.
 * New nodes are built so the inputs stay intact.
 *
 * @see https://leetcode.com/problems/add-two-polynomials-represented-as-linked-lists/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * polyListToArray(addTwoPolynomialsRepresentedAsLinkedLists(polyListFromArray([[1, 1]]), polyListFromArray([[1, 0]]))); // [[1, 1], [1, 0]]
 */
export const addTwoPolynomialsRepresentedAsLinkedLists = (
	poly1: PolyNode | null,
	poly2: PolyNode | null,
): PolyNode | null => {
	const dummy = new PolyNode();
	let tail = dummy;
	let [a, b] = [poly1, poly2];
	while (a || b) {
		let [coefficient, power] = [0, 0];
		if (a && (!b || a.power >= b.power)) {
			[coefficient, power] = [a.coefficient, a.power];
			if (b && b.power === a.power) {
				coefficient += b.coefficient;
				b = b.next;
			}
			a = a.next;
		} else if (b) {
			[coefficient, power] = [b.coefficient, b.power];
			b = b.next;
		}
		if (coefficient === 0) continue;
		tail.next = new PolyNode(coefficient, power);
		tail = tail.next;
	}
	return dummy.next;
};
