/**
 * 299. Bulls and Cows
 *
 * Scores a guess against a secret number of the same length, as the hint
 * `"xAyB"`: `x` bulls (digits in the right place) and `y` cows (digits in
 * the secret but in the wrong place, each secret digit counted at most
 * once).
 *
 * Counts bulls directly. For the other positions, a tally goes up for each
 * secret digit and down for each guessed digit; a secret digit whose tally
 * was negative, or a guessed digit whose tally was positive, pairs with an
 * earlier unmatched one and makes a cow.
 *
 * @see https://leetcode.com/problems/bulls-and-cows/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * bullsAndCows("1807", "7810"); // "1A3B"
 */
export const bullsAndCows = (secret: string, guess: string): string => {
	const tally = new Array<number>(10).fill(0);
	let bulls = 0;
	let cows = 0;

	for (let i = 0; i < secret.length; i++) {
		const s = Number(secret[i]);
		const g = Number(guess[i]);
		if (s === g) {
			bulls++;
			continue;
		}
		if ((tally[s] ?? 0) < 0) cows++;
		if ((tally[g] ?? 0) > 0) cows++;
		tally[s] = (tally[s] ?? 0) + 1;
		tally[g] = (tally[g] ?? 0) - 1;
	}

	return `${bulls}A${cows}B`;
};
