import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { Flatten2dVector } from ".";

describe("251. Flatten 2D Vector", () => {
	it("solves the example from the problem statement", () => {
		const vector = new Flatten2dVector([[1, 2], [3], [4]]);
		expect(vector.next()).toBe(1);
		expect(vector.next()).toBe(2);
		expect(vector.next()).toBe(3);
		expect(vector.hasNext()).toBeTrue();
		expect(vector.hasNext()).toBeTrue();
		expect(vector.next()).toBe(4);
		expect(vector.hasNext()).toBeFalse();
	});

	it("skips empty rows, including at the start and end", () => {
		const vector = new Flatten2dVector([[], [], [5], [], []]);
		expect(vector.hasNext()).toBeTrue();
		expect(vector.next()).toBe(5);
		expect(vector.hasNext()).toBeFalse();
		expect(new Flatten2dVector([]).hasNext()).toBeFalse();
	});

	it("yields the flattened values of random 2D arrays", () => {
		const random = createRandom(251);
		for (let run = 0; run < 300; run++) {
			const vec = Array.from({ length: random.int(0, 6) }, () =>
				random.array(random.int(0, 4), -500, 500),
			);
			const vector = new Flatten2dVector(vec);
			const values: number[] = [];
			while (vector.hasNext()) values.push(vector.next());
			expect(values).toEqual(vec.flat());
		}
	});
});
