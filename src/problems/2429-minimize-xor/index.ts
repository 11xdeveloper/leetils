/**
 * 2429. Minimize XOR
 *
 * Returns the `x` with as many set bits as `num2` that minimises
 * `x ^ num1`.
 *
 * Match `num1`'s highest set bits first, then fill the lowest unset ones.
 *
 * @see https://leetcode.com/problems/minimize-xor/
 * @difficulty Medium
 * @timeComplexity O(log max)
 * @spaceComplexity O(1)
 *
 * @example
 * minimizeXor(3, 5); // 3
 */
export const minimizeXor = (num1: number, num2: number): number => {
	let bits = 0;
	for (let rest = num2; rest; rest &= rest - 1) bits++;
	let x = 0;
	for (let bit = 30; bit >= 0 && bits; bit--) {
		if (num1 & (1 << bit)) {
			x |= 1 << bit;
			bits--;
		}
	}
	for (let bit = 0; bit <= 30 && bits; bit++) {
		if (!(x & (1 << bit))) {
			x |= 1 << bit;
			bits--;
		}
	}
	return x;
};
