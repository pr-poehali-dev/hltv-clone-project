import { useState } from "react";
import { Bell, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockNotifications } from "@/data/mockData";
import { Notification } from "@/types";

const NotificationsDropdown = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getTimeAgo = (timestamp: Date) => {
    const diff = Date.now() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}м назад`;
    if (hours < 24) return `${hours}ч назад`;
    return `${days}д назад`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "match":
        return "bg-live-red";
      case "news":
        return "bg-primary";
      case "transfer":
        return "bg-blue-500";
      case "achievement":
        return "bg-yellow-500";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-live-red text-white">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold">Уведомления</h3>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Прочитать все
                </Button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  Нет уведомлений
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/50 ${
                      !notification.isRead ? "bg-muted/30" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getTypeColor(notification.type)}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-medium text-sm mb-1">
                              {notification.icon} {notification.title}
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {getTimeAgo(notification.timestamp)}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {notification.actionUrl && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-auto"
                                onClick={() => {
                                  markAsRead(notification.id);
                                  // Navigate to URL
                                }}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 h-auto"
                              onClick={() =>
                                removeNotification(notification.id)
                              }
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs mt-2 p-0 h-auto"
                          >
                            Отметить как прочитанное
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Показать все уведомления
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationsDropdown;
