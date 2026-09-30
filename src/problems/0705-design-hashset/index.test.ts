import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignHashset as MyHashSet } from ".";

describe("705. Design HashSet", () => {
	it("solves the example from the problem statement", () => {
		const set = new MyHashSet();
		set.add(1);
		set.add(2);
		expect(set.contains(1)).toBeTrue();
		expect(set.contains(3)).toBeFalse();
		set.add(2);
		expect(set.contains(2)).toBeTrue();
		set.remove(2);
		expect(set.contains(2)).toBeFalse();
	});

	it("matches a Set on random operations across the whole key range", () => {
		const random = createRandom(705);
		const set = new MyHashSet();
		const reference = new Set<number>();
		for (let op = 0; op < 10_000; op++) {
			const key =
				random.int(0, 3) === 0 ? random.int(0, 1_000_000) : random.int(0, 50);
			const action = random.int(0, 2);
			if (action === 0) {
				set.add(key);
				reference.add(key);
			} else if (action === 1) {
				set.remove(key);
				reference.delete(key);
			} else {
				expect(set.contains(key)).toBe(reference.has(key));
			}
		}
	});
});
