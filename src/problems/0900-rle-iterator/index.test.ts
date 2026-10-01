import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { RleIterator } from ".";

describe("900. RLE Iterator", () => {
	it("solves the example from the problem statement", () => {
		const iterator = new RleIterator([3, 8, 0, 9, 2, 5]);
		expect([
			iterator.next(2),
			iterator.next(1),
			iterator.next(1),
			iterator.next(2),
		]).toEqual([8, 8, 5, -1]);
	});

	it("matches expanding the sequence on random encodings", () => {
		const random = createRandom(900);
		for (let run = 0; run < 300; run++) {
			const encoding = Array.from({ length: random.int(1, 5) }, () => [
				random.int(0, 4),
				random.int(0, 9),
			]).flat();
			const expanded = [];
			for (let i = 0; i < encoding.length; i += 2)
				for (let c = 0; c < (encoding[i] ?? 0); c++)
					expanded.push(encoding[i + 1] ?? 0);
			const iterator = new RleIterator(encoding);
			let position = 0;
			for (let call = 0; call < 8; call++) {
				const n = random.int(1, 4);
				position += n;
				expect(iterator.next(n)).toBe(
					position <= expanded.length ? (expanded[position - 1] ?? -1) : -1,
				);
			}
		}
	});

	it("skips huge runs without expanding them", () => {
		const iterator = new RleIterator([10 ** 9, 1, 10 ** 9, 2]);
		expect(iterator.next(10 ** 9 + 5)).toBe(2);
	});
});
