const loginAttempts = new Map();

export const incFailedAttempts = (ip) => {
  if (loginAttempts.has(ip)) {
    loginAttempts.set(ip, loginAttempts.get(ip) + 1);
  } else {
    loginAttempts.set(ip, 1);
  }
};

export const isBlocked = (ipAddress) => {
  return loginAttempts.has(ipAddress) && loginAttempts.get(ipAddress) >= 5;
};

export const resetLoginAttempts = (ipAddress) => {
  loginAttempts.delete(ipAddress);
};

