const API = import.meta.env.VITE_API_URL;

export const apiRequest = async (path, method = "GET", body) => {
  try {
    const res = await fetch(`${API}${path}`, {
      method,
      credentials: "include",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, data };
  } catch (error) {
    return { ok: false, data: { message: "Something went wrong. Please try again." } };
  }
};