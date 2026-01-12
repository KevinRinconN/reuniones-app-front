import { NavMainItem } from "../components/layout/sidebar/nav-main";

const ADMIN_PREFIX = "admin";

export const ROUTES = {
  ADMIN: {
    DASHBOARD: `/admin/dashboard`,
    CATEGORIES: "/admin/categories",
    PRODUCTS: "/admin/products",
    INVENTORY: "/admin/inventory",
    ORDERS: "/admin/orders",
    USERS: "/admin/users",
    ROLES: "/admin/roles",
    COMMENTS: "/admin/comments",
    PROJECTS: "/admin/projects",
    SLIDERS: "/admin/sliders",
  },
} as const;

export const routes: NavMainItem[] = [
  {
    title: "Dashboard",
    url: ROUTES.ADMIN.DASHBOARD,
    icon: "dashboard",
    items: [
      { title: "Dashboard", url: ROUTES.ADMIN.DASHBOARD, icon: "dashboard" },
      { title: "Dashboard3", url: "/dashboard3", icon: "dashboard" },
      { title: "Dashboard34", url: "/dashboard21", icon: "dashboard" },
    ],
  },
  {
    title: "Reuniones",
    url: "/Reuniones",
    icon: "adjustmentHistory",
  },
  {
    title: "Calendario",
    url: "/Calendario",
    icon: "accountsReceivable",
  },
  {
    title: "Eventos",
    url: "/Eventos",
    icon: "events",
  },
  {
    title: "Agenda",
    url: "/Agenda",
    icon: "briefcase",
  },
  {
    title: "Contactos",
    url: "/Contactos",
    icon: "contacts",
  },
];
