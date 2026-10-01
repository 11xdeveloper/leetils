import { describe, expect, it } from "bun:test";
import { nearestExitFromEntranceInMaze as nearestExit } from ".";

const maze = (rows: string[]) => rows.map((row) => [...row]);

describe("1926. Nearest Exit from Entrance in Maze", () => {
	it("solves the examples from the problem statement", () => {
		expect(nearestExit(maze(["++.+", "...+", "+++."]), [1, 2])).toBe(1);
		expect(nearestExit(maze(["+++", "...", "+++"]), [1, 0])).toBe(2);
		expect(nearestExit(maze([".+"]), [0, 0])).toBe(-1);
	});
});
