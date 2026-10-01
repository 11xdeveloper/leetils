/**
 * 1923. Longest Common Subpath
 *
 * Returns the length of the longest sequence of cities appearing
 * contiguously in every friend's path.
 *
 * Binary search the length: a length works when some subpath hash of that
 * length appears in every path. Rolling hashes under two moduli make
 * collisions negligible, and every intermediate product stays below 2^53.
 *
 * @see https://leetcode.com/problems/longest-common-subpath/
 * @difficulty Hard
 * @timeComplexity O(L log L) for total path length L
 * @spaceComplexity O(L)
 *
 * @example
 * longestCommonSubpath(5, [[0, 1, 2, 3, 4], [2, 3, 4], [4, 0, 1, 2, 3]]); // 2
 */
export const longestCommonSubpath = (
	_n: number,
	paths: readonly (readonly number[])[],
): number => {
	const HASHES = [
		[100_003, 999_999_937],
		[100_019, 999_999_929],
	] as const;
	/** Every hash pair of the windows of `length` in `path`, as strings. */
	const windows = (path: readonly number[], length: number) => {
		const found = new Set<string>();
		const values = HASHES.map(() => 0);
		const highest = HASHES.map(([base, mod]) => {
			let power = 1;
			for (let i = 1; i < length; i++) power = (power * base) % mod;
			return power;
		});
		for (const [i, city] of path.entries()) {
			for (const [h, [base, mod]] of HASHES.entries()) {
				let value = values[h] ?? 0;
				if (i >= length)
					value =
						(value -
							((((path[i - length] ?? 0) + 1) * (highest[h] ?? 0)) % mod) +
							mod) %
						mod;
				values[h] = (value * base + city + 1) % mod;
			}
			if (i >= length - 1) found.add(values.join(","));
		}
		return found;
	};
	const common = (length: number) => {
		let shared = windows(paths[0] ?? [], length);
		for (const path of paths.slice(1)) {
			const here = windows(path, length);
			shared = new Set([...shared].filter((key) => here.has(key)));
			if (shared.size === 0) return false;
		}
		return true;
	};
	let [low, high] = [0, Math.min(...paths.map((path) => path.length))];
	while (low < high) {
		const mid = Math.ceil((low + high) / 2);
		if (common(mid)) low = mid;
		else high = mid - 1;
	}
	return low;
};
