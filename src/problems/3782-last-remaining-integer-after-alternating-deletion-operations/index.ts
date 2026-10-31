/**
 * 3782. Last Remaining Integer After Alternating Deletion Operations
 *
 * Starting with 1 to `n`, alternately delete every second number counting
 * from the left (keeping the first) and every second number counting from
 * the right (keeping the last), until one is left. Returns it.
 *
 * The survivors always form an arithmetic sequence, so track its first
 * term, step and length. A left pass keeps the first term; a right pass
 * keeps the last, which also keeps the first only when the length is odd.
 *
 * @see https://leetcode.com/problems/last-remaining-integer-after-alternating-deletion-operations/
 * @difficulty Hard
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * lastRemainingIntegerAfterAlternatingDeletionOperations(8); // 3
 */
export const lastRemainingIntegerAfterAlternatingDeletionOperations = (
	n: number,
): number => {
	let [first, step, length] = [1, 1, n];
	for (let fromLeft = true; length > 1; fromLeft = !fromLeft) {
		if (!fromLeft && length % 2 === 0) first += step;
		step *= 2;
		length = Math.ceil(length / 2);
	}
	return first;
};
