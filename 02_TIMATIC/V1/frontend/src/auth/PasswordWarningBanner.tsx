import { AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const PasswordWarningBanner = () => {
  const { passwordWarningDays } = useAuth();

  if (!passwordWarningDays) return null;

  return (
    <div className="bg-warning/15 border border-warning/30 text-foreground px-4 py-3 flex items-center gap-3 text-sm">
      <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
      <span>
        <strong>Attention :</strong> Votre mot de passe expire dans{" "}
        <strong>{passwordWarningDays} jour{passwordWarningDays > 1 ? "s" : ""}</strong>.
        Veuillez le changer dès que possible.
      </span>
    </div>
  );
};

export default PasswordWarningBanner;
