/**
 * 3445. Maximum Difference Between Even and Odd Frequency II
 *
 * Over substrings of the digit string `s` (digits 0–4) at least `k` long,
 * the largest freq(a) - freq(b) for a letter a with odd frequency and a
 * letter b with even, non-zero frequency.
 *
 * Try each ordered pair (a, b). A substring is a difference of prefixes,
 * so for each end, look for the start minimising count(a) - count(b) among
 * starts at least `k` back, with fewer b's than now (so b appears), and
 * with the parities that make a odd and b even. Starts only become
 * eligible as the end moves right, so keep the best per parity pair.
 *
 * @see https://leetcode.com/problems/maximum-difference-between-even-and-odd-frequency-ii/
 * @difficulty Hard
 * @timeComplexity O(20 n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumDifferenceBetweenEvenAndOddFrequencyII("1122211", 3); // 1
 */
export const maximumDifferenceBetweenEvenAndOddFrequencyII = (
	s: string,
	k: number,
): number => {
	const n = s.length;
	let best = Number.NEGATIVE_INFINITY;
	for (let a = 0; a < 5; a++)
		for (let b = 0; b < 5; b++) {
			if (a === b) continue;
			const countA = new Int32Array(n + 1);
			const countB = new Int32Array(n + 1);
			for (let i = 0; i < n; i++) {
				const digit = s.charCodeAt(i) - 48;
				countA[i + 1] = (countA[i] ?? 0) + (digit === a ? 1 : 0);
				countB[i + 1] = (countB[i] ?? 0) + (digit === b ? 1 : 0);
			}
			const lowest = new Float64Array(4).fill(Number.POSITIVE_INFINITY);
			for (let end = k, start = 0; end <= n; end++) {
				while (start <= end - k && (countB[start] ?? 0) < (countB[end] ?? 0)) {
					const parity =
						((countA[start] ?? 0) % 2) * 2 + ((countB[start] ?? 0) % 2);
					lowest[parity] = Math.min(
						lowest[parity] ?? 0,
						(countA[start] ?? 0) - (countB[start] ?? 0),
					);
					start++;
				}
				const want =
					(1 - ((countA[end] ?? 0) % 2)) * 2 + ((countB[end] ?? 0) % 2);
				const from = lowest[want] ?? Number.POSITIVE_INFINITY;
				if (from !== Number.POSITIVE_INFINITY)
					best = Math.max(best, (countA[end] ?? 0) - (countB[end] ?? 0) - from);
			}
		}
	return best;
};
