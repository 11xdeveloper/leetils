/**
 * 2127. Maximum Employees to Be Invited to a Meeting
 *
 * Employees sit at a round table and each attends only if seated beside
 * their favourite person (never themselves). Returns the most employees
 * that can attend.
 *
 * The favourites form a functional graph. One cycle longer than 2 can
 * fill the table alone. Every mutual pair, extended by the longest chain
 * of admirers leading into each of its two people, can sit side by side
 * with all the others. Trim the chains topologically, recording their
 * lengths, then measure the cycles left.
 *
 * @see https://leetcode.com/problems/maximum-employees-to-be-invited-to-a-meeting/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumEmployeesToBeInvitedToAMeeting([2, 2, 1, 2]); // 3
 */
export const maximumEmployeesToBeInvitedToAMeeting = (
	favorite: readonly number[],
): number => {
	const n = favorite.length;
	const admirers = new Array<number>(n).fill(0);
	for (const f of favorite) admirers[f] = (admirers[f] ?? 0) + 1;
	// The longest chain of people ending at each person, counting them.
	const chain = new Array<number>(n).fill(1);
	const queue = admirers.flatMap((count, person) => (count ? [] : [person]));
	for (let head = 0; head < queue.length; head++) {
		const person = queue[head] ?? 0;
		const next = favorite[person] ?? 0;
		chain[next] = Math.max(chain[next] ?? 0, (chain[person] ?? 0) + 1);
		admirers[next] = (admirers[next] ?? 0) - 1;
		if (admirers[next] === 0) queue.push(next);
	}

	let [longestCycle, pairs] = [0, 0];
	for (let start = 0; start < n; start++) {
		if (admirers[start] === 0) continue;
		let length = 0;
		for (let person = start; admirers[person] !== 0; length++) {
			admirers[person] = 0;
			person = favorite[person] ?? 0;
		}
		if (length === 2)
			pairs += (chain[start] ?? 0) + (chain[favorite[start] ?? 0] ?? 0);
		else longestCycle = Math.max(longestCycle, length);
	}
	return Math.max(longestCycle, pairs);
};
