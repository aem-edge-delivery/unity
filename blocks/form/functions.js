/**
 * Get Full Name
 * @name getFullName Concats first name and last name
 * @param {string} firstname in Stringformat
 * @param {string} lastname in Stringformat
 * @return {string}
 */
function getFullName(firstname, lastname) {
  return `${firstname} ${lastname}`.trim();
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @returns {number} returns the number of days between two dates
 */
function days(endDate, startDate) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

/**
 * Validate Field
 * @name validateField Validates if field matches the pattern of exactly 6 numeric digits
 * @param {string} fieldname Field to validate
 * @return {string} Returns 'valid' if field matches pattern, 'not valid' otherwise
 */
function validateField(fieldname) {
    const regex = /^\d{6}$/;
    return regex.test(fieldname) ? 'valid' : 'not valid';
}

// eslint-disable-next-line import/prefer-default-export
export { getFullName, days, validateField };
