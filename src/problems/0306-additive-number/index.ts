/**
 * 306. Additive Number
 *
 * Returns whether the digit string `num` is an additive number: it splits
 * into at least three numbers, without leading zeros, where each number
 * after the first two is the sum of the two before it.
 *
 * The first two numbers determine the rest, so it tries every choice of
 * them and checks whether the sums spell out the remainder of `num`. BigInt
 * keeps the sums exact however long the numbers get.
 *
 * @see https://leetcode.com/problems/additive-number/
 * @difficulty Medium
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n)
 *
 * @example
 * additiveNumber("112358"); // true: 1, 1, 2, 3, 5, 8
 * additiveNumber("199100199"); // true: 1, 99, 100, 199
 */
export const additiveNumber = (num: string): boolean => {
	const valid = (part: string): boolean => part.length === 1 || part[0] !== "0";

	for (let firstEnd = 1; firstEnd < num.length; firstEnd++) {
		for (let secondEnd = firstEnd + 1; secondEnd < num.length; secondEnd++) {
			const first = num.slice(0, firstEnd);
			const second = num.slice(firstEnd, secondEnd);
			if (!valid(first) || !valid(second)) continue;

			let [a, b] = [BigInt(first), BigInt(second)];
			let position = secondEnd;
			while (position < num.length) {
				const sum = String(a + b);
				if (!num.startsWith(sum, position)) break;
				position += sum.length;
				[a, b] = [b, a + b];
			}
			if (position === num.length) return true;
		}
	}

	return false;
};
