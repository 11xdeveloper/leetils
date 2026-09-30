import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { robotBoundedInCircle as isRobotBounded } from ".";

describe("1041. Robot Bounded In Circle", () => {
	it("solves the examples from the problem statement", () => {
		expect(isRobotBounded("GGLLGG")).toBeTrue();
		expect(isRobotBounded("GG")).toBeFalse();
		expect(isRobotBounded("GL")).toBeTrue();
	});

	it("matches checking whether four passes return to the origin on random instructions", () => {
		const random = createRandom(1041);
		for (let run = 0; run < 1000; run++) {
			const instructions = random.string(random.int(1, 10), "GLR");
			let [x, y, dx, dy] = [0, 0, 0, 1];
			for (const instruction of instructions.repeat(4)) {
				if (instruction === "G") [x, y] = [x + dx, y + dy];
				else if (instruction === "L") [dx, dy] = [-dy, dx];
				else [dx, dy] = [dy, -dx];
			}
			expect(isRobotBounded(instructions)).toBe(x === 0 && y === 0);
		}
	});
});
