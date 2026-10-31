/**
 * 2618. Check if Object Instance of Class
 *
 * Whether `obj` is an instance of `classFunction` or one of its subclasses.
 * Unlike `instanceof`, primitives count as instances of their wrapper
 * classes, so `5` is an instance of `Number`. Anything that isn't a function
 * is not a class.
 *
 * Box the value with `Object` and walk its prototype chain, looking for
 * `classFunction.prototype`.
 *
 * @see https://leetcode.com/problems/check-if-object-instance-of-class/
 * @difficulty Medium
 * @timeComplexity O(d), where d is the depth of the prototype chain
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfObjectInstanceOfClass(new Date(), Date); // true
 * checkIfObjectInstanceOfClass(5, Number); // true
 */
export function checkIfObjectInstanceOfClass(
	obj: unknown,
	classFunction: unknown,
): boolean {
	if (obj === null || obj === undefined || typeof classFunction !== "function")
		return false;
	const target: unknown = classFunction.prototype;
	for (
		let proto: unknown = Object.getPrototypeOf(Object(obj));
		proto !== null;
		proto = Object.getPrototypeOf(proto)
	)
		if (proto === target) return true;
	return false;
}
