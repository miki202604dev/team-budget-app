// CRA(React)環境変数 または ローカル初期値
const BASE_URL =
    (typeof process !== "undefined" && process.env?.REACT_APP_API_BASE_URL) ||
    "https://team-budget-app.onrender.com";

export async function request(endpoint, options = {}) {
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
        ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
        throw new Error("認証セッションが切れました。再度ログインしてください。");
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `通信エラーが発生しました (${response.status})`);
    }

    // 204 No Content の場合は即時 null を返却
    if (response.status === 204) return null;

    // レスポンス本文が空なら null、JSON文字列があればパースして返却
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}