import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { WalkingRobotSimulationII as Robot } from ".";

/** Moves a robot one step at a time. */
class SteppingRobot {
	#x = 0;
	#y = 0;
	#direction = 0;
	static readonly names = ["East", "North", "West", "South"];
	static readonly moves = [
		[1, 0],
		[0, 1],
		[-1, 0],
		[0, -1],
	];

	constructor(
		readonly width: number,
		readonly height: number,
	) {}

	step(num: number): void {
		for (let i = 0; i < num; i++) {
			for (;;) {
				const [dx = 0, dy = 0] = SteppingRobot.moves[this.#direction] ?? [];
				const [x, y] = [this.#x + dx, this.#y + dy];
				if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
					[this.#x, this.#y] = [x, y];
					break;
				}
				this.#direction = (this.#direction + 1) % 4;
			}
		}
	}

	getPos(): number[] {
		return [this.#x, this.#y];
	}

	getDir(): string {
		return SteppingRobot.names[this.#direction] ?? "";
	}
}

describe("2069. Walking Robot Simulation II", () => {
	it("solves the example from the problem statement", () => {
		const robot = new Robot(6, 3);
		robot.step(2);
		robot.step(2);
		expect(robot.getPos()).toEqual([4, 0]);
		expect(robot.getDir()).toBe("East");
		robot.step(2);
		robot.step(1);
		robot.step(4);
		expect(robot.getPos()).toEqual([1, 2]);
		expect(robot.getDir()).toBe("West");
	});

	it("matches stepping one cell at a time", () => {
		const random = createRandom(2069);
		for (let run = 0; run < 100; run++) {
			const [width, height] = [random.int(2, 6), random.int(2, 6)];
			const [robot, expected] = [
				new Robot(width, height),
				new SteppingRobot(width, height),
			];
			for (let move = 0; move < 10; move++) {
				const num = random.int(1, 40);
				robot.step(num);
				expected.step(num);
				expect(robot.getPos()).toEqual(expected.getPos());
				expect(robot.getDir()).toBe(expected.getDir());
			}
		}
	});
});
