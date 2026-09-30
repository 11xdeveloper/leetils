/**
 * 1494. Parallel Courses II
 *
 * Courses `1 … n` (at most 15) have prerequisites `[before, after]`. Each
 * semester up to `k` courses whose prerequisites are done can be taken.
 * Returns the fewest semesters to take them all.
 *
 * Breadth-first search over the set of courses taken, as a bitmask. From
 * each set, if at most `k` courses are available take them all; otherwise
 * try every `k` of them (taking fewer is never better).
 *
 * @see https://leetcode.com/problems/parallel-courses-ii/
 * @difficulty Hard
 * @timeComplexity O(3^n)
 * @spaceComplexity O(2^n)
 *
 * @example
 * parallelCoursesII(5, [[2, 1], [3, 1], [4, 1], [1, 5]], 2); // 4
 */
export const parallelCoursesII = (
	n: number,
	relations: readonly (readonly number[])[],
	k: number,
): number => {
	const needs = new Array<number>(n).fill(0);
	for (const [before = 1, after = 1] of relations) {
		needs[after - 1] = (needs[after - 1] ?? 0) | (1 << (before - 1));
	}
	const popcount = (mask: number) => {
		let count = 0;
		for (let rest = mask; rest !== 0; rest &= rest - 1) count++;
		return count;
	};
	const all = (1 << n) - 1;
	const seen = new Uint8Array(1 << n);
	seen[0] = 1;
	let frontier = [0];
	for (let semesters = 0; frontier.length > 0; semesters++) {
		const next: number[] = [];
		for (const taken of frontier) {
			if (taken === all) return semesters;
			let available = 0;
			for (let course = 0; course < n; course++) {
				if (
					!(taken & (1 << course)) &&
					((needs[course] ?? 0) & taken) === (needs[course] ?? 0)
				) {
					available |= 1 << course;
				}
			}
			const visit = (mask: number) => {
				if (seen[mask]) return;
				seen[mask] = 1;
				next.push(mask);
			};
			if (popcount(available) <= k) {
				visit(taken | available);
				continue;
			}
			for (
				let subset = available;
				subset > 0;
				subset = (subset - 1) & available
			) {
				if (popcount(subset) === k) visit(taken | subset);
			}
		}
		frontier = next;
	}
	return -1;
};
