/**
 * 2306. Naming a Company
 *
 * Swapping the first letters of two distinct ideas names a company if
 * neither result is already an idea. Counts the valid ordered pairs.
 *
 * Group the suffixes by first letter. Two groups pair the suffixes found
 * in only one of them, in both orders.
 *
 * @see https://leetcode.com/problems/naming-a-company/
 * @difficulty Hard
 * @timeComplexity O(26^2 · n)
 * @spaceComplexity O(n)
 *
 * @example
 * namingACompany(["coffee", "donuts", "time", "toffee"]); // 6
 */
export const namingACompany = (ideas: readonly string[]): number => {
	const groups = new Map<string, Set<string>>();
	for (const idea of ideas) {
		const first = idea[0] ?? "";
		const group = groups.get(first) ?? new Set<string>();
		group.add(idea.slice(1));
		groups.set(first, group);
	}
	const sets = [...groups.values()];
	let names = 0;
	for (const [i, a] of sets.entries()) {
		for (const b of sets.slice(i + 1)) {
			let shared = 0;
			for (const suffix of a) if (b.has(suffix)) shared++;
			names += 2 * (a.size - shared) * (b.size - shared);
		}
	}
	return names;
};
