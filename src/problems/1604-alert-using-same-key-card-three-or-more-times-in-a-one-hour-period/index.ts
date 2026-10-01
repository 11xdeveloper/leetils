/**
 * 1604. Alert Using Same Key-Card Three or More Times in a One Hour Period
 *
 * Returns, sorted, the workers who used their key card three or more times
 * within one hour (an hour apart counts as within).
 *
 * Sorts each worker's times in minutes; they get an alert if some use is
 * within 60 minutes of the use two before it.
 *
 * @see https://leetcode.com/problems/alert-using-same-key-card-three-or-more-times-in-a-one-hour-period/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * alertUsingSameKeyCardThreeOrMoreTimesInAOneHourPeriod(["daniel", "daniel", "daniel"], ["10:00", "10:40", "11:00"]); // ["daniel"]
 */
export const alertUsingSameKeyCardThreeOrMoreTimesInAOneHourPeriod = (
	keyName: readonly string[],
	keyTime: readonly string[],
): string[] => {
	const times = new Map<string, number[]>();
	keyName.forEach((name, i) => {
		const [hours = 0, minutes = 0] = (keyTime[i] ?? "00:00")
			.split(":")
			.map(Number);
		const list = times.get(name) ?? [];
		list.push(hours * 60 + minutes);
		times.set(name, list);
	});
	const alerted: string[] = [];
	for (const [name, list] of times) {
		list.sort((a, b) => a - b);
		if (list.some((time, i) => i >= 2 && time - (list[i - 2] ?? 0) <= 60))
			alerted.push(name);
	}
	return alerted.sort();
};
