/**
 * 3873. Maximum Points Activated with One Addition
 *
 * Activating a point activates every point sharing its x or y, and so on.
 * Add one new point and activate it. Returns the most points activated,
 * counting the new one.
 *
 * Points sharing a row or column form groups. A new point's row and
 * column can reach two different groups (and isn't already present, or
 * they'd be one group), so take the two largest groups plus the point.
 *
 * @see https://leetcode.com/problems/maximum-points-activated-with-one-addition/
 * @difficulty Hard
 * @timeComplexity O(n α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * maximumPointsActivatedWithOneAddition([[2, 3], [2, 2], [1, 1], [4, 5]]); // 4
 */
export const maximumPointsActivatedWithOneAddition = (
	points: readonly (readonly number[])[],
): number => {
	const parent = new Map<string, string>();
	const find = (x: string): string => {
		let root = x;
		while (parent.get(root) !== root) root = parent.get(root) ?? root;
		for (let y = x; y !== root; ) {
			const next = parent.get(y) ?? root;
			parent.set(y, root);
			y = next;
		}
		return root;
	};
	const node = (key: string) => {
		if (!parent.has(key)) parent.set(key, key);
		return key;
	};
	for (const [x = 0, y = 0] of points) {
		const [a, b] = [find(node(`x${x}`)), find(node(`y${y}`))];
		if (a !== b) parent.set(a, b);
	}
	const sizes = new Map<string, number>();
	for (const [x = 0] of points) {
		const root = find(`x${x}`);
		sizes.set(root, (sizes.get(root) ?? 0) + 1);
	}
	const [first = 0, second = 0] = [...sizes.values()].sort((a, b) => b - a);
	return first + second + 1;
};
