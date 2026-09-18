import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { request } from "../services/apiClient";

function UserForm() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isEdit = Boolean(userId);
  const isSelfRegister = location.pathname === "/register";

  const [formData, setFormData] = useState({
    position: "",
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isEdit) {
      request(`/api/users/${userId}`)
        .then((data) => setFormData({ ...data, password: "" }))
        .catch((err) => setErrorMessage(err.message));
    }
  }, [userId, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name || !formData.email || (!isEdit && !formData.password)) {
      setErrorMessage("必須項目をすべて入力してください。");
      return;
    }

    try {
      const BASE_URL =
        (typeof process !== "undefined" &&
          process.env?.REACT_APP_API_BASE_URL) ||
        "https://team-budget-app.onrender.com";
      const endpoint = isEdit ? `/api/users/${userId}` : "/api/users";
      const method = isEdit ? "PUT" : "POST";

      if (isSelfRegister) {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("登録処理に失敗しました。");
        alert("アカウント登録が完了しました。ログインしてください。");
        navigate("/login");
      } else {
        await request(endpoint, {
          method,
          body: JSON.stringify(formData),
        });
        alert(isEdit ? "更新が完了しました。" : "登録が完了しました。");
        navigate("/users");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("このユーザーを削除してよろしいですか？")) return;

    try {
      await request(`/api/users/${userId}`, { method: "DELETE" });
      alert("削除が完了しました。");
      navigate("/users");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const primaryBtnStyle = {
    padding: "10px 20px",
    backgroundColor: "#C0E6F5",
    color: "#000000",
    border: "1px solid #9dcbe0",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontFamily: "sans-serif",
      }}
    >
      <h2>
        {isSelfRegister
          ? "新規アカウント登録"
          : isEdit
            ? "ユーザー編集"
            : "ユーザー新規登録"}
      </h2>

      {errorMessage && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#ffebee",
            color: "#c62828",
            borderRadius: "4px",
            marginBottom: "16px",
          }}
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", marginBottom: "6px" }}>役職:</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", marginBottom: "6px" }}>
            氏名 (必須):
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", marginBottom: "6px" }}>
            メールアドレス (必須):
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "6px" }}>
            パスワード {isEdit ? "(変更する場合のみ入力)" : "(必須)"}:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!isEdit}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <button type="submit" style={primaryBtnStyle}>
          {isEdit ? "更新する" : "登録する"}
        </button>

        {isEdit && (
          <button type="button" onClick={handleDelete} style={primaryBtnStyle}>
            削除する
          </button>
        )}

        <button
          type="button"
          onClick={() => navigate(isSelfRegister ? "/login" : "/users")}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          戻る
        </button>
      </form>
    </div>
  );
}

export default UserForm;
