/**
 * 547. Number of Provinces
 *
 * `isConnected[i][j]` is 1 when cities `i` and `j` are directly connected.
 * A province is a group of cities connected directly or through each other.
 * Returns how many provinces there are.
 *
 * Union–find: every connection merges two cities' groups, and each merge
 * of separate groups removes one province from the count.
 *
 * @see https://leetcode.com/problems/number-of-provinces/
 * @difficulty Medium
 * @timeComplexity O(n^2 · α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfProvinces([[1, 1, 0], [1, 1, 0], [0, 0, 1]]); // 2
 */
export const numberOfProvinces = (
	isConnected: readonly (readonly number[])[],
): number => {
	const n = isConnected.length;
	const parent = Array.from({ length: n }, (_, i) => i);
	const find = (city: number): number => {
		while (parent[city] !== city) {
			const grandparent = parent[parent[city] ?? city] ?? city;
			parent[city] = grandparent;
			city = grandparent;
		}
		return city;
	};

	let provinces = n;
	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			if (isConnected[i]?.[j] !== 1) continue;
			const a = find(i);
			const b = find(j);
			if (a !== b) {
				parent[a] = b;
				provinces--;
			}
		}
	}

	return provinces;
};
