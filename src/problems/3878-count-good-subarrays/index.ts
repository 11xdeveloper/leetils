/**
 * 3878. Count Good Subarrays
 *
 * Counts subarrays whose bitwise OR equals one of their elements.
 *
 * For a fixed right end, the ORs of subarrays ending there take at most
 * 31 values, each over a range of starts. A range with OR v qualifies for
 * the starts at or before the latest occurrence of v.
 *
 * @see https://leetcode.com/problems/count-good-subarrays/
 * @difficulty Hard
 * @timeComplexity O(n log V)
 * @spaceComplexity O(n)
 *
 * @example
 * countGoodSubarrays([1, 3, 1]); // 6
 */
export const countGoodSubarrays = (nums: readonly number[]): number => {
	const latest = new Map<number, number>();
	// groups: [or, first start], from the latest starts back.
	let groups: [value: number, start: number][] = [];
	let count = 0;
	nums.forEach((num, r) => {
		latest.set(num, r);
		const next: [number, number][] = [[num, r]];
		for (const [value, start] of groups) {
			const merged = value | num;
			const last = next.at(-1);
			if (last && last[0] === merged) last[1] = start;
			else next.push([merged, start]);
		}
		groups = next;
		let end = r;
		for (const [value, start] of groups) {
			const at = latest.get(value);
			if (at !== undefined && at >= start)
				count += Math.min(end, at) - start + 1;
			end = start - 1;
		}
	});
	return count;
};
