import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { SnapshotArray } from ".";

describe("1146. Snapshot Array", () => {
	it("solves the example from the problem statement", () => {
		const snapshots = new SnapshotArray(3);
		snapshots.set(0, 5);
		expect(snapshots.snap()).toBe(0);
		snapshots.set(0, 6);
		expect(snapshots.get(0, 0)).toBe(5);
	});

	it("keeps the last value set before each snapshot", () => {
		const snapshots = new SnapshotArray(1);
		snapshots.snap();
		snapshots.set(0, 4);
		snapshots.set(0, 7);
		snapshots.snap();
		snapshots.snap();
		expect([0, 1, 2].map((id) => snapshots.get(0, id))).toEqual([0, 7, 7]);
	});

	it("matches copying the whole array at each snapshot on random operations", () => {
		const random = createRandom(1146);
		for (let run = 0; run < 100; run++) {
			const length = random.int(1, 5);
			const snapshots = new SnapshotArray(length);
			const current = new Array<number>(length).fill(0);
			const copies: number[][] = [];
			for (let op = 0; op < 60; op++) {
				const kind = random.int(0, 2);
				if (kind === 0) {
					const [index, value] = [random.int(0, length - 1), random.int(0, 9)];
					snapshots.set(index, value);
					current[index] = value;
				} else if (kind === 1) {
					expect(snapshots.snap()).toBe(copies.length);
					copies.push([...current]);
				} else if (copies.length > 0) {
					const [index, id] = [
						random.int(0, length - 1),
						random.int(0, copies.length - 1),
					];
					expect(snapshots.get(index, id)).toBe(copies[id]?.[index] ?? -1);
				}
			}
		}
	});
});
