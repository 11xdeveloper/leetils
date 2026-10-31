/**
 * 3934. Smallest Unique Subarray
 *
 * The shortest length for which some subarray occurs exactly once.
 *
 * A unique subarray stays unique when extended, so binary search the
 * length, counting each length's subarrays with a double rolling hash.
 *
 * @see https://leetcode.com/problems/smallest-unique-subarray/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * smallestUniqueSubarray([1, 1, 2, 2, 1]); // 2
 */
export const smallestUniqueSubarray = (nums: readonly number[]): number => {
	const n = nums.length;
	const [M1, M2, B1, B2] = [1_000_000_007, 998_244_353, 100_003, 131_071];
	const mul = (a: number, b: number, mod: number): number =>
		(((a * Math.floor(b / 65536)) % mod) * 65536 + a * (b % 65536)) % mod;
	const prefix = (base: number, mod: number) => {
		const hashes = [0];
		const powers = [1];
		for (let i = 0; i < n; i++) {
			hashes.push((mul(hashes[i] ?? 0, base, mod) + (nums[i] ?? 0)) % mod);
			powers.push(mul(powers[i] ?? 1, base, mod));
		}
		return { hashes, powers };
	};
	const [first, second] = [prefix(B1, M1), prefix(B2, M2)];
	const hashOf = (
		{ hashes, powers }: ReturnType<typeof prefix>,
		mod: number,
		i: number,
		length: number,
	): number =>
		((hashes[i + length] ?? 0) -
			mul(hashes[i] ?? 0, powers[length] ?? 1, mod) +
			mod) %
		mod;
	const hasUnique = (length: number): boolean => {
		const counts = new Map<number, number>();
		const keys: number[] = [];
		for (let i = 0; i + length <= n; i++) {
			const key =
				hashOf(first, M1, i, length) * M2 + hashOf(second, M2, i, length);
			keys.push(key);
			counts.set(key, (counts.get(key) ?? 0) + 1);
		}
		return keys.some((key) => counts.get(key) === 1);
	};
	let [lo, hi] = [1, n];
	while (lo < hi) {
		const mid = (lo + hi) >>> 1;
		if (hasUnique(mid)) hi = mid;
		else lo = mid + 1;
	}
	return lo;
};
