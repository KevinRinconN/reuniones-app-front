import { NavMainItem } from "../components/layout/sidebar/nav-main";

const ADMIN_PREFIX = "admin";

export const ROUTES = {
  ADMIN: {
    DASHBOARD: `/admin/dashboard`,
    MEETING: `/admin/meeting`,
    PROCEEDING: `/admin/proceedings`,
    COMMITMENT: `/admin/commitments`,
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
  },
  {
    title: "Reuniones",
    url: ROUTES.ADMIN.MEETING,
    icon: "meeting",
  },
  {
    title: "Actas",
    url: ROUTES.ADMIN.PROCEEDING,
    icon: "adjustmentHistory",
  },
  {
    title: "Compromisos",
    url: ROUTES.ADMIN.COMMITMENT,
    icon: "events",
  },

  {
    title: "Usuarios",
    url: ROUTES.ADMIN.USERS,
    icon: "contacts",
  },
];
