/**
 * 3494. Find the Minimum Amount of Time to Brew Potions
 *
 * Potions pass through the wizards in order, each taking `skill[i] ·
 * mana[j]`, and a potion must move on the moment a wizard finishes it.
 * Potions are brewed in order. Returns when the last potion is done.
 *
 * Potion j started at S reaches wizard i at S + mana[j] · (skill sum before
 * i), which must be no earlier than when that wizard finished potion j - 1.
 * So each potion's start is the largest such requirement over the wizards.
 *
 * @see https://leetcode.com/problems/find-the-minimum-amount-of-time-to-brew-potions/
 * @difficulty Medium
 * @timeComplexity O(n · m)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheMinimumAmountOfTimeToBrewPotions([1, 5, 2, 4], [5, 1, 4, 2]); // 110
 */
export const findTheMinimumAmountOfTimeToBrewPotions = (
	skill: readonly number[],
	mana: readonly number[],
): number => {
	const n = skill.length;
	const prefix = [0];
	for (const s of skill) prefix.push((prefix.at(-1) ?? 0) + s);
	let start = 0;
	for (let j = 1; j < mana.length; j++) {
		const previous = mana[j - 1] ?? 0;
		const current = mana[j] ?? 0;
		let next = start;
		for (let i = 0; i < n; i++)
			next = Math.max(
				next,
				start + previous * (prefix[i + 1] ?? 0) - current * (prefix[i] ?? 0),
			);
		start = next;
	}
	return start + (mana.at(-1) ?? 0) * (prefix[n] ?? 0);
};
