/**
 * 2446. Determine if Two Events Have Conflict
 *
 * Returns whether two inclusive "HH:MM" time ranges on the same day
 * overlap.
 *
 * Zero-padded times compare correctly as strings.
 *
 * @see https://leetcode.com/problems/determine-if-two-events-have-conflict/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * determineIfTwoEventsHaveConflict(["01:15", "02:00"], ["02:00", "03:00"]); // true
 */
export const determineIfTwoEventsHaveConflict = (
	event1: readonly string[],
	event2: readonly string[],
): boolean => {
	const [start1 = "", end1 = ""] = event1;
	const [start2 = "", end2 = ""] = event2;
	return start1 <= end2 && start2 <= end1;
};
