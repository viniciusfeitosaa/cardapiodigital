'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  LogOut, 
  Menu as MenuIcon,
  X,
  ChefHat,
  BookOpen,
  ShoppingBag,
  Settings,
  Store
} from 'lucide-react';

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Visão Geral', href: '/dashboard/restaurant', icon: LayoutDashboard },
    { name: 'Cardápio', href: '/dashboard/restaurant/menu', icon: BookOpen },
    { name: 'Pedidos', href: '/dashboard/restaurant/orders', icon: ShoppingBag },
    { name: 'Configurações', href: '/dashboard/restaurant/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-red-600 to-red-700">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <ChefHat className="h-6 w-6 text-red-600" />
              </div>
              <span className="text-xl font-bold text-white">Cardápio Digital</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-red-50 text-red-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 transition-colors ${
                    isActive ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'
                  }`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center px-4 py-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold">
                  R
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Restaurante Exemplo</p>
                <p className="text-xs text-gray-500">restaurante@email.com</p>
              </div>
            </div>
            <button className="mt-3 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 hidden sm:block">Painel do Restaurante</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
