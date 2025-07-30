// utils/rateLimit.js

export const preventSiteSpam = (
  key = "site-access",
  limitCount = 3, // ✅ tăng số lần truy cập cho phép
  timeWindowMinutes = 60, // ⏱ thời gian tính số lượt
  blockDurationMinutes = 10 // 🚫 chặn nhẹ hơn
) => {
  const now = Date.now();
  const stored = localStorage.getItem(key);

  let data = {
    timestamps: [],
    blockedUntil: null,
  };

  try {
    if (stored) {
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed.timestamps)) {
        data.timestamps = parsed.timestamps;
      }

      if (typeof parsed.blockedUntil === "number") {
        data.blockedUntil = parsed.blockedUntil;
      }
    }

    if (data.blockedUntil && now < data.blockedUntil) {
      return false;
    }

    const recentTimestamps = data.timestamps.filter(
      (t) => now - t <= timeWindowMinutes * 60 * 1000
    );

    if (recentTimestamps.length >= limitCount) {
      const blockedData = {
        timestamps: recentTimestamps,
        blockedUntil: now + blockDurationMinutes * 60 * 1000,
      };
      localStorage.setItem(key, JSON.stringify(blockedData));
      return false;
    }

    recentTimestamps.push(now);
    localStorage.setItem(
      key,
      JSON.stringify({
        timestamps: recentTimestamps,
        blockedUntil: null,
      })
    );

    return true;
  } catch (err) {
    console.error("Lỗi trong preventSiteSpam:", err);
    return true;
  }
};
