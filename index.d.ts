/**
 * Generates a 20-char ID.
 * @param {Boolean} reversible -> determines whether the generated ID should be reversible
 * @returns {string}
 */
export declare function gen(reversible: boolean): string;

/**
 * @param {string} id
 * @param {number} k
 * @returns {string}
 */
export declare function ungen(id: string, k: number): string;