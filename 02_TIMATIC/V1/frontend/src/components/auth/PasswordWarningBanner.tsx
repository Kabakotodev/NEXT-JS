import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

const PasswordWarningBanner = () => {
  const { user } = useAuth();
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const parsed = JSON.parse(storedUser);

    if (!parsed.passwordLastChanged) return;

    const last = new Date(parsed.passwordLastChanged);
    const expiry = new Date(last);
    expiry.setDate(expiry.getDate() + 90);

    const diff = Math.ceil(
      (expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    if (diff <= 15 && diff > 0) {
      setDaysLeft(diff);
    }
  }, [user]);

  if (!daysLeft) return null;

  return (
    <Card className="mx-4 mt-4 border-warning bg-warning/10 text-warning p-3 flex items-center gap-2">
      <AlertTriangle className="w-4 h-4" />
      Votre mot de passe expire dans {daysLeft} jour(s). Veuillez le changer.
    </Card>
  );
};

export default PasswordWarningBanner;