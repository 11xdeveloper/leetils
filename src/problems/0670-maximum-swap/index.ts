/**
 * 670. Maximum Swap
 *
 * Returns the largest number obtainable by swapping two digits of `num` at
 * most once.
 *
 * The best swap raises the leftmost digit that can be raised, using the
 * largest digit to its right (its last occurrence, which moves the
 * smaller digit furthest right). It records each digit's last position,
 * then finds the first digit with a larger digit later.
 *
 * @see https://leetcode.com/problems/maximum-swap/
 * @difficulty Medium
 * @timeComplexity O(d) for d digits
 * @spaceComplexity O(d)
 *
 * @example
 * maximumSwap(2736); // 7236
 */
export const maximumSwap = (num: number): number => {
	const digits = [...String(num)].map(Number);
	const last = new Array<number>(10).fill(-1);
	for (const [i, digit] of digits.entries()) last[digit] = i;

	for (const [i, digit] of digits.entries()) {
		for (let larger = 9; larger > digit; larger--) {
			const at = last[larger] ?? -1;
			if (at > i) {
				[digits[i], digits[at]] = [larger, digit];
				return Number(digits.join(""));
			}
		}
	}

	return num;
};
