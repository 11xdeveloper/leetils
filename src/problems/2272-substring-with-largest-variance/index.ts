/**
 * 2272. Substring With Largest Variance
 *
 * A string's variance is the largest difference between the counts of
 * any two characters present in it. Returns the largest variance of any
 * substring of `s`.
 *
 * For each ordered pair of letters `(a, b)`, run Kadane's algorithm with
 * `a` as +1 and `b` as -1, counting only runs that contain a `b`. A run
 * can restart at a `b` while keeping one, which the "has b" flag and the
 * reset rule handle.
 *
 * @see https://leetcode.com/problems/substring-with-largest-variance/
 * @difficulty Hard
 * @timeComplexity O(26^2 · n)
 * @spaceComplexity O(1)
 *
 * @example
 * substringWithLargestVariance("aababbb"); // 3
 */
export const substringWithLargestVariance = (s: string): number => {
	const letters = [...new Set(s)];
	let best = 0;
	for (const a of letters) {
		for (const b of letters) {
			if (a === b) continue;
			let [diff, hasB, firstWasB] = [0, false, false];
			for (const char of s) {
				if (char === a) diff++;
				else if (char === b) {
					hasB = true;
					// Dropping a leading b gains one if the run started with it.
					if (firstWasB && diff >= 0) firstWasB = false;
					else if (--diff < 0) {
						diff = -1;
						firstWasB = true;
					}
				} else continue;
				if (hasB) best = Math.max(best, diff);
			}
		}
	}
	return best;
};
