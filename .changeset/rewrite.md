---
"leetils": minor
---

Rewrite the package. This release has breaking changes.

- The package is now ESM-only and needs Node.js 22 or later. `require("leetils")` works on Node versions that support `require()` of ES modules.
- Solutions are named after their LeetCode URL slug, so names can't collide:

  | 0.1.7 | Now |
  | --- | --- |
  | `isPalindrome` | `palindromeNumber` |
  | `validBrackets` | `validParentheses` |
  | `romanToInt` | `romanToInteger` |
  | `myAtoi` | `stringToIntegerAtoi` |
  | `isHappy` | `happyNumber` |

- `addBinary` takes exactly two strings, matching LeetCode.
- `stringToIntegerAtoi` clamps to the 32-bit range and no longer accepts `0x` prefixes.
- `Brackets` is no longer exported.
- New solutions: `addTwoNumbers`, `longestSubstringWithoutRepeatingCharacters`, `medianOfTwoSortedArrays` and `longestPalindromicSubstring`.
- New helpers: `listFromArray`, `listToArray`, `TreeNode`, `treeFromArray` and `treeToArray`.
- Every solution's doc comment has the problem link, difficulty, approach and complexity.
