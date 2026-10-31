/**
 * 3629. Minimum Jumps to Reach End via Prime Teleportation
 *
 * From index i, step to i - 1 or i + 1, or, if `nums[i]` is a prime p,
 * jump to any index whose value p divides. Returns the fewest moves from
 * the first index to the last.
 *
 * Breadth-first search. Group indices by each prime factor of their value;
 * a prime's group only needs expanding the first time it's used.
 *
 * @see https://leetcode.com/problems/minimum-jumps-to-reach-end-via-prime-teleportation/
 * @difficulty Medium
 * @timeComplexity O(V log log V + n log V)
 * @spaceComplexity O(V + n log V)
 *
 * @example
 * minimumJumpsToReachEndViaPrimeTeleportation([1, 2, 4, 6]); // 2
 */
export const minimumJumpsToReachEndViaPrimeTeleportation = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const limit = Math.max(2, ...nums);
	const smallest = new Int32Array(limit + 1);
	for (let p = 2; p <= limit; p++)
		if (!smallest[p])
			for (let x = p; x <= limit; x += p) if (!smallest[x]) smallest[x] = p;
	const groups = new Map<number, number[]>();
	nums.forEach((num, i) => {
		for (let x = num; x > 1; ) {
			const p = smallest[x] ?? x;
			const group = groups.get(p) ?? [];
			group.push(i);
			groups.set(p, group);
			while (x % p === 0) x /= p;
		}
	});
	const distance = new Int32Array(n).fill(-1);
	distance[0] = 0;
	const queue = [0];
	for (let q = 0; q < queue.length; q++) {
		const i = queue[q] ?? 0;
		if (i === n - 1) break;
		const value = nums[i] ?? 0;
		const targets = [i - 1, i + 1];
		if (value > 1 && smallest[value] === value) {
			targets.push(...(groups.get(value) ?? []));
			groups.delete(value);
		}
		for (const j of targets)
			if (j >= 0 && j < n && distance[j] === -1) {
				distance[j] = (distance[i] ?? 0) + 1;
				queue.push(j);
			}
	}
	return distance[n - 1] ?? 0;
};
