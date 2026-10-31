/**
 * 3168. Minimum Number of Chairs in a Waiting Room
 *
 * The fewest chairs needed for a waiting room where each second someone
 * enters (`E`) or leaves (`L`).
 *
 * The most people present at once.
 *
 * @see https://leetcode.com/problems/minimum-number-of-chairs-in-a-waiting-room/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfChairsInAWaitingRoom("ELELEEL"); // 2
 */
export const minimumNumberOfChairsInAWaitingRoom = (s: string): number => {
	let present = 0;
	let most = 0;
	for (const event of s) {
		present += event === "E" ? 1 : -1;
		most = Math.max(most, present);
	}
	return most;
};
