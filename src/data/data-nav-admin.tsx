import {
  ClipboardList,
  LayoutDashboard,
  Package,
  PackageSearch,
  Settings,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";

export interface NavItem {
  nama: string;
  path?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}
export const dataNavAdmin: NavItem[] = [
  {
    nama: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    nama: "Pesanan",
    icon: <ShoppingCart className="h-5 w-5" />,
    children: [
      {
        nama: "Semua Pesanan",
        path: "/dashboard/pesanan",
      },
      {
        nama: "Pesanan Joki",
        path: "/dashboard/data/joki",
      },
      {
        nama: "Pesanan Vilog",
        path: "/dashboard/data/dmvilog",
      },
    ],
  },
  {
    nama: "Member",
    icon: <Users className="h-5 w-5" />,
    children: [
      {
        nama: "Member Deposit",
        path: "/dashboard/deposit",
      },
      {
        nama: "Kelola Member",
        path: "/dashboard/member",
      },
    ],
  },
  {
    nama: "Produk",
    icon: <Package className="h-5 w-5" />,
    children: [
      {
        nama: "Kategori",
        path: "/dashboard/category",
      },
      {
        nama: "Sub - Kategori",
        path: "/dashboard/sub-category",
      },
      {
        nama: "Layanan",
        path: "/dashboard/product",
      },
      {
        nama: "Voucher",
        path: "/dashboard/product/voucher",
      },
    ],
  },
  {
    nama: "Tracking",
    path: "/dashboard/tracking",
    icon: <PackageSearch className="size-4" />,
  },
  {
    nama: "Metode",
    path: "/dashboard/methods",
    icon: <Wallet className="size-4" />,
  },
  {
    nama: "Pesanan Manual",
    path: "/dashboard/pesanan-manual",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    nama: "General",
    path: "/dashboard/general",
    icon: <Settings className="h-5 w-5" />,
  },
];
