import type { ListNode } from "../../structures/list-node";

/**
 * 3062. Winner of the Linked List Game
 *
 * A list of even length is split into pairs of neighbours. Each pair gives
 * a point to "Even" if its first (even-indexed) value is higher, or to
 * "Odd" if the second is. Returns the team with more points, or "Tie".
 *
 * Walk the list two nodes at a time, tallying the difference in points.
 *
 * @see https://leetcode.com/problems/winner-of-the-linked-list-game/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * winnerOfTheLinkedListGame(listFromArray([2, 5, 4, 7, 20, 5])); // "Odd"
 */
export const winnerOfTheLinkedListGame = (
	head: ListNode | null,
): "Even" | "Odd" | "Tie" => {
	let score = 0;
	for (let node = head; node?.next; node = node.next.next)
		score += Math.sign(node.val - node.next.val);
	return score > 0 ? "Even" : score < 0 ? "Odd" : "Tie";
};
