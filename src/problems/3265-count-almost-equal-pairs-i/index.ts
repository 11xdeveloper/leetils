/**
 * 3265. Count Almost Equal Pairs I
 *
 * Count the pairs i < j where `nums[i]` and `nums[j]` can be made equal by
 * swapping two digits of one of them at most once (leading zeros are
 * allowed after a swap).
 *
 * Pad every number to the same length. A swap on one number can be undone
 * on the other, so a pair qualifies when one reaches the other with up to
 * 1 swap(s). Generate each number's reachable values and look them up
 * among the numbers seen before it.
 *
 * @see https://leetcode.com/problems/count-almost-equal-pairs-i/
 * @difficulty Medium
 * @timeComplexity O(n · D^2), for D digits
 * @spaceComplexity O(n + D^2)
 *
 * @example
 * countAlmostEqualPairsI([3, 12, 30, 17, 21]); // 2
 */
export const countAlmostEqualPairsI = (nums: readonly number[]): number => {
	const width = String(Math.max(...nums)).length;
	const seen = new Map<string, number>();
	let pairs = 0;
	for (const num of nums) {
		const digits = String(num).padStart(width, "0");
		const reachable = new Set([digits]);
		let frontier = [digits];
		for (let swap = 0; swap < 1; swap++) {
			const next: string[] = [];
			for (const value of frontier) {
				const chars = [...value];
				for (let a = 0; a < width; a++)
					for (let b = a + 1; b < width; b++) {
						if (chars[a] === chars[b]) continue;
						[chars[a], chars[b]] = [chars[b] ?? "", chars[a] ?? ""];
						const swapped = chars.join("");
						[chars[a], chars[b]] = [chars[b] ?? "", chars[a] ?? ""];
						if (!reachable.has(swapped)) {
							reachable.add(swapped);
							next.push(swapped);
						}
					}
			}
			frontier = next;
		}
		for (const value of reachable) pairs += seen.get(value) ?? 0;
		seen.set(digits, (seen.get(digits) ?? 0) + 1);
	}
	return pairs;
};
