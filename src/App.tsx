import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { MenuManagement } from "./components/MenuManagement";
import { CreateKP } from "./components/CreateKP";
import { KPTemplates } from "./components/KPTemplates";
import { KPArchive } from "./components/KPArchive";
import { Toaster } from "./components/ui/sonner";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "./components/ui/sheet";

type UserRole =
  | "kp-manager"
  | "sales-manager"
  | "service-manager"
  | "sales-lead"
  | "service-lead";

function App() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [userRole] = useState<UserRole>("kp-manager");
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () =>
      window.removeEventListener("resize", checkMobile);
  }, []);

  const getRoleLabel = (role: UserRole): string => {
    const roleLabels: Record<UserRole, string> = {
      "kp-manager": "Менеджер КП",
      "sales-manager": "Менеджер продажів",
      "service-manager": "Менеджер сервісу",
      "sales-lead": "Керівник продажів",
      "service-lead": "Керівник сервісу",
    };
    return roleLabels[role];
  };

  const getBreadcrumbs = () => {
    const breadcrumbMap: Record<
      string,
      { label: string; href?: string }[]
    > = {
      dashboard: [{ label: "Dashboard / Огляд" }],
      "create-kp": [
        { label: "КП", href: "#" },
        { label: "Створити КП" },
      ],
      "all-kp": [
        { label: "КП", href: "#" },
        { label: "Усі КП" },
      ],
      "menu-dishes": [
        { label: "КП", href: "#" },
        { label: "Меню / Страви" },
      ],
      "kp-templates": [
        { label: "КП", href: "#" },
        { label: "Шаблони КП" },
      ],
      "kp-archive": [
        { label: "КП", href: "#" },
        { label: "Архів КП" },
      ],
      "client-questionnaires": [
        { label: "Продажі", href: "#" },
        { label: "Анкети клієнтів" },
      ],
      "my-kp": [
        { label: "Продажі", href: "#" },
        { label: "Мої КП" },
      ],
      "sent-to-service": [
        { label: "Продажі", href: "#" },
        { label: "Відправлені у сервіс" },
      ],
      "procurement-excel": [
        { label: "Продажі", href: "#" },
        { label: "Excel для закупівлі" },
      ],
      "service-templates": [
        { label: "Сервіс", href: "#" },
        { label: "Шаблони сервірування" },
      ],
      "equipment-textile": [
        { label: "Сервіс", href: "#" },
        { label: "Обладнання і текстиль" },
      ],
      "file-editing": [
        { label: "Сервіс", href: "#" },
        { label: "Редагування файлу" },
      ],
      "approved-files": [
        { label: "Сервіс", href: "#" },
        { label: "Погоджені файли" },
      ],
      calendar: [
        { label: "Загальні", href: "#" },
        { label: "Календар подій" },
      ],
      clients: [
        { label: "Загальні", href: "#" },
        { label: "Клієнти" },
      ],
      settings: [
        { label: "Загальні", href: "#" },
        { label: "Налаштування" },
      ],
      "users-access": [
        { label: "Загальні", href: "#" },
        { label: "Користувачі і доступи" },
      ],
    };

    return (
      breadcrumbMap[activeItem] || [{ label: "Dashboard" }]
    );
  };

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <Dashboard userRole={getRoleLabel(userRole)} />;
      case "create-kp":
        return <CreateKP />;
      case "menu-dishes":
        return <MenuManagement />;
      case "kp-templates":
        return <KPTemplates />;
      case "kp-archive":
        return <KPArchive />;
      case "all-kp":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl text-gray-900">Усі КП</h1>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">
                Список всіх комерційних пропозицій буде тут
              </p>
            </div>
          </div>
        );
      case "client-questionnaires":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl text-gray-900">
              Анкети клієнтів
            </h1>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">
                Форми та анкети клієнтів будуть тут
              </p>
            </div>
          </div>
        );
      case "my-kp":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl text-gray-900">Мої КП</h1>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">
                КП призначені вам будуть тут
              </p>
            </div>
          </div>
        );
      case "sent-to-service":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl text-gray-900">
              Відправлені у сервіс
            </h1>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">
                КП відправлені в сервісний відділ будуть тут
              </p>
            </div>
          </div>
        );
      case "procurement-excel":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl text-gray-900">
              Excel для закупівлі
            </h1>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">
                Експорт даних для закупівлі буде тут
              </p>
            </div>
          </div>
        );
      case "service-templates":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl text-gray-900">
              Шаблони сервірування
            </h1>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">
                Шаблони: Фуршет, Банкет, Кава-брейк будуть тут
              </p>
            </div>
          </div>
        );
      case "equipment-textile":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl text-gray-900">
              Обладнання і текстиль
            </h1>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">
                База обладнання та текстилю буде тут
              </p>
            </div>
          </div>
        );
      case "file-editing":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl text-gray-900">
              Редагування файлу
            </h1>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">
                Редагування сервісних файлів буде тут
              </p>
            </div>
          </div>
        );
      case "approved-files":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl text-gray-900">
              Погоджені файли
            </h1>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">
                Файли погоджені клієнтом будуть тут
              </p>
            </div>
          </div>
        );
      case "calendar":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl text-gray-900">
              Календар подій
            </h1>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">
                Календар заходів та подій буде тут
              </p>
            </div>
          </div>
        );
      case "clients":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl text-gray-900">Клієнти</h1>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">
                База клієнтів буде тут
              </p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl text-gray-900">
              Налаштування
            </h1>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">
                Налаштування системи будуть тут
              </p>
            </div>
          </div>
        );
      case "users-access":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl text-gray-900">
              Користувачі і доступи
            </h1>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">
                Управління користувачами та правами доступу буде
                тут
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard userRole={getRoleLabel(userRole)} />;
    }
  };

  const handleMenuItemClick = (item: string) => {
    setActiveItem(item);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar
          activeItem={activeItem}
          onItemClick={handleMenuItemClick}
          userRole={userRole}
        />
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <Sheet
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
        >
          <SheetContent side="left" className="p-0 w-[260px]">
            <SheetTitle className="sr-only">
              Навігаційне меню
            </SheetTitle>
            <SheetDescription className="sr-only">
              Оберіть розділ для навігації по системі
            </SheetDescription>
            <Sidebar
              activeItem={activeItem}
              onItemClick={handleMenuItemClick}
              userRole={userRole}
              isMobile={true}
            />
          </SheetContent>
        </Sheet>
      )}

      <div className="transition-all duration-300 lg:ml-[260px]">
        <Header
          breadcrumbs={getBreadcrumbs()}
          userName="Олександр Коваленко"
          userRole={getRoleLabel(userRole)}
          notificationCount={3}
          onMobileMenuClick={() => setMobileMenuOpen(true)}
          isMobile={isMobile}
        />

        <main className="pt-16">
          <div className="p-4 md:p-6">{renderContent()}</div>
        </main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;