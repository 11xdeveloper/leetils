import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignHashmap as MyHashMap } from ".";

describe("706. Design HashMap", () => {
	it("solves the example from the problem statement", () => {
		const map = new MyHashMap();
		map.put(1, 1);
		map.put(2, 2);
		expect(map.get(1)).toBe(1);
		expect(map.get(3)).toBe(-1);
		map.put(2, 1);
		expect(map.get(2)).toBe(1);
		map.remove(2);
		expect(map.get(2)).toBe(-1);
	});

	it("matches a Map on random operations", () => {
		const random = createRandom(706);
		const map = new MyHashMap();
		const reference = new Map<number, number>();
		for (let op = 0; op < 10_000; op++) {
			const key =
				random.int(0, 3) === 0 ? random.int(0, 1_000_000) : random.int(0, 50);
			const action = random.int(0, 2);
			if (action === 0) {
				const value = random.int(0, 1_000_000);
				map.put(key, value);
				reference.set(key, value);
			} else if (action === 1) {
				map.remove(key);
				reference.delete(key);
			} else {
				expect(map.get(key)).toBe(reference.get(key) ?? -1);
			}
		}
	});
});
