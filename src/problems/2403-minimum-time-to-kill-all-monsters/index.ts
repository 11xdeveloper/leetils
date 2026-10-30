/**
 * 2403. Minimum Time to Kill All Monsters
 *
 * Each day mana grows by `gain` (starting at 1). Killing monster `i` needs
 * mana at least `power[i]`, resets mana to 0 and raises `gain` by 1.
 * Returns the fewest days to kill every monster.
 *
 * DP over the set of monsters killed: `gain` is one more than its size,
 * and the next kill takes `⌈power / gain⌉` days.
 *
 * @see https://leetcode.com/problems/minimum-time-to-kill-all-monsters/
 * @difficulty Hard
 * @timeComplexity O(2^n · n)
 * @spaceComplexity O(2^n)
 *
 * @example
 * minimumTimeToKillAllMonsters([3, 1, 4]); // 4
 */
export const minimumTimeToKillAllMonsters = (
	power: readonly number[],
): number => {
	const n = power.length;
	const days = new Array<number>(1 << n).fill(Infinity);
	days[0] = 0;
	for (let killed = 0; killed < 1 << n; killed++) {
		const spent = days[killed] ?? Infinity;
		let gain = 1;
		for (let rest = killed; rest; rest &= rest - 1) gain++;
		for (let monster = 0; monster < n; monster++) {
			if (killed & (1 << monster)) continue;
			const next = killed | (1 << monster);
			days[next] = Math.min(
				days[next] ?? Infinity,
				spent + Math.ceil((power[monster] ?? 0) / gain),
			);
		}
	}
	return days[(1 << n) - 1] ?? 0;
};
