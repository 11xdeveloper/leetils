import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignBitset as Bitset } from ".";

describe("2166. Design Bitset", () => {
	it("solves the example from the problem statement", () => {
		const bitset = new Bitset(5);
		bitset.fix(3);
		bitset.fix(1);
		bitset.flip();
		expect(bitset.all()).toBeFalse();
		bitset.unfix(0);
		bitset.flip();
		expect(bitset.one()).toBeTrue();
		bitset.unfix(0);
		expect(bitset.count()).toBe(2);
		expect(bitset.toString()).toBe("01010");
	});

	it("matches a plain array on random operations", () => {
		const random = createRandom(2166);
		const size = 8;
		const bitset = new Bitset(size);
		let bits = new Array<number>(size).fill(0);
		for (let op = 0; op < 500; op++) {
			const idx = random.int(0, size - 1);
			switch (random.int(0, 2)) {
				case 0:
					bitset.fix(idx);
					bits[idx] = 1;
					break;
				case 1:
					bitset.unfix(idx);
					bits[idx] = 0;
					break;
				default:
					bitset.flip();
					bits = bits.map((bit) => 1 - bit);
			}
			const ones = bits.filter(Boolean).length;
			expect(bitset.count()).toBe(ones);
			expect(bitset.all()).toBe(ones === size);
			expect(bitset.one()).toBe(ones > 0);
			expect(bitset.toString()).toBe(bits.join(""));
		}
	});
});
