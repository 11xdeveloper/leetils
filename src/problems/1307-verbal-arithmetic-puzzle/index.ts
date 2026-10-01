/**
 * 1307. Verbal Arithmetic Puzzle
 *
 * Returns whether distinct digits can be given to the letters so that the
 * `words`, read as numbers without leading zeros, add up to `result`.
 *
 * Each letter contributes its digit times a weight: the sum of its place
 * values across the words, minus those in the result. The puzzle is
 * solvable when some assignment makes the weighted total 0. Backtracking
 * assigns letters in order of decreasing weight and abandons a branch once
 * the remaining letters can't bring the total back to 0.
 *
 * @see https://leetcode.com/problems/verbal-arithmetic-puzzle/
 * @difficulty Hard
 * @timeComplexity O(10!) in the worst case, far less with pruning
 * @spaceComplexity O(1), at most 10 letters
 *
 * @example
 * verbalArithmeticPuzzle(["SEND", "MORE"], "MONEY"); // true
 */
export const verbalArithmeticPuzzle = (
	words: readonly string[],
	result: string,
): boolean => {
	const weight = new Map<string, number>();
	const leading = new Set<string>();
	const add = (word: string, sign: number) => {
		let place = 1;
		for (let i = word.length - 1; i >= 0; i--) {
			const char = word[i] ?? "";
			weight.set(char, (weight.get(char) ?? 0) + sign * place);
			place *= 10;
		}
		if (word.length > 1) leading.add(word[0] ?? "");
	};
	for (const word of words) add(word, 1);
	add(result, -1);

	const letters = [...weight.keys()].sort(
		(a, b) => Math.abs(weight.get(b) ?? 0) - Math.abs(weight.get(a) ?? 0),
	);
	const weights = letters.map((letter) => weight.get(letter) ?? 0);
	// remaining[i] bounds how far letters i and after can move the total.
	const remaining = new Array<number>(letters.length + 1).fill(0);
	for (let i = letters.length - 1; i >= 0; i--) {
		remaining[i] = (remaining[i + 1] ?? 0) + 9 * Math.abs(weights[i] ?? 0);
	}
	const used = new Array<boolean>(10).fill(false);
	const assign = (i: number, total: number): boolean => {
		if (i === letters.length) return total === 0;
		if (Math.abs(total) > (remaining[i] ?? 0)) return false;
		const lowest = leading.has(letters[i] ?? "") ? 1 : 0;
		for (let digit = lowest; digit <= 9; digit++) {
			if (used[digit]) continue;
			used[digit] = true;
			const found = assign(i + 1, total + digit * (weights[i] ?? 0));
			used[digit] = false;
			if (found) return true;
		}
		return false;
	};
	return assign(0, 0);
};
