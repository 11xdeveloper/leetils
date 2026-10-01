/**
 * 825. Friends Of Appropriate Ages
 *
 * Person `x` sends a friend request to a different person `y` unless
 * `age[y] ≤ 0.5 · age[x] + 7`, `age[y] > age[x]`, or `age[y] > 100` while
 * `age[x] < 100`. Returns the total number of requests.
 *
 * Ages are at most 120, so it counts people per age and checks every pair
 * of ages, subtracting self-requests when both ages are the same.
 *
 * @see https://leetcode.com/problems/friends-of-appropriate-ages/
 * @difficulty Medium
 * @timeComplexity O(n + 120^2)
 * @spaceComplexity O(120)
 *
 * @example
 * friendsOfAppropriateAges([16, 17, 18]); // 2
 */
export const friendsOfAppropriateAges = (ages: readonly number[]): number => {
	const counts = new Array<number>(121).fill(0);
	for (const age of ages) counts[age] = (counts[age] ?? 0) + 1;
	let requests = 0;
	for (let x = 1; x <= 120; x++) {
		for (let y = 1; y <= 120; y++) {
			if (y <= 0.5 * x + 7 || y > x || (y > 100 && x < 100)) continue;
			requests += (counts[x] ?? 0) * ((counts[y] ?? 0) - (x === y ? 1 : 0));
		}
	}
	return requests;
};
