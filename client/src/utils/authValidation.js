/* authValidation.js - rolled back to minimal content for login persistence with cookies */

export function isTokenExpired(token) {
  return false; // disable token expiration check for rollback
}

export function isRoleValid(userRole, requiredRole) {
  return true; // disable role validation for rollback
}
