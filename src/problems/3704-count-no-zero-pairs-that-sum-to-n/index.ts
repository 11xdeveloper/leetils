/**
 * 3704. Count No-Zero Pairs That Sum to N
 *
 * Counts ordered pairs of positive integers without a zero digit that add
 * up to `n`.
 *
 * Digit DP from the units digit up, tracking the carry and whether each
 * number is still going. A live number takes a digit 1-9; after the first
 * digit either may stop, contributing 0 from then on.
 *
 * @see https://leetcode.com/problems/count-no-zero-pairs-that-sum-to-n/
 * @difficulty Hard
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * countNoZeroPairsThatSumToN(11); // 8
 */
export const countNoZeroPairsThatSumToN = (n: number): number => {
	const digits = [...String(n)].reverse().map(Number);
	// ways[carry][aLive][bLive]
	let ways = new Map<string, number>([["0,1,1", 1]]);
	digits.forEach((digit, position) => {
		const next = new Map<string, number>();
		for (const [key, count] of ways) {
			const [carry = 0, aLive = 0, bLive = 0] = key.split(",").map(Number);
			for (const aNow of position > 0 && aLive ? [0, 1] : [aLive])
				for (const bNow of position > 0 && bLive ? [0, 1] : [bLive])
					for (let a = aNow ? 1 : 0; a <= (aNow ? 9 : 0); a++)
						for (let b = bNow ? 1 : 0; b <= (bNow ? 9 : 0); b++) {
							const total = a + b + carry;
							if (total % 10 !== digit) continue;
							const state = `${Math.floor(total / 10)},${aNow},${bNow}`;
							next.set(state, (next.get(state) ?? 0) + count);
						}
		}
		ways = next;
	});
	let total = 0;
	for (const [key, count] of ways) if (key.startsWith("0,")) total += count;
	return total;
};
