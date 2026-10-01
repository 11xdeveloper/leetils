/**
 * 842. Split Array into Fibonacci Sequence
 *
 * Splits the digit string `num` into a Fibonacci-like sequence: at least
 * three numbers below 2^31, no leading zeros (except 0 itself), each the
 * sum of the two before. Returns any such sequence, or `[]` if there's
 * none.
 *
 * The first two numbers determine the rest, so it tries every choice of
 * them and checks whether the digits that follow spell the sums.
 *
 * @see https://leetcode.com/problems/split-array-into-fibonacci-sequence/
 * @difficulty Medium
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n)
 *
 * @example
 * splitArrayIntoFibonacciSequence("1101111"); // [11, 0, 11, 11]
 */
export const splitArrayIntoFibonacciSequence = (num: string): number[] => {
	const LIMIT = 2 ** 31 - 1;
	const valid = (part: string): boolean =>
		part.length > 0 &&
		(part === "0" || !part.startsWith("0")) &&
		Number(part) <= LIMIT;

	for (let i = 1; i <= Math.min(10, num.length); i++) {
		const first = num.slice(0, i);
		if (!valid(first)) break;
		for (let j = i + 1; j <= Math.min(i + 10, num.length); j++) {
			const second = num.slice(i, j);
			if (!valid(second)) break;
			const sequence = [Number(first), Number(second)];
			let position = j;
			while (position < num.length) {
				const next = (sequence.at(-1) ?? 0) + (sequence.at(-2) ?? 0);
				const text = String(next);
				if (next > LIMIT || !num.startsWith(text, position)) break;
				sequence.push(next);
				position += text.length;
			}
			if (position === num.length && sequence.length >= 3) return sequence;
		}
	}
	return [];
};
