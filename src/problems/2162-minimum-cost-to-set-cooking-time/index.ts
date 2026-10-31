/**
 * 2162. Minimum Cost to Set Cooking Time
 *
 * A microwave takes up to four digits, read as minutes and seconds
 * (each 0 to 99) after padding with leading zeros. Moving the finger to
 * another digit costs `moveCost` and pressing costs `pushCost`, starting
 * on `startAt`. Returns the cheapest way to enter `targetSeconds`.
 *
 * Only two splits can work: the most minutes possible, and one minute
 * fewer with 60 more seconds. Type each without leading zeros.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-set-cooking-time/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumCostToSetCookingTime(1, 2, 1, 600); // 6
 */
export const minimumCostToSetCookingTime = (
	startAt: number,
	moveCost: number,
	pushCost: number,
	targetSeconds: number,
): number => {
	const cost = (minutes: number, seconds: number): number => {
		if (minutes < 0 || minutes > 99 || seconds < 0 || seconds > 99)
			return Infinity;
		const digits = String(minutes * 100 + seconds);
		let [total, finger] = [0, String(startAt)];
		for (const digit of digits) {
			if (digit !== finger) total += moveCost;
			total += pushCost;
			finger = digit;
		}
		return total;
	};
	const minutes = Math.floor(targetSeconds / 60);
	const seconds = targetSeconds % 60;
	return Math.min(cost(minutes, seconds), cost(minutes - 1, seconds + 60));
};
