/**
 * 1826. Faulty Sensor
 *
 * At most one sensor dropped one reading, shifting the rest left and
 * filling its last slot with a different value. Returns the faulty
 * sensor (1 or 2), or -1 if there is none or it can't be determined.
 *
 * Skip the common prefix. If the sensors first differ before the last
 * reading, a faulty sensor's remaining readings are the other's shifted
 * left by one; it's decidable only when exactly one sensor fits that.
 *
 * @see https://leetcode.com/problems/faulty-sensor/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * faultySensor([2, 3, 4, 5], [2, 1, 3, 4]); // 1
 */
export const faultySensor = (
	sensor1: readonly number[],
	sensor2: readonly number[],
): number => {
	const n = sensor1.length;
	let first = 0;
	while (first < n && sensor1[first] === sensor2[first]) first++;
	if (first >= n - 1) return -1;
	const shiftedFrom = (
		faulty: readonly number[],
		correct: readonly number[],
	) => {
		for (let i = first; i < n - 1; i++)
			if (faulty[i] !== correct[i + 1]) return false;
		return true;
	};
	const [oneFaulty, twoFaulty] = [
		shiftedFrom(sensor1, sensor2),
		shiftedFrom(sensor2, sensor1),
	];
	if (oneFaulty === twoFaulty) return -1;
	return oneFaulty ? 1 : 2;
};
