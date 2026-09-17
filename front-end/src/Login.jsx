import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await response.text();
      setMessage(result);

      // ★ログイン成功なら画面遷移
      if (result === "login success") {
        navigate("/home");
      }
    } catch (error) {
      setMessage("通信エラーが発生しました");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>ログイン</h2>

      <div>
        <label>メールアドレス：</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>パスワード：</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}>ログイン</button>

      <p>{message}</p>
    </div>
  );
}

export default Login;
