/**
 * 752. Open the Lock
 *
 * A lock has four wheels of digits 0–9, starting at `"0000"`. Each move
 * turns one wheel one step either way (9 wraps to 0). Returns the fewest
 * moves to reach `target` without ever showing one of the `deadends`, or
 * -1 if it can't be done.
 *
 * Breadth-first search over the 10,000 combinations, treating dead ends as
 * already visited.
 *
 * @see https://leetcode.com/problems/open-the-lock/
 * @difficulty Medium
 * @timeComplexity O(10^4 · 8)
 * @spaceComplexity O(10^4)
 *
 * @example
 * openTheLock(["0201", "0101", "0102", "1212", "2002"], "0202"); // 6
 */
export const openTheLock = (
	deadends: readonly string[],
	target: string,
): number => {
	const seen = new Set(deadends);
	if (seen.has("0000")) return -1;
	seen.add("0000");
	let frontier = ["0000"];

	for (let moves = 0; frontier.length > 0; moves++) {
		const next: string[] = [];
		for (const combination of frontier) {
			if (combination === target) return moves;
			for (let wheel = 0; wheel < 4; wheel++) {
				const digit = Number(combination.charAt(wheel));
				for (const turned of [(digit + 1) % 10, (digit + 9) % 10]) {
					const candidate =
						combination.slice(0, wheel) + turned + combination.slice(wheel + 1);
					if (!seen.has(candidate)) {
						seen.add(candidate);
						next.push(candidate);
					}
				}
			}
		}
		frontier = next;
	}

	return -1;
};
