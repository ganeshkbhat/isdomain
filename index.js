
/**
 * domainValidator.js
 * Node.js script to check if a string is a structurally valid domain name pattern
 * by first extracting the hostname from a potential URL (e.g., stripping protocol and port).
 */

/**
 * Helper function to extract the clean hostname from a potential URL string.
 * This removes protocols (http, https), paths, ports, and fragments.
 * @param {string} input The string which might be a domain or a full URL.
 * @returns {string} The cleaned hostname string, lowercased.
 */
function extractHostname(input) {
    let host = input.trim();

    // 1. Remove protocol (e.g., http://, https://, ftp://)
    host = host.replace(/^(?:[a-z]+:)?\/\//i, '');

    // 2. Remove path/query/fragment (everything after the first slash)
    host = host.split('/')[0];

    // 3. Remove port if present (everything after the first colon)
    host = host.split(':')[0];

    // 4. Convert to lowercase for case-insensitive validation
    return host.toLowerCase();
}

/**
 * Checks if a string (or the hostname extracted from a URL string)
 * conforms to the structural pattern of a valid domain name or hostname.
 *
 * It handles standard RFC 1035 domains (e.g., google.com) and the special hostname 'localhost'.
 *
 * @param {string} input The string to validate (can be a domain or a full URL).
 * @returns {boolean} True if the extracted hostname is a valid pattern, false otherwise.
 */
function isDomain(input) {
    if (typeof input !== 'string' || input.length === 0) {
        return false;
    }

    const domain = extractHostname(input);

    if (domain.length === 0) {
        return false;
    }

    // Treat 'localhost' as a valid hostname pattern, even though it lacks a dot.
    if (domain === 'localhost') {
        return true;
    }

    // 1. Check overall length (max 253 chars for FQDNs)
    if (domain.length > 253) {
        return false;
    }

    // 2. Strict Domain Check (Must have at least one dot for non-localhost entries)
    if (!domain.includes('.')) {
        return false;
    }

    // 3. RFC 1035 Compliant Regular Expression:
    // This pattern verifies the structure of the labels and TLD.
    // It enforces that each segment (label) starts and ends with an alphanumeric character,
    // with hyphens only allowed in the middle.
    const domainPattern = new RegExp(
        /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/
    );

    if (!domainPattern.test(domain)) {
        return false;
    }

    // 4. Manually check the 63-character limit for each label.
    const labels = domain.split('.');
    for (const label of labels) {
        if (label.length > 63) {
            return false;
        }
    }

    // If all checks pass, it is a valid domain pattern
    return true;
}


module.exports = isDomain;
