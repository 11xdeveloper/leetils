/**
 * 4008. Minimum Initial Strength to Defeat All Monsters
 *
 * Fight monsters left to right: beating one needs strength plus the boosts
 * covering it to reach its strength, after which strength drops by the
 * monster's (to no less than 0). Returns the least starting strength.
 *
 * More strength never hurts, so binary search it, simulating with the
 * boost totals from a difference array.
 *
 * @see https://leetcode.com/problems/minimum-initial-strength-to-defeat-all-monsters/
 * @difficulty Medium
 * @timeComplexity O((n + b) + n log S)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumInitialStrengthToDefeatAllMonsters([5, 10, 15], [[1, 1, 10]]); // 30
 */
export const minimumInitialStrengthToDefeatAllMonsters = (
	monsters: readonly number[],
	boosts: readonly (readonly number[])[],
): number => {
	const n = monsters.length;
	const change = new Float64Array(n + 1);
	for (const [l = 0, r = 0, v = 0] of boosts) {
		change[l] = (change[l] ?? 0) + v;
		change[r + 1] = (change[r + 1] ?? 0) - v;
	}
	const bonus = new Float64Array(n);
	let running = 0;
	for (let i = 0; i < n; i++) {
		running += change[i] ?? 0;
		bonus[i] = running;
	}
	const survives = (strength: number): boolean => {
		let current = strength;
		for (let i = 0; i < n; i++) {
			const monster = monsters[i] ?? 0;
			if (current + (bonus[i] ?? 0) < monster) return false;
			current = Math.max(0, current - monster);
		}
		return true;
	};
	let [lo, hi] = [0, monsters.reduce((a, b) => a + b, 0)];
	while (lo < hi) {
		const mid = lo + Math.floor((hi - lo) / 2);
		if (survives(mid)) hi = mid;
		else lo = mid + 1;
	}
	return lo;
};
