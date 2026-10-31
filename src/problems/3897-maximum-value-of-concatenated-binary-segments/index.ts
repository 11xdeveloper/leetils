const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3897. Maximum Value of Concatenated Binary Segments
 *
 * Segment i is `nums1[i]` 1s then `nums0[i]` 0s. Order the segments to
 * maximise the binary number they spell, modulo 1e9+7.
 *
 * Put X before Y when XY beats YX, the usual exchange argument. Both have
 * the same length, so compare them as runs of equal bits, in constant
 * time, then build the value from powers of 2.
 *
 * @see https://leetcode.com/problems/maximum-value-of-concatenated-binary-segments/
 * @difficulty Hard
 * @timeComplexity O(n log n + L)
 * @spaceComplexity O(n + L)
 *
 * @example
 * maximumValueOfConcatenatedBinarySegments([3, 1], [0, 3]); // 120
 */
export const maximumValueOfConcatenatedBinarySegments = (
	nums1: readonly number[],
	nums0: readonly number[],
): number => {
	type Run = [bit: number, length: number];
	const runs = (first: number, second: number): Run[] => {
		const pieces: Run[] = [
			[1, nums1[first] ?? 0],
			[0, nums0[first] ?? 0],
			[1, nums1[second] ?? 0],
			[0, nums0[second] ?? 0],
		];
		const merged: Run[] = [];
		for (const [bit, length] of pieces) {
			if (length === 0) continue;
			const last = merged.at(-1);
			if (last && last[0] === bit) last[1] += length;
			else merged.push([bit, length]);
		}
		return merged;
	};
	/** Positive when a before b reads larger than b before a. */
	const compare = (a: number, b: number): number => {
		const [x, y] = [runs(a, b), runs(b, a)];
		let [i, j] = [0, 0];
		let [left, right] = [x[0]?.[1] ?? 0, y[0]?.[1] ?? 0];
		while (i < x.length && j < y.length) {
			const [bx = 0, by = 0] = [x[i]?.[0], y[j]?.[0]];
			if (bx !== by) return bx - by;
			const step = Math.min(left, right);
			left -= step;
			right -= step;
			if (left === 0) left = x[++i]?.[1] ?? 0;
			if (right === 0) right = y[++j]?.[1] ?? 0;
		}
		return 0;
	};
	const order = nums1.map((_, i) => i).sort((a, b) => compare(b, a));
	const total =
		nums1.reduce((s, x) => s + x, 0) + nums0.reduce((s, x) => s + x, 0);
	const powers = [1];
	for (let i = 0; i < total; i++) powers.push(((powers[i] ?? 1) * 2) % MOD);
	let value = 0;
	for (const i of order) {
		const [ones, zeros] = [nums1[i] ?? 0, nums0[i] ?? 0];
		const segment = multiply(
			((powers[ones] ?? 1) - 1 + MOD) % MOD,
			powers[zeros] ?? 1,
		);
		value = (multiply(value, powers[ones + zeros] ?? 1) + segment) % MOD;
	}
	return value;
};
