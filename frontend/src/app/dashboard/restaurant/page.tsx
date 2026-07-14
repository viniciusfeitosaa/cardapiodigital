'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  ShoppingBag, 
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Clock,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

export default function RestaurantDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/login');
      return;
    }
    
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role === 'admin') {
        router.push('/dashboard/admin');
        return;
      }
      setUser(parsedUser);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Visão Geral', href: '/dashboard/restaurant', active: true },
    { icon: BookOpen, label: 'Cardápio', href: '/dashboard/restaurant/menu' },
    { icon: ShoppingBag, label: 'Pedidos', href: '/dashboard/restaurant/orders' },
    { icon: Settings, label: 'Configurações', href: '/dashboard/restaurant/settings' },
  ];

  const stats = [
    { label: 'Pedidos Hoje', value: '24', icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Em Preparo', value: '3', icon: Clock, color: 'bg-orange-500' },
    { label: 'Concluídos', value: '18', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Faturamento', value: 'R$ 1.240', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  const recentOrders = [
    { id: '#1234', customer: 'João Silva', items: '2x Hambúrguer, 1x Batata', total: 'R$ 67,90', status: 'Em preparo', time: '5 min atrás' },
    { id: '#1233', customer: 'Maria Santos', items: '1x Pizza Grande', total: 'R$ 89,90', status: 'Pronto', time: '12 min atrás' },
    { id: '#1232', customer: 'Pedro Oliveira', items: '3x Sushi, 1x Missoshiru', total: 'R$ 124,50', status: 'Entregue', time: '25 min atrás' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
        <div className="flex items-center justify-between p-4 lg:p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-600 rounded-lg">
              <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="text-base lg:text-xl font-bold text-gray-900 truncate">{user.tenant?.name || 'Restaurante'}</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-red-50 text-red-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm lg:text-base">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="p-3 lg:p-4 border-t">
          <div className="flex items-center space-x-3 mb-3 lg:mb-4">
            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-red-600 font-semibold text-sm lg:text-base">{user.name?.charAt(0)}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-3 lg:px-4 py-2 lg:py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm lg:text-base"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-lg lg:text-2xl font-bold text-gray-900">Painel do Restaurante</h1>
            </div>
            <button className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm lg:text-base whitespace-nowrap">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Novo Pedido</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-2 lg:p-3 rounded-lg`}>
                    <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cards Principais */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
            {/* Pedidos Recentes */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base lg:text-lg font-bold text-gray-900">Pedidos Recentes</h2>
                <a href="/dashboard/restaurant/orders" className="text-xs lg:text-sm text-red-600 hover:text-red-700 font-medium whitespace-nowrap">Ver todos</a>
              </div>
              <div className="space-y-3 lg:space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0 mr-3">
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        <span className="font-semibold text-gray-900 text-sm lg:text-base">{order.id}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full whitespace-nowrap ${
                          order.status === 'Em preparo' ? 'bg-orange-100 text-orange-700' :
                          order.status === 'Pronto' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 truncate">{order.customer}</p>
                      <p className="text-xs text-gray-500 truncate">{order.items}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-gray-900 text-sm lg:text-base">{order.total}</p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Acesso Rápido */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <h2 className="text-base lg:text-lg font-bold text-gray-900 mb-4">Acesso Rápido</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                <a href="/dashboard/restaurant/menu" className="p-3 lg:p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-red-600 mb-2" />
                  <p className="font-medium text-gray-900 text-sm lg:text-base">Gerenciar Cardápio</p>
                  <p className="text-xs lg:text-sm text-gray-600">Adicione ou edite itens</p>
                </a>
                <a href="/dashboard/restaurant/orders" className="p-3 lg:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <ShoppingBag className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 mb-2" />
                  <p className="font-medium text-gray-900 text-sm lg:text-base">Ver Pedidos</p>
                  <p className="text-xs lg:text-sm text-gray-600">Acompanhe todos os pedidos</p>
                </a>
                <a href="#" className="p-3 lg:p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-green-600 mb-2" />
                  <p className="font-medium text-gray-900 text-sm lg:text-base">Relatórios</p>
                  <p className="text-xs lg:text-sm text-gray-600">Veja suas métricas</p>
                </a>
                <a href="/dashboard/restaurant/settings" className="p-3 lg:p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <Settings className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600 mb-2" />
                  <p className="font-medium text-gray-900 text-sm lg:text-base">Configurações</p>
                  <p className="text-xs lg:text-sm text-gray-600">Ajuste seu perfil</p>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
