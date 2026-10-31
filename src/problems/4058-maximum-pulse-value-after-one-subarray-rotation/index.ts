/**
 * 4058. Maximum Pulse Value After One Subarray Rotation
 *
 * The pulse of an array is its alternating sum (+, -, +, …). Optionally
 * rotate one subarray `nums[l..r]` left by one. Returns the best pulse.
 *
 * With sᵢ = ±1 the sign at i and Q the prefix sums of sᵢ · nums[i],
 * rotating [l..r] changes the pulse by -2(Q[r + 1] - Q[l + 1]) +
 * nums[l](s_r - s_l). For each r, keep the best l-part for either sign
 * of s_r.
 *
 * @see https://leetcode.com/problems/maximum-pulse-value-after-one-subarray-rotation/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumPulseValueAfterOneSubarrayRotation([6, 4, 3]); // 7
 */
export const maximumPulseValueAfterOneSubarrayRotation = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const sign = (i: number) => (i % 2 === 0 ? 1 : -1);
	const prefix = [0];
	for (let i = 0; i < n; i++)
		prefix.push((prefix[i] ?? 0) + sign(i) * (nums[i] ?? 0));
	const base = prefix[n] ?? 0;
	// bestFor[s]: max over l seen so far of 2Q[l + 1] + nums[l](s - s_l), for s = +1 (index 0) or -1.
	const bestFor = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];
	let gain = 0;
	for (let r = 1; r < n; r++) {
		const l = r - 1;
		[1, -1].forEach((s, k) => {
			bestFor[k] = Math.max(
				bestFor[k] ?? 0,
				2 * (prefix[l + 1] ?? 0) + (nums[l] ?? 0) * (s - sign(l)),
			);
		});
		gain = Math.max(
			gain,
			-2 * (prefix[r + 1] ?? 0) + (bestFor[sign(r) === 1 ? 0 : 1] ?? 0),
		);
	}
	return base + gain;
};
