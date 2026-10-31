/**
 * 3918. Sum of Primes Between Number and Its Reverse
 *
 * Adds the primes between `n` and its digits reversed, inclusive.
 *
 * @see https://leetcode.com/problems/sum-of-primes-between-number-and-its-reverse/
 * @difficulty Medium
 * @timeComplexity O(V log log V)
 * @spaceComplexity O(V)
 *
 * @example
 * sumOfPrimesBetweenNumberAndItsReverse(13); // 132
 */
export const sumOfPrimesBetweenNumberAndItsReverse = (n: number): number => {
	const reversed = Number([...String(n)].reverse().join(""));
	const [low, high] = [Math.min(n, reversed), Math.max(n, reversed)];
	const composite = new Uint8Array(high + 1);
	let sum = 0;
	for (let p = 2; p <= high; p++) {
		if (composite[p]) continue;
		for (let x = p * p; x <= high; x += p) composite[x] = 1;
		if (p >= low) sum += p;
	}
	return sum;
};
