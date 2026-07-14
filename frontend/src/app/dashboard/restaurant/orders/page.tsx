'use client';

import { useState } from 'react';
import { 
  Search, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Package,
  ChefHat,
  Truck,
  DollarSign
} from 'lucide-react';

// Dados mockados para demonstração
const mockOrders = [
  { id: '#1234', customer: 'João Silva', items: '2x Pizza Calabresa, 1x Coca-Cola', total: 'R$ 89,90', status: 'pending', time: '15 min atrás', paymentMethod: 'Dinheiro' },
  { id: '#1235', customer: 'Maria Santos', items: '1x X-Bacon, 1x Batata Frita', total: 'R$ 45,50', status: 'preparing', time: '25 min atrás', paymentMethod: 'Cartão' },
  { id: '#1236', customer: 'Pedro Oliveira', items: '1x Sushi Combo, 2x Água', total: 'R$ 78,00', status: 'ready', time: '10 min atrás', paymentMethod: 'PIX' },
  { id: '#1237', customer: 'Ana Costa', items: '3x Hambúrguer Artesanal, 2x Refrigerante', total: 'R$ 125,90', status: 'delivered', time: '1 hora atrás', paymentMethod: 'Cartão' },
  { id: '#1238', customer: 'Carlos Ferreira', items: '1x Pizza Margherita, 1x Suco', total: 'R$ 65,00', status: 'pending', time: '5 min atrás', paymentMethod: 'Dinheiro' },
  { id: '#1239', customer: 'Luciana Mendes', items: '2x Porção de Fritas, 1x Milkshake', total: 'R$ 52,90', status: 'preparing', time: '20 min atrás', paymentMethod: 'PIX' },
];

const statusConfig = {
  pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  preparing: { label: 'Preparando', color: 'bg-blue-100 text-blue-800', icon: ChefHat },
  ready: { label: 'Pronto', color: 'bg-purple-100 text-purple-800', icon: Package },
  delivered: { label: 'Entregue', color: 'bg-green-100 text-green-800', icon: CheckCircle },
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    pending: mockOrders.filter(o => o.status === 'pending').length,
    preparing: mockOrders.filter(o => o.status === 'preparing').length,
    ready: mockOrders.filter(o => o.status === 'ready').length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length,
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
            <p className="mt-1 text-sm text-gray-500">Gerencie e acompanhe todos os pedidos</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pendentes</p>
              <p className="text-2xl font-semibold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Preparando</p>
              <p className="text-2xl font-semibold text-blue-600">{stats.preparing}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ChefHat className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Prontos</p>
              <p className="text-2xl font-semibold text-purple-600">{stats.ready}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Entregues</p>
              <p className="text-2xl font-semibold text-green-600">{stats.delivered}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por cliente ou pedido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedStatus === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Todos
            </button>
            {Object.entries(statusConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setSelectedStatus(key)}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedStatus === key
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
          const statusStyle = statusConfig[order.status as keyof typeof statusConfig];
          
          return (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-bold text-gray-900">{order.id}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle.color}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusStyle.label}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {order.time}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-sm text-gray-500">Cliente</p>
                        <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Pagamento</p>
                        <p className="text-sm font-medium text-gray-900 flex items-center">
                          <DollarSign className="h-3 w-3 mr-1" />
                          {order.paymentMethod}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-500">Itens</p>
                      <p className="text-sm text-gray-700">{order.items}</p>
                    </div>
                  </div>

                  {/* Total and Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-2xl font-bold text-gray-900">{order.total}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="inline-flex items-center px-3 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors border border-gray-300">
                        <Eye className="h-4 w-4 mr-1" />
                        Detalhes
                      </button>
                      {order.status === 'pending' && (
                        <button className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                          <ChefHat className="h-4 w-4 mr-1" />
                          Preparar
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button className="inline-flex items-center px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                          <Package className="h-4 w-4 mr-1" />
                          Marcar Pronto
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button className="inline-flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                          <Truck className="h-4 w-4 mr-1" />
                          Entregar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
          <p className="text-gray-500">Tente ajustar os filtros ou buscar por outro termo.</p>
        </div>
      )}
    </div>
  );
}
