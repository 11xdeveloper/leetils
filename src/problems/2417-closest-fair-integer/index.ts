/**
 * 2417. Closest Fair Integer
 *
 * A number is fair when it has as many even digits as odd ones. Returns
 * the smallest fair integer at least `n`.
 *
 * Fair numbers have even length. Search digit by digit from `n`'s digits,
 * raising one and filling the rest as small as possible (needed even
 * digits as 0s, then odd ones as 1s); with no fair number of `n`'s length
 * at least `n`, take the smallest of the next even length, `10…01…1`.
 *
 * @see https://leetcode.com/problems/closest-fair-integer/
 * @difficulty Medium
 * @timeComplexity O(d^2) for d digits
 * @spaceComplexity O(d)
 *
 * @example
 * closestFairInteger(403); // 1001
 */
export const closestFairInteger = (n: number): number => {
	const smallestOfLength = (length: number): number => {
		const half = length / 2;
		return Number(`1${"0".repeat(half)}${"1".repeat(half - 1)}`);
	};
	const digits = [...String(n)].map(Number);
	const length = digits.length;
	if (length % 2) return smallestOfLength(length + 1);

	/** The smallest fair completion of `prefix`, or undefined. */
	const complete = (prefix: number[]): number | undefined => {
		const evens = prefix.filter((d) => d % 2 === 0).length;
		const odds = prefix.length - evens;
		const [needEven, needOdd] = [length / 2 - evens, length / 2 - odds];
		if (needEven < 0 || needOdd < 0) return undefined;
		return Number(prefix.join("") + "0".repeat(needEven) + "1".repeat(needOdd));
	};
	const search = (position: number, prefix: number[]): number | undefined => {
		if (position === length) return complete(prefix);
		const own = digits[position] ?? 0;
		const tight = search(position + 1, [...prefix, own]);
		if (tight !== undefined) return tight;
		for (let digit = own + 1; digit <= 9; digit++) {
			const loose = complete([...prefix, digit]);
			if (loose !== undefined) return loose;
		}
		return undefined;
	};
	return search(0, []) ?? smallestOfLength(length + 2);
};
