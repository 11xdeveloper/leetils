/**
 * 3433. Count Mentions Per User
 *
 * Process `MESSAGE` events (mentioning user IDs, `ALL` or `HERE`) and
 * `OFFLINE` events (a user goes offline for 60 time units). Returns how
 * many times each user is mentioned; `HERE` only counts online users, and
 * at the same moment offline events happen first.
 *
 * Sort the events by time with offline events first, track when each user
 * comes back online, and tally the mentions.
 *
 * @see https://leetcode.com/problems/count-mentions-per-user/
 * @difficulty Medium
 * @timeComplexity O(e log e + e · n)
 * @spaceComplexity O(n)
 *
 * @example
 * countMentionsPerUser(2, [["MESSAGE", "10", "id1 id0"], ["OFFLINE", "11", "0"], ["MESSAGE", "71", "HERE"]]); // [2, 2]
 */
export const countMentionsPerUser = (
	numberOfUsers: number,
	events: readonly (readonly string[])[],
): number[] => {
	const mentions = new Array<number>(numberOfUsers).fill(0);
	const backAt = new Array<number>(numberOfUsers).fill(0);
	const sorted = events.toSorted(
		(a, b) =>
			Number(a[1]) - Number(b[1]) ||
			(a[0] === "OFFLINE" ? -1 : 0) - (b[0] === "OFFLINE" ? -1 : 0),
	);
	for (const [type = "", time = "0", text = ""] of sorted) {
		const now = Number(time);
		if (type === "OFFLINE") {
			backAt[Number(text)] = now + 60;
			continue;
		}
		if (text === "ALL")
			for (let user = 0; user < numberOfUsers; user++)
				mentions[user] = (mentions[user] ?? 0) + 1;
		else if (text === "HERE") {
			for (let user = 0; user < numberOfUsers; user++)
				if ((backAt[user] ?? 0) <= now)
					mentions[user] = (mentions[user] ?? 0) + 1;
		} else
			for (const token of text.split(" ")) {
				const user = Number(token.slice(2));
				mentions[user] = (mentions[user] ?? 0) + 1;
			}
	}
	return mentions;
};
