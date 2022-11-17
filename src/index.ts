/**
 * Sanitized String for XSS protection
 *
 * @param str - String to be sanitized
 * @param expression - Regex expression for sanitization
 *
 * @returns Sanitized string
 *
 * @example
 * Prints sanitized string:
 * ```ts
 * const sanitizedString = sanitizeString("<script>Hello</script>");
 * console.log(sanitizedString)
 * ```
 */
export const sanitizeString = (
  str: string,
  expression: RegExp = /[`~!@#$%^&*()|+=?;:'",.<>{}[\]\\/]/gi
) => (str ? str.replace(expression, '') : str);

/**
 * Sanitize URL String for XSS protection
 *
 * @param str - String to be sanitized
 * @param expression - Regex expression for sanitization
 *
 * @returns Sanitized URL string
 *
 * @example
 * Prints sanitized string:
 * ```ts
 * const sanitizedString = sanitizeUrl("<script>Hello</script>");
 * console.log(sanitizedString)
 * ```
 */
export const sanitizeUrl = (
  str: string,
  expression: RegExp = /[`~!$%^*()|+;'"<>{}[\]\\]/gi
) => (str ? str.replace(expression, '') : str);
