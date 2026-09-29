/**
 * 649. Dota2 Senate
 *
 * Senators from two parties, Radiant (`R`) and Dire (`D`), act in the order
 * of `senate`, round after round. Each senator still in the game bans one
 * opponent from all later rounds. When only one party is left, it wins.
 * Returns `"Radiant"` or `"Dire"`, assuming everyone plays optimally.
 *
 * Each senator should ban the next opponent due to act. Two queues hold
 * each party's senators in turn order; the earlier of the two at the front
 * bans the other and goes back in line for the next round (its position
 * plus `n`).
 *
 * @see https://leetcode.com/problems/dota2-senate/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * dota2Senate("RDD"); // "Dire"
 */
export const dota2Senate = (senate: string): string => {
	const n = senate.length;
	const radiant: number[] = [];
	const dire: number[] = [];
	for (const [i, party] of [...senate].entries())
		(party === "R" ? radiant : dire).push(i);

	let r = 0;
	let d = 0;
	while (r < radiant.length && d < dire.length) {
		const nextRadiant = radiant[r++] ?? 0;
		const nextDire = dire[d++] ?? 0;
		if (nextRadiant < nextDire) radiant.push(nextRadiant + n);
		else dire.push(nextDire + n);
	}

	return r < radiant.length ? "Radiant" : "Dire";
};
