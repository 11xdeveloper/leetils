/**
 * 2120. Execution of All Suffix Instructions Staying in a Grid
 *
 * A robot at `startPos` on an `n × n` grid follows the moves `L`, `R`,
 * `U`, `D` of `s` starting from index `i`, stopping before it would leave
 * the grid. Returns, for each `i`, how many moves it makes.
 *
 * Simulate each suffix.
 *
 * @see https://leetcode.com/problems/execution-of-all-suffix-instructions-staying-in-a-grid/
 * @difficulty Medium
 * @timeComplexity O(m^2)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * executionOfAllSuffixInstructionsStayingInAGrid(3, [0, 1], "RRDDLU"); // [1, 5, 4, 3, 1, 0]
 */
export const executionOfAllSuffixInstructionsStayingInAGrid = (
	n: number,
	startPos: readonly number[],
	s: string,
): number[] => {
	const moves: Record<string, [number, number]> = {
		L: [0, -1],
		R: [0, 1],
		U: [-1, 0],
		D: [1, 0],
	};
	return Array.from(s, (_, start) => {
		let [row = 0, col = 0] = startPos;
		let count = 0;
		for (const char of s.slice(start)) {
			const [dr, dc] = moves[char] ?? [0, 0];
			[row, col] = [row + dr, col + dc];
			if (row < 0 || row >= n || col < 0 || col >= n) break;
			count++;
		}
		return count;
	});
};
