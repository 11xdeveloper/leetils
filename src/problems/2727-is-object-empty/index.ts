/**
 * 2727. Is Object Empty
 *
 * Whether a JSON object has no keys, or a JSON array has no elements.
 *
 * Stop at the first own enumerable key, so large objects aren't scanned.
 *
 * @see https://leetcode.com/problems/is-object-empty/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * isObjectEmpty({}); // true
 * isObjectEmpty([null]); // false
 */
export function isObjectEmpty(obj: object): boolean {
	for (const key in obj) if (Object.hasOwn(obj, key)) return false;
	return true;
}
