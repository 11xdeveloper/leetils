/**
 * 949. Largest Time for Given Digits
 *
 * Returns the latest valid 24-hour time `"HH:MM"` using each of the four
 * digits in `arr` exactly once, or `""` if none is valid.
 *
 * Tries all 24 orderings of the digits and keeps the latest valid time.
 *
 * @see https://leetcode.com/problems/largest-time-for-given-digits/
 * @difficulty Medium
 * @timeComplexity O(1): 24 orderings
 * @spaceComplexity O(1)
 *
 * @example
 * largestTimeForGivenDigits([1, 2, 3, 4]); // "23:41"
 */
export const largestTimeForGivenDigits = (arr: readonly number[]): string => {
	let best = -1;
	for (let a = 0; a < 4; a++) {
		for (let b = 0; b < 4; b++) {
			for (let c = 0; c < 4; c++) {
				if (a === b || a === c || b === c) continue;
				const d = 6 - a - b - c;
				const hours = (arr[a] ?? 0) * 10 + (arr[b] ?? 0);
				const minutes = (arr[c] ?? 0) * 10 + (arr[d] ?? 0);
				if (hours < 24 && minutes < 60)
					best = Math.max(best, hours * 60 + minutes);
			}
		}
	}
	if (best < 0) return "";
	return `${String(Math.floor(best / 60)).padStart(2, "0")}:${String(best % 60).padStart(2, "0")}`;
};
