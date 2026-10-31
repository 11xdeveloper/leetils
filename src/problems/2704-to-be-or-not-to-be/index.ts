/**
 * 2704. To Be Or Not To Be
 *
 * A tiny assertion helper: `expect(val).toBe(other)` returns true if the
 * values are `===` and throws `Error("Not Equal")` otherwise, and
 * `notToBe(other)` returns true if they're not and throws `Error("Equal")`
 * if they are.
 *
 * Compare with `===` in each method.
 *
 * @see https://leetcode.com/problems/to-be-or-not-to-be/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * toBeOrNotToBe(5).toBe(5); // true
 * toBeOrNotToBe(5).notToBe(5); // throws Error("Equal")
 */
export function toBeOrNotToBe(val: unknown): {
	toBe: (other: unknown) => true;
	notToBe: (other: unknown) => true;
} {
	return {
		toBe: (other) => {
			if (val !== other) throw new Error("Not Equal");
			return true;
		},
		notToBe: (other) => {
			if (val === other) throw new Error("Equal");
			return true;
		},
	};
}
