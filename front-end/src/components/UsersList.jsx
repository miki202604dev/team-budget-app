import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../services/apiClient";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    request("/api/users")
      .then((data) => setUsers(data))
      .catch((err) => setErrorMessage(err.message));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#C0E6F5",
    color: "#000000",
    border: "1px solid #9dcbe0",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div style={{ padding: "30px 50px", fontFamily: "sans-serif" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>ユーザー管理一覧</h2>
        <div>
          <button
            onClick={() => navigate("/users/new")}
            style={{ ...buttonStyle, marginRight: "12px" }}
          >
            新規ユーザー登録
          </button>
          <button onClick={handleLogout} style={buttonStyle}>
            ログアウト
          </button>
        </div>
      </div>

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

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th style={{ width: "80px" }}>ID</th>
            <th>役職</th>
            <th>氏名</th>
            <th>メールアドレス</th>
            <th style={{ width: "140px", textAlign: "center" }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.userId}>
              <td>{u.userId}</td>
              <td>{u.position || "-"}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td style={{ textAlign: "center" }}>
                <button
                  onClick={() => navigate(`/users/${u.userId}`)}
                  style={{
                    padding: "4px 8px",
                    marginRight: "6px",
                    cursor: "pointer",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                  }}
                >
                  詳細
                </button>
                <button
                  onClick={() => navigate(`/users/edit/${u.userId}`)}
                  style={{
                    padding: "4px 8px",
                    cursor: "pointer",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                  }}
                >
                  編集
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && !errorMessage && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                登録データがありません
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
