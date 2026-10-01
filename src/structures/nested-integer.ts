/**
 * An integer or a list of nested integers, matching the `NestedInteger`
 * class LeetCode provides for nested list problems.
 */
export class NestedInteger {
	#value: number | null;
	#list: NestedInteger[] = [];

	/** Holds `value` if given, otherwise an empty list. */
	constructor(value?: number) {
		this.#value = value ?? null;
	}

	/** Whether this holds a single integer rather than a list. */
	isInteger(): boolean {
		return this.#value !== null;
	}

	/** The integer held, or `null` when this holds a list. */
	getInteger(): number | null {
		return this.#value;
	}

	/** Makes this hold the single integer `value`. */
	setInteger(value: number): void {
		this.#value = value;
		this.#list = [];
	}

	/** Makes this hold a list, and appends `elem` to it. */
	add(elem: NestedInteger): void {
		this.#value = null;
		this.#list.push(elem);
	}

	/** The list held, or an empty list when this holds an integer. */
	getList(): NestedInteger[] {
		return this.#value === null ? this.#list : [];
	}
}

/** A nested list written as plain arrays, like `[[1, 1], 2, [1, 1]]`. */
export type NestedArray = readonly (number | NestedArray)[];

/**
 * Builds a list of nested integers from nested arrays, the format LeetCode
 * uses for nested list inputs.
 *
 * @example
 * nestedListFromArray([[1, 1], 2, [1, 1]]); // three NestedIntegers: a list, 2 and a list
 */
export const nestedListFromArray = (values: NestedArray): NestedInteger[] =>
	values.map((value) => {
		if (typeof value === "number") return new NestedInteger(value);
		const list = new NestedInteger();
		for (const child of nestedListFromArray(value)) list.add(child);
		return list;
	});

/**
 * Converts a list of nested integers back into nested arrays.
 *
 * @example
 * nestedListToArray(nestedListFromArray([[1, 1], 2])); // [[1, 1], 2]
 */
export const nestedListToArray = (
	list: readonly NestedInteger[],
): NestedArray =>
	list.map((item) => item.getInteger() ?? nestedListToArray(item.getList()));
