/**
 * Secure Middleware Options
 */
interface SecureOptions {
  /** Callback function when xss attack is discovered */
  callback?: () => void;
  /** Custom response handler if any xss attack is discovered*/
  handleResponseCustom?: (response: any) => void;
}

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

/**
 * Get Sanitized URL search parameters
 *
 * @param p - Search parameter name
 * @param expression - Regex expression for sanitization
 *
 * @returns Sanitized URL search parameter value
 *
 * @example
 * Prints sanitized string:
 * ```ts
 * const language = getSafeSearchParam(lang);
 * console.log(language)
 * ```
 */
export const getSafeSearchParam = (
  p: string,
  expression: RegExp = /[`~!$%^*()|+;'"<>{}[\]\\]/gi
) => {
  const params = new URLSearchParams(window.location.search);
  if (!p || !params.has(p)) return null;
  return sanitizeString(params.get(p) || '', expression);
};

/**
 * Express Middleware for preventing XSS attacks
 *
 * @param options - Options for secure middleware
 *
 * @returns Middleware handler for xss protection
 *
 * @example
 * ```ts
 * const sanitizedString = sanitizeUrl("<script>Hello</script>");
 * const sanitizedString = sanitizeUrl("<script>Hello</script>");
 * ```
 */
export const secure = ({
  callback,
  handleResponseCustom,
}: SecureOptions = {}) => {
  return (req: any, res: any, next: any) => {
    if (
      /(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/.test(
        req.url
      )
    ) {
      if (typeof callback === 'function') {
        callback();
      }
      if (typeof handleResponseCustom === 'function') {
        handleResponseCustom(res);
      } else {
        res.status(404).send('Not found! Due to potential security issues');
      }
    } else {
      next();
    }
  };
};
