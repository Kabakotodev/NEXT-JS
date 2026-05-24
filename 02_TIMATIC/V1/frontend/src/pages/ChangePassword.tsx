import { useState } from "react";
import api from "@/utils/axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [oldPassword, setOld] = useState("");
  const [newPassword, setNew] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await api.put("/users/change-password", {
      oldPassword,
      newPassword,
    });

    alert("Mot de passe modifié");
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" onChange={(e)=>setOld(e.target.value)} />
      <input type="password" onChange={(e)=>setNew(e.target.value)} />
      <button>Changer</button>
    </form>
  );
};

export default ChangePassword;