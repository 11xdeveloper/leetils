/**
 * 1449. Form Largest Integer With Digits That Add up to Target
 *
 * Digit `d` costs `cost[d − 1]`. Returns the largest number (as a string)
 * whose digits cost exactly `target`, or `"0"` if there's none.
 *
 * More digits always wins, so first find the most digits each total can
 * buy (an unbounded knapsack). Then build the number from the front,
 * taking the largest digit that still leaves a total with the right number
 * of digits remaining.
 *
 * @see https://leetcode.com/problems/form-largest-integer-with-digits-that-add-up-to-target/
 * @difficulty Hard
 * @timeComplexity O(9 · target)
 * @spaceComplexity O(target)
 *
 * @example
 * formLargestIntegerWithDigitsThatAddUpToTarget([4, 3, 2, 5, 6, 7, 2, 5, 5], 9); // "7772"
 */
export const formLargestIntegerWithDigitsThatAddUpToTarget = (
	cost: readonly number[],
	target: number,
): string => {
	const most = new Array<number>(target + 1).fill(-Infinity);
	most[0] = 0;
	for (let total = 1; total <= target; total++) {
		for (const price of cost) {
			if (price <= total)
				most[total] = Math.max(
					most[total] ?? -Infinity,
					(most[total - price] ?? -Infinity) + 1,
				);
		}
	}
	if ((most[target] ?? -Infinity) < 1) return "0";
	let result = "";
	for (let left = target; left > 0; ) {
		for (let digit = 9; digit >= 1; digit--) {
			const price = cost[digit - 1] ?? Infinity;
			if (
				price <= left &&
				(most[left - price] ?? -Infinity) === (most[left] ?? 0) - 1
			) {
				result += digit;
				left -= price;
				break;
			}
		}
	}
	return result;
};
