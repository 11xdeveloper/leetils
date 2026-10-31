/**
 * 2303. Calculate Amount Paid in Taxes
 *
 * Income up to each bracket's `upper` bound (above the previous one) is
 * taxed at its `percent`. Returns the tax on `income`.
 *
 * Tax each bracket's slice of the income.
 *
 * @see https://leetcode.com/problems/calculate-amount-paid-in-taxes/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * calculateAmountPaidInTaxes([[3, 50], [7, 10], [12, 25]], 10); // 2.65
 */
export const calculateAmountPaidInTaxes = (
	brackets: readonly (readonly number[])[],
	income: number,
): number => {
	let [tax, lower] = [0, 0];
	for (const [upper = 0, percent = 0] of brackets) {
		tax += (Math.max(0, Math.min(income, upper) - lower) * percent) / 100;
		lower = upper;
	}
	return tax;
};
