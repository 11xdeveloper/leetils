type Primitive = string | number | boolean | null;
type Json = Primitive | readonly Json[] | { readonly [key: string]: Json };

/**
 * 2675. Array of Objects to Matrix
 *
 * Turn an array of objects into a matrix. The first row lists every path to
 * a primitive value in any of the objects (keys joined with dots, array
 * indices included), sorted lexicographically. Each later row holds one
 * object's values for those paths, with `""` where the object doesn't have
 * one.
 *
 * Flatten each object into a map from path to value, collect and sort the
 * paths, then read every row's values off its map.
 *
 * @see https://leetcode.com/problems/array-of-objects-to-matrix/
 * @difficulty Hard
 * @timeComplexity O(n · k + k log k), for n objects and k distinct paths
 * @spaceComplexity O(n · k)
 *
 * @example
 * arrayOfObjectsToMatrix([{ b: 1, a: 2 }, { b: 3, a: 4 }]); // [["a", "b"], [2, 1], [4, 3]]
 */
export function arrayOfObjectsToMatrix(arr: readonly Json[]): Primitive[][] {
	const rows = arr.map((object) => {
		const values = new Map<string, Primitive>();
		const flatten = (value: Json, path: string): void => {
			if (value === null || typeof value !== "object") values.set(path, value);
			else
				for (const [key, child] of Object.entries(value))
					flatten(child, path === "" ? key : `${path}.${key}`);
		};
		flatten(object, "");
		return values;
	});
	const keys = [...new Set(rows.flatMap((row) => [...row.keys()]))].sort();
	return [
		keys,
		...rows.map((row) =>
			keys.map((key) => (row.has(key) ? (row.get(key) as Primitive) : "")),
		),
	];
}
