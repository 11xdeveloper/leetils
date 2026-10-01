import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { FancySequence as Fancy } from ".";

describe("1622. Fancy Sequence", () => {
	it("solves the example from the problem statement", () => {
		const fancy = new Fancy();
		fancy.append(2);
		fancy.addAll(3);
		fancy.append(7);
		fancy.multAll(2);
		expect(fancy.getIndex(0)).toBe(10);
		fancy.addAll(3);
		fancy.append(10);
		fancy.multAll(2);
		expect([0, 1, 2, 3].map((i) => fancy.getIndex(i))).toEqual([
			26, 34, 20, -1,
		]);
	});

	it("matches updating every element with BigInt on random operations", () => {
		const random = createRandom(1622);
		const MOD = 1_000_000_007n;
		for (let run = 0; run < 50; run++) {
			const fancy = new Fancy();
			let values: bigint[] = [];
			for (let op = 0; op < 200; op++) {
				const kind = random.int(0, 3);
				if (kind === 0) {
					const val = random.int(1, 100);
					fancy.append(val);
					values.push(BigInt(val));
				} else if (kind === 1) {
					const inc = BigInt(random.int(1, 100));
					fancy.addAll(Number(inc));
					values = values.map((v) => (v + inc) % MOD);
				} else if (kind === 2) {
					const m = BigInt(random.int(1, 100));
					fancy.multAll(Number(m));
					values = values.map((v) => (v * m) % MOD);
				} else {
					const idx = random.int(0, values.length);
					expect(fancy.getIndex(idx)).toBe(
						idx < values.length ? Number(values[idx]) : -1,
					);
				}
			}
		}
	});
});
