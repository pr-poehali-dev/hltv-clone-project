import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SearchDropdown from "./SearchDropdown";
import NotificationsDropdown from "./NotificationsDropdown";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Матчи", href: "/matches" },
    { label: "Новости", href: "/news" },
    { label: "Команды", href: "/teams" },
    { label: "Рейтинги", href: "/rankings" },
    { label: "События", href: "/events" },
    { label: "Статистика", href: "/stats" },
    { label: "Live", href: "/live" },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="font-oswald text-2xl font-bold text-primary">
              CS<span className="text-foreground">PRO</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <SearchDropdown />
            </div>

            <NotificationsDropdown />
            <UserDropdown />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <div className="mb-4">
                <SearchDropdown />
              </div>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
