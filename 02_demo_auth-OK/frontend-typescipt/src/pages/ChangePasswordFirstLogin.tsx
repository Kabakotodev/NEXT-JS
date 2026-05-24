import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePasswordFirstLogin = () => {

  const navigate = useNavigate();
  const userId = localStorage.getItem("tempUserId");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    const res = await fetch("http://localhost:4000/api/auth/first-change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password })
    });

    if (res.ok) {
      alert("Mot de passe modifié avec succès");
      localStorage.removeItem("tempUserId");
      navigate("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card p-6 rounded-xl">
      <h2 className="text-lg font-bold mb-4">
        Modification mot de passe obligatoire
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="form-input"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmer mot de passe"
          className="form-input"
          required
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button className="btn-primary w-full">
          Modifier
        </button>

      </form>
    </div>
  );
};

export default ChangePasswordFirstLogin;


// // ✅ CORRECTION ICI
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ChangePasswordFirstLogin = () => {

//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (password !== confirm) {
//       setError("Les mots de passe ne correspondent pas");
//       return;
//     }

//     const user = JSON.parse(localStorage.getItem("user") || "null");

//     await fetch("http://localhost:4000/api/auth/change-first-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId: user.id,
//         newPassword: password
//       })
//     });

//     navigate("/login");
//   };

//   return (
//     <div className="p-10">
//       <h2>Changer votre mot de passe</h2>

//       {error && <p className="text-red-500">{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="Nouveau mot de passe"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Confirmer"
//           onChange={(e) => setConfirm(e.target.value)}
//         />

//         <button type="submit">Changer</button>
//       </form>
//     </div>
//   );
// };

// export default ChangePasswordFirstLogin;
