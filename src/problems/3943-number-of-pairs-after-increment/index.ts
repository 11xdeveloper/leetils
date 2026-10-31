/**
 * 3943. Number of Pairs After Increment
 *
 * Query `[1, x, y, val]` adds val to `nums2[x..y]`; query `[2, tot]`
 * counts pairs (j, k) with `nums1[j] + nums2[k]` = tot. Returns the
 * counts.
 *
 * `nums1` has at most five elements, so a count query asks how often each
 * of five values appears in `nums2`. Split `nums2` into blocks, each with
 * a pending addition and a count of its values: an update rebuilds the
 * two partial blocks and bumps the whole ones.
 *
 * @see https://leetcode.com/problems/number-of-pairs-after-increment/
 * @difficulty Hard
 * @timeComplexity O(q · (B + m / B))
 * @spaceComplexity O(m)
 *
 * @example
 * numberOfPairsAfterIncrement([1, 1], [2, 2, 3], [[2, 4], [1, 0, 1, 1], [2, 4]]); // [2, 6]
 */
export const numberOfPairsAfterIncrement = (
	nums1: readonly number[],
	nums2: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const m = nums2.length;
	const size = Math.max(1, Math.ceil(Math.sqrt(m * nums1.length)));
	const values = [...nums2];
	const blocks = Math.ceil(m / size);
	const pending = new Array<number>(blocks).fill(0);
	const counts = Array.from(
		{ length: blocks },
		() => new Map<number, number>(),
	);
	const rebuild = (b: number): void => {
		const map = new Map<number, number>();
		for (let i = b * size; i < Math.min(m, (b + 1) * size); i++) {
			values[i] = (values[i] ?? 0) + (pending[b] ?? 0);
			map.set(values[i] ?? 0, (map.get(values[i] ?? 0) ?? 0) + 1);
		}
		pending[b] = 0;
		counts[b] = map;
	};
	for (let b = 0; b < blocks; b++) rebuild(b);
	const answers: number[] = [];
	for (const [kind = 0, a = 0, b = 0, val = 0] of queries) {
		if (kind === 2) {
			let total = 0;
			for (const x of nums1)
				for (let block = 0; block < blocks; block++)
					total += counts[block]?.get(a - x - (pending[block] ?? 0)) ?? 0;
			answers.push(total);
			continue;
		}
		const [first, last] = [Math.floor(a / size), Math.floor(b / size)];
		for (let block = first + 1; block < last; block++)
			pending[block] = (pending[block] ?? 0) + val;
		for (const block of first === last ? [first] : [first, last]) {
			for (
				let i = Math.max(a, block * size);
				i <= Math.min(b, (block + 1) * size - 1);
				i++
			)
				values[i] = (values[i] ?? 0) + val;
			rebuild(block);
		}
	}
	return answers;
};
