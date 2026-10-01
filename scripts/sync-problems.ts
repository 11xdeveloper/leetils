// Downloads LeetCode's problem list into data/leetcode-problems.json, then
// regenerates the problem list in PROBLEMS.md and docs/problems.
// Usage: bun run sync

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
	CATALOGUE_FILE,
	type Catalogue,
	type Category,
	type Difficulty,
	type LeetCodeProblem,
	ROOT_DIR,
	writeGeneratedFiles,
} from "./problems";

interface ApiResponse {
	stat_status_pairs: {
		stat: {
			frontend_question_id: number;
			question__title: string;
			question__title_slug: string;
		};
		difficulty: { level: number };
		paid_only: boolean;
	}[];
}

const DIFFICULTIES: Record<number, Difficulty> = {
	1: "Easy",
	2: "Medium",
	3: "Hard",
};

// A problem listed in several categories gets the first of them here.
const CATEGORIES: readonly Category[] = [
	"algorithms",
	"javascript",
	"database",
	"pandas",
	"shell",
	"concurrency",
];

const fetchProblems = async (
	category: string,
): Promise<ApiResponse["stat_status_pairs"]> => {
	const response = await fetch(
		`https://leetcode.com/api/problems/${category}/`,
		{
			headers: {
				"User-Agent": "leetils (https://github.com/11xdeveloper/leetils)",
			},
		},
	);
	if (!response.ok) {
		throw new Error(
			`LeetCode responded with ${response.status} for ${category}`,
		);
	}
	return ((await response.json()) as ApiResponse).stat_status_pairs;
};

const categories = new Map<number, Category>();
for (const category of CATEGORIES) {
	for (const { stat } of await fetchProblems(category)) {
		if (!categories.has(stat.frontend_question_id)) {
			categories.set(stat.frontend_question_id, category);
		}
	}
}

const stat_status_pairs = await fetchProblems("all");

const problems = stat_status_pairs
	.map(({ stat, difficulty, paid_only }): LeetCodeProblem => {
		const level = DIFFICULTIES[difficulty.level];
		if (!level) {
			throw new Error(`Unknown difficulty level ${difficulty.level}`);
		}
		const category = categories.get(stat.frontend_question_id);
		if (!category) {
			throw new Error(`Problem ${stat.frontend_question_id} has no category`);
		}
		return {
			number: stat.frontend_question_id,
			title: stat.question__title,
			slug: stat.question__title_slug,
			difficulty: level,
			category,
			premium: paid_only,
		};
	})
	.toSorted((a, b) => a.number - b.number);

const catalogue: Catalogue = {
	syncedAt: new Date().toISOString().slice(0, 10),
	problems,
};

const cataloguePath = join(ROOT_DIR, CATALOGUE_FILE);
mkdirSync(dirname(cataloguePath), { recursive: true });
writeFileSync(cataloguePath, `${JSON.stringify(catalogue, null, "\t")}\n`);
writeGeneratedFiles();

console.log(`Synced ${problems.length} problems and updated the problem list`);
