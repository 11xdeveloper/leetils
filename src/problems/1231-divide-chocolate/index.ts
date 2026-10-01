/**
 * 1231. Divide Chocolate
 *
 * Cuts the bar of chunks with the given `sweetness` into `k + 1` pieces of
 * consecutive chunks, keeping the least sweet piece. Returns the sweetest
 * that piece can be.
 *
 * Binary searches on the answer: some cut gives every piece at least `s`
 * exactly when greedily closing a piece as soon as it reaches `s` makes at
 * least `k + 1` pieces.
 *
 * @see https://leetcode.com/problems/divide-chocolate/
 * @difficulty Hard
 * @timeComplexity O(n log(total sweetness))
 * @spaceComplexity O(1)
 *
 * @example
 * divideChocolate([1, 2, 3, 4, 5, 6, 7, 8, 9], 5); // 6
 */
export const divideChocolate = (
	sweetness: readonly number[],
	k: number,
): number => {
	const pieces = (least: number) => {
		let [count, current] = [0, 0];
		for (const chunk of sweetness) {
			current += chunk;
			if (current >= least) {
				count++;
				current = 0;
			}
		}
		return count;
	};
	let low = 1;
	let high = Math.floor(
		sweetness.reduce((sum, chunk) => sum + chunk, 0) / (k + 1),
	);
	while (low < high) {
		const mid = Math.ceil((low + high) / 2);
		if (pieces(mid) >= k + 1) low = mid;
		else high = mid - 1;
	}
	return low;
};
