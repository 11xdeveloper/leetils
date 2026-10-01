/**
 * 1257. Smallest Common Region
 *
 * The first region in each list of `regions` directly contains the others.
 * Returns the smallest region containing both `region1` and `region2`.
 *
 * The regions form a tree, so this is a lowest common ancestor: record each
 * region's parent, collect `region1`'s ancestors, then climb from `region2`
 * until one of them is reached.
 *
 * @see https://leetcode.com/problems/smallest-common-region/
 * @difficulty Medium
 * @timeComplexity O(total number of regions listed)
 * @spaceComplexity O(r) for r regions
 *
 * @example
 * smallestCommonRegion([["Earth", "North America", "South America"], ["North America", "United States", "Canada"], ["United States", "New York", "Boston"], ["Canada", "Ontario", "Quebec"], ["South America", "Brazil"]], "Quebec", "New York"); // "North America"
 */
export const smallestCommonRegion = (
	regions: readonly (readonly string[])[],
	region1: string,
	region2: string,
): string => {
	const parent = new Map<string, string>();
	for (const [outer = "", ...inner] of regions) {
		for (const region of inner) parent.set(region, outer);
	}
	const ancestors = new Set<string>();
	for (
		let region: string | undefined = region1;
		region !== undefined;
		region = parent.get(region)
	) {
		ancestors.add(region);
	}
	let region = region2;
	while (!ancestors.has(region)) region = parent.get(region) ?? region1;
	return region;
};
