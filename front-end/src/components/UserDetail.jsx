import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { request } from "../services/apiClient";

function UserDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    request(`/api/users/${userId}`)
      .then((data) => setUser(data))
      .catch((err) => setErrorMessage(err.message));
  }, [userId]);

  if (errorMessage) {
    return (
      <div style={{ padding: "30px", color: "red" }}>
        <p>{errorMessage}</p>
        <button onClick={() => navigate("/users")}>一覧へ戻る</button>
      </div>
    );
  }

  if (!user) return <div style={{ padding: "30px" }}>読み込み中...</div>;

  return (
    <div style={{ padding: "30px 50px", fontFamily: "sans-serif" }}>
      <h2>ユーザー詳細情報</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "6px",
          maxWidth: "500px",
          marginBottom: "20px",
        }}
      >
        <p>
          <strong>ユーザーID:</strong> {user.userId}
        </p>
        <p>
          <strong>役職:</strong> {user.position || "-"}
        </p>
        <p>
          <strong>氏名:</strong> {user.name}
        </p>
        <p>
          <strong>メールアドレス:</strong> {user.email}
        </p>
      </div>
      <button
        onClick={() => navigate(`/users/edit/${user.userId}`)}
        style={{
          padding: "8px 16px",
          marginRight: "10px",
          backgroundColor: "#C0E6F5",
          color: "#000000",
          border: "1px solid #9dcbe0",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        編集する
      </button>
      <button
        onClick={() => navigate("/users")}
        style={{
          padding: "8px 16px",
          cursor: "pointer",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        一覧へ戻る
      </button>
    </div>
  );
}

export default UserDetail;
