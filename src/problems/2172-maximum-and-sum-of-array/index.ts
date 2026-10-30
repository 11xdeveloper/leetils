/**
 * 2172. Maximum AND Sum of Array
 *
 * Places each number into one of `numSlots` slots (numbered from 1), at
 * most two per slot. Returns the largest sum of `num & slot`.
 *
 * DP over slot fillings written in base 3 (0, 1 or 2 numbers per slot).
 * The total filled says which number goes next.
 *
 * @see https://leetcode.com/problems/maximum-and-sum-of-array/
 * @difficulty Hard
 * @timeComplexity O(3^s · s)
 * @spaceComplexity O(3^s)
 *
 * @example
 * maximumAndSumOfArray([1, 2, 3, 4, 5, 6], 3); // 9
 */
export const maximumAndSumOfArray = (
	nums: readonly number[],
	numSlots: number,
): number => {
	const states = 3 ** numSlots;
	const best = new Array<number>(states).fill(-1);
	best[0] = 0;
	let answer = 0;
	for (let state = 0; state < states; state++) {
		const sum = best[state] ?? -1;
		if (sum < 0) continue;
		let placed = 0;
		for (let rest = state; rest > 0; rest = Math.floor(rest / 3))
			placed += rest % 3;
		if (placed === nums.length) {
			answer = Math.max(answer, sum);
			continue;
		}
		const num = nums[placed] ?? 0;
		for (let slot = 0, unit = 1; slot < numSlots; slot++, unit *= 3) {
			if (Math.floor(state / unit) % 3 === 2) continue;
			const next = state + unit;
			best[next] = Math.max(best[next] ?? -1, sum + (num & (slot + 1)));
		}
	}
	return answer;
};
