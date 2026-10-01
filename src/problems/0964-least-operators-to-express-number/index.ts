/**
 * 964. Least Operators to Express Number
 *
 * Writes `target` as an expression of copies of `x` joined by `+`, `-`, `*`
 * and `/` (usual precedence, no parentheses or unary minus). Returns the
 * fewest operators needed.
 *
 * Such an expression is a sum of signed powers `±x^e`. A power `x^e` costs
 * `e` operators (`e - 1` multiplications plus its sign), and `x^0 = x / x`
 * costs 2. Reading `target` in base `x` from the lowest digit, each digit
 * is made either from that many powers (`pos`) or by overshooting with one
 * more power of the next place and subtracting (`neg`, which carries 1).
 * The leading sign isn't written, hence the final `- 1`.
 *
 * @see https://leetcode.com/problems/least-operators-to-express-number/
 * @difficulty Hard
 * @timeComplexity O(log_x target)
 * @spaceComplexity O(1)
 *
 * @example
 * leastOperatorsToExpressNumber(3, 19); // 5: 3 * 3 + 3 * 3 + 3 / 3
 */
export const leastOperatorsToExpressNumber = (
	x: number,
	target: number,
): number => {
	let pos = 0;
	let neg = 0;
	let place = 0;
	for (; target > 0; place++, target = Math.floor(target / x)) {
		const digit = target % x;
		if (place === 0) {
			pos = digit * 2;
			neg = (x - digit) * 2;
		} else {
			[pos, neg] = [
				Math.min(digit * place + pos, (digit + 1) * place + neg),
				Math.min((x - digit) * place + pos, (x - digit - 1) * place + neg),
			];
		}
	}
	return Math.min(pos, place + neg) - 1;
};
