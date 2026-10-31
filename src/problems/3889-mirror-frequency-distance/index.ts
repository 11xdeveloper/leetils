/**
 * 3889. Mirror Frequency Distance
 *
 * A letter's mirror counts from the other end of the alphabet (a and z),
 * a digit's from the other end of 0-9. Adds up |freq(c) - freq(mirror)|
 * over each mirror pair once.
 *
 * @see https://leetcode.com/problems/mirror-frequency-distance/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * mirrorFrequencyDistance("ab1z9"); // 3
 */
export const mirrorFrequencyDistance = (s: string): number => {
	const counts = new Map<string, number>();
	for (const c of s) counts.set(c, (counts.get(c) ?? 0) + 1);
	const freq = (code: number) => counts.get(String.fromCharCode(code)) ?? 0;
	let total = 0;
	for (let i = 0; i < 13; i++) total += Math.abs(freq(97 + i) - freq(122 - i));
	for (let i = 0; i < 5; i++) total += Math.abs(freq(48 + i) - freq(57 - i));
	return total;
};
