import { Settings as SettingsIcon, Bell, Lock, Globe, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  });
  const [language, setLanguage] = useState('fr');
  const [theme, setTheme] = useState('light');

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-primary" />
          <h1 className="page-title">Paramètres</h1>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="font-heading font-semibold">Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications par email</p>
              <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifications.email}
                onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications push</p>
              <p className="text-sm text-muted-foreground">Recevoir des notifications push</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifications.push}
                onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications SMS</p>
              <p className="text-sm text-muted-foreground">Recevoir des notifications par SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifications.sms}
                onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Language */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-primary" />
          <h3 className="font-heading font-semibold">Langue</h3>
        </div>
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="form-select"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      {/* Theme */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          {theme === 'light' ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
          <h3 className="font-heading font-semibold">Thème</h3>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setTheme('light')}
            className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
              theme === 'light' ? 'border-primary bg-primary/5' : 'border-border'
            }`}
          >
            <Sun className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-medium text-center">Clair</p>
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
              theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border'
            }`}
          >
            <Moon className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-medium text-center">Sombre</p>
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-5 h-5 text-primary" />
          <h3 className="font-heading font-semibold">Sécurité</h3>
        </div>
        <div className="space-y-3">
          <a href="/change-password" className="block p-3 rounded-lg hover:bg-muted transition-colors">
            <p className="font-medium">Changer le mot de passe</p>
            <p className="text-sm text-muted-foreground">Modifier votre mot de passe actuel</p>
          </a>
          <div className="p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
            <p className="font-medium">Authentification à deux facteurs</p>
            <p className="text-sm text-muted-foreground">Ajouter une couche de sécurité supplémentaire</p>
          </div>
        </div>
      </div>

      <button className="btn-primary w-full py-3">
        Enregistrer les modifications
      </button>
    </div>
  );
};

export default Settings;
