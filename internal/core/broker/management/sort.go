package management

import "cmp"

// a single sort key: turn "extract a comparable field" into comparator
func key[T any, K cmp.Ordered](extract func(T) K) func(a, b T) int {
	return func(a, b T) int {
		return cmp.Compare(extract(a), extract(b))
	}
}

// chain keys, falling through to the next on a tie
func compareBy[T any](keys ...func(a, b T) int) func(a, b T) int {
	return func(a, b T) int {
		for _, k := range keys {
			if c := k(a, b); c != 0 {
				return c
			}
		}
		return 0
	}
}
