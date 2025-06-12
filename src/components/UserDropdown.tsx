import { useState } from "react";
import { User, Settings, LogOut, Heart, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { mockUserProfile } from "@/data/mockData";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(mockUserProfile);

  const toggleNotifications = () => {
    setProfile((prev) => ({ ...prev, notifications: !prev.notifications }));
  };

  const toggleDarkMode = () => {
    setProfile((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        {profile.avatar ? (
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <User className="w-5 h-5" />
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-lg z-50">
            {/* Profile Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold">{profile.username}</div>
                  <div className="text-sm text-muted-foreground">
                    {profile.email}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    С нами с {formatDate(profile.joinDate)}
                  </div>
                </div>
              </div>
            </div>

            {/* Favorite Teams */}
            <div className="p-4 border-b border-border">
              <div className="text-sm font-medium mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Любимые команды
              </div>
              <div className="flex gap-2">
                {profile.favoriteTeams.map((teamId) => {
                  // In real app, would fetch team by ID
                  return (
                    <Badge key={teamId} variant="secondary" className="text-xs">
                      NAVI
                    </Badge>
                  );
                })}
                {profile.favoriteTeams.length === 0 && (
                  <div className="text-xs text-muted-foreground">
                    Команды не выбраны
                  </div>
                )}
              </div>
            </div>

            {/* Quick Settings */}
            <div className="p-4 border-b border-border space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm">Уведомления</div>
                <Switch
                  checked={profile.notifications}
                  onCheckedChange={toggleNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Темная тема</div>
                <Switch
                  checked={profile.darkMode}
                  onCheckedChange={toggleDarkMode}
                />
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={() => setIsOpen(false)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Моя статистика
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Настройки
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => setIsOpen(false)}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDropdown;
