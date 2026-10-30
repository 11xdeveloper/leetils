const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

const power = (base: number, exponent: number): number => {
	let result = 1;
	for (; exponent > 0; exponent = Math.floor(exponent / 2)) {
		if (exponent % 2 === 1) result = multiply(result, base);
		base = multiply(base, base);
	}
	return result;
};

/**
 * 2818. Apply Operations to Maximize Score
 *
 * Starting from score 1, each of up to `k` operations picks a subarray not
 * picked before and multiplies the score by its element with the most
 * distinct prime factors, leftmost on ties. Returns the largest score,
 * modulo 1e9 + 7.
 *
 * Monotonic stacks give how many subarrays select each element. Then
 * spend the operations on elements from largest down, each as many times
 * as it's selected.
 *
 * @see https://leetcode.com/problems/apply-operations-to-maximize-score/
 * @difficulty Hard
 * @timeComplexity O(n √m + n log n), where `m` is the largest value
 * @spaceComplexity O(n)
 *
 * @example
 * applyOperationsToMaximizeScore([8, 3, 9, 3, 8], 2); // 81
 */
export const applyOperationsToMaximizeScore = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const primeScore = nums.map((num) => {
		let count = 0;
		for (let p = 2; p * p <= num; p++)
			if (num % p === 0) {
				count++;
				while (num % p === 0) num /= p;
			}
		return num > 1 ? count + 1 : count;
	});
	const score = (i: number): number => primeScore[i] ?? 0;

	// left[i]: the nearest index before i with a score at least as high.
	const left = nums.map(() => -1);
	const right = nums.map(() => n);
	const stack: number[] = [];
	for (let i = 0; i < n; i++) {
		while (stack.length > 0 && score(stack.at(-1) ?? 0) < score(i))
			right[stack.pop() ?? 0] = i;
		left[i] = stack.at(-1) ?? -1;
		stack.push(i);
	}

	let remaining = k;
	let result = 1;
	const order = nums
		.map((_, i) => i)
		.sort((a, b) => (nums[b] ?? 0) - (nums[a] ?? 0));
	for (const i of order) {
		if (remaining === 0) break;
		const times = Math.min(
			remaining,
			(i - (left[i] ?? 0)) * ((right[i] ?? 0) - i),
		);
		result = multiply(result, power(nums[i] ?? 1, times));
		remaining -= times;
	}
	return result;
};
