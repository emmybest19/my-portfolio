/**
 * Exhaustiveness guard for discriminated unions.
 *
 * Call it in the `default` branch of a switch. If a new member is added to the
 * union and a branch is missing, `value` stops being `never` and the project
 * fails to compile — the case cannot be forgotten silently.
 */
export function assertNever(value: never, context: string): never {
  throw new Error(`${context}: unhandled case ${JSON.stringify(value)}`);
}
