import { Heap } from "../../internal/heap";

/**
 * 3391. Design a 3D Binary Matrix with Efficient Layer Tracking
 *
 * An n × n × n binary matrix supporting `setCell(x, y, z)`,
 * `unsetCell(x, y, z)`, and `largestMatrix()`: the layer x with the most
 * 1s, the largest x on a tie.
 *
 * Count the 1s per layer and keep a heap of (count, layer) snapshots,
 * skipping stale ones when reading the top.
 *
 * @see https://leetcode.com/problems/design-a-3d-binary-matrix-with-efficient-layer-tracking/
 * @difficulty Medium
 * @timeComplexity O(log q) per operation, amortised
 * @spaceComplexity O(n + q)
 *
 * @example
 * const matrix = new DesignA3dBinaryMatrixWithEfficientLayerTracking(3);
 * matrix.setCell(0, 0, 0);
 * matrix.largestMatrix(); // 0
 */
export class DesignA3dBinaryMatrixWithEfficientLayerTracking {
	readonly #cells = new Set<string>();
	readonly #counts: number[];
	readonly #layers = new Heap<[count: number, layer: number]>(
		(a, b) => b[0] - a[0] || b[1] - a[1],
	);

	constructor(n: number) {
		this.#counts = new Array<number>(n).fill(0);
		for (let x = 0; x < n; x++) this.#layers.push([0, x]);
	}

	setCell(x: number, y: number, z: number): void {
		this.#change(x, `${x},${y},${z}`, true);
	}

	unsetCell(x: number, y: number, z: number): void {
		this.#change(x, `${x},${y},${z}`, false);
	}

	largestMatrix(): number {
		for (
			let top = this.#layers.peek();
			top && this.#counts[top[1]] !== top[0];
			top = this.#layers.peek()
		)
			this.#layers.pop();
		return this.#layers.peek()?.[1] ?? 0;
	}

	#change(x: number, key: string, set: boolean): void {
		if (this.#cells.has(key) === set) return;
		if (set) this.#cells.add(key);
		else this.#cells.delete(key);
		const count = (this.#counts[x] ?? 0) + (set ? 1 : -1);
		this.#counts[x] = count;
		this.#layers.push([count, x]);
	}
}
