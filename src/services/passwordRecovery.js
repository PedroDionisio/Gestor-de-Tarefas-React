const RECOVERY_KEY = "gestor-password-recovery";

export function markRecoveryFromUrl() {
  if (window.location.hash.includes("type=recovery"))
    localStorage.setItem(RECOVERY_KEY, "pending");
}

export function isRecoveryPending() {
  return localStorage.getItem(RECOVERY_KEY) === "pending";
}

export function clearRecovery() {
  localStorage.removeItem(RECOVERY_KEY);
}
