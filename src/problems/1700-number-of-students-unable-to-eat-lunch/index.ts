/**
 * 1700. Number of Students Unable to Eat Lunch
 *
 * Students in a queue take the top sandwich if it's their preferred type
 * (0 or 1), and otherwise go to the back. Returns how many are left when
 * no one in the queue wants the top sandwich.
 *
 * The queue order never matters, only how many students want each type:
 * serve the sandwiches in order until one has no takers.
 *
 * @see https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfStudentsUnableToEatLunch([1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]); // 3
 */
export const numberOfStudentsUnableToEatLunch = (
	students: readonly number[],
	sandwiches: readonly number[],
): number => {
	const wanting = [0, 0];
	for (const student of students)
		wanting[student] = (wanting[student] ?? 0) + 1;
	for (const [served, sandwich] of sandwiches.entries()) {
		if ((wanting[sandwich] ?? 0) === 0) return sandwiches.length - served;
		wanting[sandwich] = (wanting[sandwich] ?? 0) - 1;
	}
	return 0;
};
