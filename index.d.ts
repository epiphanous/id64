/**
 * The number of ticks (100-nanosecond intervals) between the gregorian epoch (15-Oct-1582) and the unix epoch (01-Jan-1970).
 */
export declare const GREGORIAN_OFFSET:number;

/**
 * Generates a 20-char ID.
 * @param {Boolean} reversible true to make the id reversible (creates 22 char id)
 * @returns {string}
 */
export declare function gen(reversible: boolean): string;

/**
 * Recover the uuid from the id.
 *
 * @param {string} id the id to reverse (must be reversible)
 * @returns {string} the underlying uuid
 */
export declare function ungen(id: string): string;

/**
 * Alias for ungen. Recover the uuid from the id.
 *
 * @param {string} id the id to reverse (must be reversible)
 * @returns {string} the underlying uuid
 */
export declare function uuid(id: string): string;

/**
 * Convert an existing v1 uuid to an id64 id.
 *
 * @param {string} uuid (must be v1)
 * @returns {string} the underlying uuid
 */
export declare function from_uuid(uuid: string, reversible:boolean): string;

/**
 * Returns the datetime of the id in ticks (100 nanosecond intervals since the Gregorian epoch)
 * @param {string} id the `id64` id
 * @returns {number} the ticks
 */
export declare function ticks(id: string): number;

/**
 * Returns the datetime of the id in microseconds
 * @param {string} id the `id64` id
 * @returns {number} the micros
 */
export declare function micros(id: string): number;

/**
 * Returns the datetime of the id in milliseconds
 * @param {string} id the `id64` id
 * @returns {number} the millis
 */
export declare function millis(id: string): number;

/**
 * Returns the date of the id
 * @param {string} id the id64 id
 * @returns {Date} the date 
 */
export declare function date(id: string): Date;

