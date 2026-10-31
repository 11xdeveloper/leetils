/**
 * 2796. Repeat String
 *
 * `String.prototype.replicate(times)`: the string repeated `times` times,
 * without `String.prototype.repeat`. Install it with
 * `String.prototype.replicate = repeatString`, or call it with
 * `repeatString.call(text, times)`.
 *
 * Repeated doubling: append the current power of the string whenever the
 * matching bit of `times` is set.
 *
 * @see https://leetcode.com/problems/repeat-string/
 * @difficulty Easy
 * @timeComplexity O(n · times)
 * @spaceComplexity O(n · times)
 *
 * @example
 * repeatString.call("hello", 2); // "hellohello"
 */
export function repeatString(this: string, times: number): string {
	let result = "";
	let power = String(this);
	for (let n = times; n > 0; n = Math.floor(n / 2)) {
		if (n % 2 === 1) result += power;
		power += power;
	}
	return result;
}
