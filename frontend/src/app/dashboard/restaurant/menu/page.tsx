'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye,
  XCircle,
  Tag,
  UtensilsCrossed,
  DollarSign,
  Clock
} from 'lucide-react';

// Dados mockados para demonstração
const mockCategories = [
  { id: 1, name: 'Pizzas', description: 'Pizzas artesanais com diversos sabores', itemCount: 24, color: 'bg-red-500' },
  { id: 2, name: 'Bebidas', description: 'Refrigerantes, sucos e cervejas', itemCount: 18, color: 'bg-blue-500' },
  { id: 3, name: 'Lanches', description: 'Hambúrgueres, cachorro-quente e porções', itemCount: 32, color: 'bg-orange-500' },
  { id: 4, name: 'Sobremesas', description: 'Doces, bolos e sorvetes', itemCount: 15, color: 'bg-pink-500' },
  { id: 5, name: 'Acompanhamentos', description: 'Batatas, saladas e molhos', itemCount: 12, color: 'bg-green-500' },
];

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);

  const filteredCategories = mockCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cardápio</h1>
            <p className="mt-1 text-sm text-gray-500">Gerencie categorias e itens do seu cardápio</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowItemModal(true)}
              className="inline-flex items-center px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors shadow-sm"
            >
              <UtensilsCrossed className="h-4 w-4 mr-2" />
              Novo Item
            </button>
            <button 
              onClick={() => setShowCategoryModal(true)}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Categoria
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
              <Tag className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Categorias</p>
              <p className="text-2xl font-semibold text-gray-900">{mockCategories.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-orange-100 p-3 rounded-lg">
              <UtensilsCrossed className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total de Itens</p>
              <p className="text-2xl font-semibold text-gray-900">101</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ticket Médio</p>
              <p className="text-2xl font-semibold text-gray-900">R$ 45,90</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Última Atualização</p>
              <p className="text-2xl font-semibold text-gray-900">Hoje</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar categorias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className={`h-2 ${category.color}`}></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-12 w-12 ${category.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                    {category.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.itemCount} itens</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-blue-600 transition-colors" title="Visualizar">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-green-600 transition-colors" title="Editar">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600 transition-colors" title="Excluir">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
                Gerenciar Itens
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Nova Categoria */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Nova Categoria</h2>
              <button onClick={() => setShowCategoryModal(false)} className="text-gray-400 hover:text-gray-500">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Categoria</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="Ex: Pizzas" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="Descrição da categoria..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cor</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option value="red">Vermelho</option>
                  <option value="blue">Azul</option>
                  <option value="green">Verde</option>
                  <option value="orange">Laranja</option>
                  <option value="pink">Rosa</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setShowCategoryModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Criar Categoria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Novo Item */}
      {showItemModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Novo Item</h2>
              <button onClick={() => setShowItemModal(false)} className="text-gray-400 hover:text-gray-500">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Item</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="Ex: Pizza Calabresa" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option value="">Selecione uma categoria</option>
                  {mockCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                <input type="number" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="Ingredientes e detalhes..." />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="available" className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                <label htmlFor="available" className="ml-2 block text-sm text-gray-700">Disponível</label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setShowItemModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  Criar Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
