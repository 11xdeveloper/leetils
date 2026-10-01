/**
 * 1491. Average Salary Excluding the Minimum and Maximum Salary
 *
 * Returns the average of the distinct salaries once the lowest and highest
 * are left out.
 *
 * One pass for the total, minimum and maximum.
 *
 * @see https://leetcode.com/problems/average-salary-excluding-the-minimum-and-maximum-salary/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * averageSalaryExcludingTheMinimumAndMaximumSalary([4000, 3000, 1000, 2000]); // 2500
 */
export const averageSalaryExcludingTheMinimumAndMaximumSalary = (
	salary: readonly number[],
): number => {
	let [total, low, high] = [0, Infinity, -Infinity];
	for (const pay of salary) {
		total += pay;
		low = Math.min(low, pay);
		high = Math.max(high, pay);
	}
	return (total - low - high) / (salary.length - 2);
};
