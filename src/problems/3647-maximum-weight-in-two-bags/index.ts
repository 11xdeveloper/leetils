/**
 * 3647. Maximum Weight in Two Bags
 *
 * Put each item in the first bag (capacity `w1`), the second (capacity
 * `w2`) or neither. Returns the most total weight packed.
 *
 * Track which pairs of bag loads are reachable, adding items one at a
 * time.
 *
 * @see https://leetcode.com/problems/maximum-weight-in-two-bags/
 * @difficulty Medium
 * @timeComplexity O(n · w1 · w2)
 * @spaceComplexity O(w1 · w2)
 *
 * @example
 * maximumWeightInTwoBags([1, 4, 3, 2], 5, 4); // 9
 */
export const maximumWeightInTwoBags = (
	weights: readonly number[],
	w1: number,
	w2: number,
): number => {
	const width = w2 + 1;
	const reachable = new Uint8Array((w1 + 1) * width);
	reachable[0] = 1;
	for (const w of weights)
		for (let a = w1; a >= 0; a--)
			for (let b = w2; b >= 0; b--) {
				if (reachable[a * width + b]) continue;
				if (
					(a >= w && reachable[(a - w) * width + b]) ||
					(b >= w && reachable[a * width + b - w])
				)
					reachable[a * width + b] = 1;
			}
	let best = 0;
	for (let a = 0; a <= w1; a++)
		for (let b = 0; b <= w2; b++)
			if (reachable[a * width + b]) best = Math.max(best, a + b);
	return best;
};
