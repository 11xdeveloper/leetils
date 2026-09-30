/**
 * 838. Push Dominoes
 *
 * `dominoes` shows each domino pushed left (`L`), right (`R`) or standing
 * (`.`). Each second, falling dominoes push their standing neighbours the
 * same way, and a domino pushed from both sides at once stays up. Returns
 * the final state.
 *
 * Looks at each stretch of standing dominoes between two pushed ones:
 * between `R` and `L` they fall inwards (the middle one stays up if the
 * count is odd), between equal letters they all fall that way, and between
 * `L` and `R` they stay up. The ends act as `L` on the left and `R` on the
 * right.
 *
 * @see https://leetcode.com/problems/push-dominoes/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * pushDominoes(".L.R...LR..L.."); // "LL.RR.LLRRLL.."
 */
export const pushDominoes = (dominoes: string): string => {
	const padded = `L${dominoes}R`;
	const result = [...padded];
	let left = 0;
	for (let right = 1; right < padded.length; right++) {
		if (padded.charAt(right) === ".") continue;
		const [a, b] = [padded.charAt(left), padded.charAt(right)];
		if (a === b) {
			result.fill(a, left + 1, right);
		} else if (a === "R" && b === "L") {
			const gap = right - left - 1;
			result.fill("R", left + 1, left + 1 + Math.floor(gap / 2));
			result.fill("L", right - Math.floor(gap / 2), right);
		}
		left = right;
	}
	return result.slice(1, -1).join("");
};
