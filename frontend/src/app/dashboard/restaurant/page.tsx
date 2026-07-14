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
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-600 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">{user.tenant?.name || 'Restaurante'}</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-red-50 text-red-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-semibold">{user.name?.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:ml-64">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Painel do Restaurante</h1>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Novo Pedido</span>
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Pedidos Recentes</h2>
                <a href="/dashboard/restaurant/orders" className="text-sm text-red-600 hover:text-red-700 font-medium">Ver todos</a>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{order.id}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'Em preparo' ? 'bg-orange-100 text-orange-700' :
                          order.status === 'Pronto' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.items}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{order.total}</p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Acesso Rápido</h2>
              <div className="grid grid-cols-2 gap-4">
                <a href="/dashboard/restaurant/menu" className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <BookOpen className="w-8 h-8 text-red-600 mb-2" />
                  <p className="font-medium text-gray-900">Gerenciar Cardápio</p>
                  <p className="text-sm text-gray-600">Adicione ou edite itens</p>
                </a>
                <a href="/dashboard/restaurant/orders" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <ShoppingBag className="w-8 h-8 text-blue-600 mb-2" />
                  <p className="font-medium text-gray-900">Ver Pedidos</p>
                  <p className="text-sm text-gray-600">Acompanhe todos os pedidos</p>
                </a>
                <a href="#" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                  <p className="font-medium text-gray-900">Relatórios</p>
                  <p className="text-sm text-gray-600">Veja suas métricas</p>
                </a>
                <a href="/dashboard/restaurant/settings" className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <Settings className="w-8 h-8 text-purple-600 mb-2" />
                  <p className="font-medium text-gray-900">Configurações</p>
                  <p className="text-sm text-gray-600">Ajuste seu perfil</p>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
