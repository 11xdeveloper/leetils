/**
 * 1718. Construct the Lexicographically Largest Valid Sequence
 *
 * Returns the largest sequence in which 1 appears once and every `i` from
 * 2 to `n` appears twice, exactly `i` positions apart.
 *
 * Backtracking: fill positions left to right, trying the largest unused
 * number first and placing its second copy `i` positions later. The first
 * complete sequence found is the largest.
 *
 * @see https://leetcode.com/problems/construct-the-lexicographically-largest-valid-sequence/
 * @difficulty Medium
 * @timeComplexity O(n!) in the worst case, fast in practice
 * @spaceComplexity O(n)
 *
 * @example
 * constructTheLexicographicallyLargestValidSequence(3); // [3, 1, 2, 3, 2]
 */
export const constructTheLexicographicallyLargestValidSequence = (
	n: number,
): number[] => {
	const sequence = new Array<number>(2 * n - 1).fill(0);
	const used = new Array<boolean>(n + 1).fill(false);
	const fill = (position: number): boolean => {
		if (position === sequence.length) return true;
		if (sequence[position] !== 0) return fill(position + 1);
		for (let value = n; value >= 1; value--) {
			if (used[value]) continue;
			const partner = value === 1 ? position : position + value;
			if (value > 1 && (partner >= sequence.length || sequence[partner] !== 0))
				continue;
			used[value] = true;
			sequence[position] = value;
			sequence[partner] = value;
			if (fill(position + 1)) return true;
			used[value] = false;
			sequence[position] = 0;
			sequence[partner] = 0;
		}
		return false;
	};
	fill(0);
	return sequence;
};
