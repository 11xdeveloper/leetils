/**
 * 386. Lexicographical Numbers
 *
 * Returns the numbers from 1 to `n` in lexicographic (dictionary) order, as
 * strings would sort, in O(n) time and O(1) extra space.
 *
 * Walks the numbers as a preorder traversal of the trie of their digits
 * without building it: from each number, the next is its first child
 * (times 10) if that fits; otherwise it moves to the next sibling (plus
 * one), first climbing up past any 9s or numbers beyond `n`.
 *
 * @see https://leetcode.com/problems/lexicographical-numbers/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * lexicographicalNumbers(13); // [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]
 */
export const lexicographicalNumbers = (n: number): number[] => {
	const order: number[] = [];
	let current = 1;

	for (let i = 0; i < n; i++) {
		order.push(current);
		if (current * 10 <= n) {
			current *= 10;
		} else {
			while (current % 10 === 9 || current + 1 > n)
				current = Math.floor(current / 10);
			current++;
		}
	}

	return order;
};
