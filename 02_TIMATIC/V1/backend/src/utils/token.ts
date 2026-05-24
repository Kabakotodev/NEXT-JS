import jwt from "jsonwebtoken";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

// export const generateAccessToken = (user: any) => {
//   return jwt.sign(
//     { id: user.id, role: user.role.nomRole },
//     JWT_SECRET,
//     { expiresIn: "15m" }
//   );
// };

export const generateAccessToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role.nomRole,
      prenom: user.prenom,
      nom: user.nom,
    },
    JWT_SECRET,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

export const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};