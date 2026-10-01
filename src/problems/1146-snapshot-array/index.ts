/**
 * 1146. Snapshot Array
 *
 * An array of `length` zeros that can be `set`, `snap`ped (returning the
 * snapshot's id, counting from 0) and read with `get(index, snap_id)` as it
 * was at that snapshot.
 *
 * Each index keeps a history of `[snapshot id, value]` changes, with only
 * the last change per snapshot kept. `get` binary searches the history for
 * the last change made before that snapshot was taken.
 *
 * @see https://leetcode.com/problems/snapshot-array/
 * @difficulty Medium
 * @timeComplexity O(1) per set and snap, O(log s) per get for s changes to the index
 * @spaceComplexity O(length + sets)
 *
 * @example
 * const snapshots = new SnapshotArray(3);
 * snapshots.set(0, 5);
 * snapshots.snap(); // 0
 * snapshots.set(0, 6);
 * snapshots.get(0, 0); // 5
 */
export class SnapshotArray {
	readonly #history: [snapId: number, value: number][][];
	#snapId = 0;

	constructor(length: number) {
		this.#history = Array.from({ length }, () => [[0, 0]]);
	}

	set(index: number, val: number): void {
		const changes = this.#history[index];
		if (!changes) return;
		const last = changes.at(-1);
		if (last?.[0] === this.#snapId) last[1] = val;
		else changes.push([this.#snapId, val]);
	}

	snap(): number {
		return this.#snapId++;
	}

	get(index: number, snap_id: number): number {
		const changes = this.#history[index] ?? [];
		let [low, high] = [0, changes.length];
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((changes[mid]?.[0] ?? 0) <= snap_id) low = mid + 1;
			else high = mid;
		}
		return changes[low - 1]?.[1] ?? 0;
	}
}
