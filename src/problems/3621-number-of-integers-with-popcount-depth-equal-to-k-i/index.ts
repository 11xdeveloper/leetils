/**
 * 3621. Number of Integers With Popcount-Depth Equal to K I
 *
 * The popcount-depth of x is how many times x must be replaced by its
 * number of set bits to reach 1. Counts the integers from 1 to `n` with
 * depth `k`.
 *
 * Above 1, depth is one more than the depth of the popcount, which is at
 * most 50. So for each popcount c of depth k - 1, count the numbers up to
 * n with c set bits, walking n's bits from the top; 1 itself is the only
 * number with depth 0.
 *
 * @see https://leetcode.com/problems/number-of-integers-with-popcount-depth-equal-to-k-i/
 * @difficulty Hard
 * @timeComplexity O(log² n)
 * @spaceComplexity O(log² n)
 *
 * @example
 * numberOfIntegersWithPopcountDepthEqualToKI(7, 2); // 3
 */
export const numberOfIntegersWithPopcountDepthEqualToKI = (
	n: number,
	k: number,
): number => {
	if (k === 0) return 1;
	const bits = n.toString(2);
	const length = bits.length;
	const choose: number[][] = Array.from({ length: length + 1 }, () =>
		new Array<number>(length + 1).fill(0),
	);
	for (let i = 0; i <= length; i++) {
		(choose[i] as number[])[0] = 1;
		for (let j = 1; j <= i; j++)
			(choose[i] as number[])[j] =
				(choose[i - 1]?.[j - 1] ?? 0) + (choose[i - 1]?.[j] ?? 0);
	}
	const depth = (x: number): number => {
		let steps = 0;
		for (; x !== 1; steps++) {
			let count = 0;
			for (let y = x; y; y &= y - 1) count++;
			x = count;
		}
		return steps;
	};
	/** Numbers from 0 to n with exactly c set bits. */
	const withBits = (c: number): number => {
		let count = 0;
		let used = 0;
		for (let i = 0; i < length; i++) {
			if (bits[i] !== "1") continue;
			const rest = length - 1 - i;
			if (c - used >= 0) count += choose[rest]?.[c - used] ?? 0;
			used++;
		}
		return count + (used === c ? 1 : 0);
	};
	let total = 0;
	for (let c = 1; c <= length; c++)
		if (depth(c) === k - 1) total += withBits(c);
	// 1 has one set bit but depth 0.
	return k === 1 ? total - 1 : total;
};
