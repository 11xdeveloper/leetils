/**
 * 2073. Time Needed to Buy Tickets
 *
 * People queue to buy `tickets[i]` tickets, one per second, rejoining the
 * back after each purchase. Returns the seconds until person `k` is done.
 *
 * Everyone up to `k` buys at most `tickets[k]` before then; everyone after
 * `k` buys at most one fewer.
 *
 * @see https://leetcode.com/problems/time-needed-to-buy-tickets/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * timeNeededToBuyTickets([2, 3, 2], 2); // 6
 */
export const timeNeededToBuyTickets = (
	tickets: readonly number[],
	k: number,
): number => {
	const wanted = tickets[k] ?? 0;
	return tickets.reduce(
		(seconds, count, i) =>
			seconds + Math.min(count, i <= k ? wanted : wanted - 1),
		0,
	);
};
