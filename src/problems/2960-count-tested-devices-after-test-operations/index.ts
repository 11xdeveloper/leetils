/**
 * 2960. Count Tested Devices After Test Operations
 *
 * Going through devices in order, testing one with battery above 0 drains
 * 1 from every later device. Returns how many devices get tested.
 *
 * A device has lost one per earlier test, so track the tests so far.
 *
 * @see https://leetcode.com/problems/count-tested-devices-after-test-operations/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countTestedDevicesAfterTestOperations([1, 1, 2, 1, 3]); // 3
 */
export const countTestedDevicesAfterTestOperations = (
	batteryPercentages: readonly number[],
): number => {
	let tested = 0;
	for (const battery of batteryPercentages) if (battery > tested) tested++;
	return tested;
};
