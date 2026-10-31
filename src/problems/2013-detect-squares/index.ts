/**
 * 2013. Detect Squares
 *
 * Stores points (duplicates allowed) and counts the ways to pick three
 * stored points that form an axis-aligned square of positive area with a
 * query point.
 *
 * Count points by coordinate. For a query, every stored point on a
 * diagonal from it fixes a square; multiply the counts of its corners.
 *
 * @see https://leetcode.com/problems/detect-squares/
 * @difficulty Medium
 * @timeComplexity O(1) per add, O(p) per count over p distinct points
 * @spaceComplexity O(p)
 *
 * @example
 * const squares = new DetectSquares();
 * squares.add([3, 10]);
 * squares.add([11, 2]);
 * squares.add([3, 2]);
 * squares.count([11, 10]); // 1
 */
export class DetectSquares {
	readonly #counts = new Map<number, number>();

	add(point: readonly number[]): void {
		const key = DetectSquares.#key(point[0] ?? 0, point[1] ?? 0);
		this.#counts.set(key, (this.#counts.get(key) ?? 0) + 1);
	}

	count(point: readonly number[]): number {
		const [x = 0, y = 0] = point;
		let squares = 0;
		for (const [key, count] of this.#counts) {
			const [px, py] = [Math.floor(key / 1001), key % 1001];
			if (Math.abs(px - x) !== Math.abs(py - y) || px === x) continue;
			squares +=
				count *
				(this.#counts.get(DetectSquares.#key(x, py)) ?? 0) *
				(this.#counts.get(DetectSquares.#key(px, y)) ?? 0);
		}
		return squares;
	}

	static #key(x: number, y: number): number {
		return x * 1001 + y;
	}
}
