/**
 * 3466. Maximum Coin Collection
 *
 * Mario drives on two lanes, collecting `lane1[i]` or `lane2[i]` coins
 * (possibly negative) at mile i. He enters on lane 1 at any mile, may
 * switch lanes at most twice (switching right at the entry counts), drives
 * at least one mile and leaves whenever he likes. Returns the most coins.
 *
 * Track the best total ending at each mile for each lane and number of
 * switches, with the option of entering at this mile.
 *
 * @see https://leetcode.com/problems/maximum-coin-collection/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumCoinCollection([1, -2, -10, 3], [-5, 10, 0, 1]); // 14
 */
export const maximumCoinCollection = (
	lane1: readonly number[],
	lane2: readonly number[],
): number => {
	const NONE = Number.NEGATIVE_INFINITY;
	// best[lane * 3 + switches]: best total ending at the previous mile.
	let best = new Array<number>(6).fill(NONE);
	let answer = NONE;
	lane1.forEach((first, i) => {
		const coins = [first, lane2[i] ?? 0];
		const next = new Array<number>(6).fill(NONE);
		for (let lane = 0; lane < 2; lane++)
			for (let switches = 0; switches <= 2; switches++) {
				let before = best[lane * 3 + switches] ?? NONE;
				if (switches > 0)
					before = Math.max(
						before,
						best[(1 - lane) * 3 + switches - 1] ?? NONE,
					);
				if ((lane === 0 && switches === 0) || (lane === 1 && switches === 1))
					before = Math.max(before, 0);
				const total = before + (coins[lane] ?? 0);
				next[lane * 3 + switches] = total;
				answer = Math.max(answer, total);
			}
		best = next;
	});
	return answer;
};
