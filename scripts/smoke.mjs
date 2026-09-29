// Imports the built package the way a Node user would: through the "exports"
// field in package.json. Run `bun run build` first.

import assert from "node:assert/strict";
import * as leetils from "leetils";

const exports = Object.entries(leetils);
assert.ok(exports.length > 0, "the package exports nothing");

for (const [name, value] of exports) {
	assert.equal(typeof value, "function", `${name} is not a function`);
}

assert.deepEqual(leetils.twoSum([2, 7, 11, 15], 9), [0, 1]);
assert.deepEqual(
	leetils.listToArray(
		leetils.addTwoNumbers(
			leetils.listFromArray([2, 4, 3]),
			leetils.listFromArray([5, 6, 4]),
		),
	),
	[7, 0, 8],
);

console.log(`Loaded ${exports.length} exports in Node ${process.version}`);
