/**
 * 1058. Minimize Rounding Error to Meet Target
 *
 * Rounds each price (a string with three decimals) up or down so that the
 * rounded prices sum to `target`, minimising the total rounding error.
 * Returns that error with three decimals, or `"-1"` if the target can't be
 * met.
 *
 * Rounding everything down gives the smallest sum; each non-integer price
 * rounded up adds 1. So the number to round up is fixed, and the cheapest
 * choice rounds up the prices with the largest fractional parts. Working in
 * thousandths keeps the arithmetic exact.
 *
 * @see https://leetcode.com/problems/minimize-rounding-error-to-meet-target/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimizeRoundingErrorToMeetTarget(["0.700", "2.800", "4.900"], 8); // "1.000"
 */
export const minimizeRoundingErrorToMeetTarget = (
	prices: readonly string[],
	target: number,
): string => {
	let floorSum = 0;
	const fractions: number[] = [];
	for (const price of prices) {
		const thousandths = Math.round(Number(price) * 1000);
		floorSum += Math.floor(thousandths / 1000);
		if (thousandths % 1000 !== 0) fractions.push(thousandths % 1000);
	}

	const roundUp = target - floorSum;
	if (roundUp < 0 || roundUp > fractions.length) return "-1";
	fractions.sort((a, b) => b - a);
	let error = 0;
	for (const [i, fraction] of fractions.entries())
		error += i < roundUp ? 1000 - fraction : fraction;
	return (error / 1000).toFixed(3);
};
