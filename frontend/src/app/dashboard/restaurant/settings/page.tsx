'use client';

import { useState } from 'react';
import { 
  Store, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard, 
  Save,
  Upload,
  XCircle,
  CheckCircle
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [showLogoModal, setShowLogoModal] = useState(false);

  const tabs = [
    { id: 'general', name: 'Geral', icon: Store },
    { id: 'hours', name: 'Horário de Funcionamento', icon: Clock },
    { id: 'delivery', name: 'Entrega', icon: MapPin },
    { id: 'contact', name: 'Contato', icon: Phone },
    { id: 'payment', name: 'Pagamento', icon: CreditCard },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="mt-1 text-sm text-gray-500">Gerencie as configurações do seu restaurante</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informações do Restaurante</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo do Restaurante</label>
                  <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <Store className="h-8 w-8 text-gray-400" />
                    </div>
                    <button
                      onClick={() => setShowLogoModal(true)}
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Alterar Logo
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Restaurante</label>
                  <input type="text" defaultValue="Restaurante Exemplo" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
                  <input type="text" defaultValue="00.000.000/0000-00" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea rows={3} defaultValue="O melhor da culinária artesanal na sua casa." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button className="inline-flex items-center px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </button>
            </div>
          </div>
        )}

        {activeTab === 'hours' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Horário de Funcionamento</h3>
              <div className="space-y-4">
                {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map((day, index) => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-gray-700">{day}</div>
                    <div className="flex items-center gap-2">
                      <input type="time" defaultValue="18:00" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm" />
                      <span className="text-gray-500">até</span>
                      <input type="time" defaultValue="23:00" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm" />
                    </div>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                      <span className="ml-2 text-sm text-gray-600">Aberto</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button className="inline-flex items-center px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                <Save className="h-4 w-4 mr-2" />
                Salvar Horário
              </button>
            </div>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Configurações de Entrega</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Raio de Entrega (km)</label>
                  <input type="number" defaultValue="5" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Taxa de Entrega (R$)</label>
                  <input type="number" step="0.01" defaultValue="5.00" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Endereço Completo</label>
                  <input type="text" defaultValue="Rua das Flores, 123 - Centro" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-2" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" defaultValue="São Paulo" placeholder="Cidade" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                    <input type="text" defaultValue="SP" placeholder="Estado" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button className="inline-flex items-center px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                <Save className="h-4 w-4 mr-2" />
                Salvar Endereço
              </button>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informações de Contato</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="tel" defaultValue="(11) 99999-9999" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="tel" defaultValue="(11) 99999-9999" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="email" defaultValue="contato@restaurante.com" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button className="inline-flex items-center px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                <Save className="h-4 w-4 mr-2" />
                Salvar Contato
              </button>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Formas de Pagamento</h3>
              <p className="text-sm text-gray-500 mb-4">Selecione as formas de pagamento aceitas pelo seu restaurante</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'cash', name: 'Dinheiro', icon: 'R$' },
                  { id: 'credit', name: 'Cartão de Crédito', icon: '💳' },
                  { id: 'debit', name: 'Cartão de Débito', icon: '💳' },
                  { id: 'pix', name: 'PIX', icon: '📱' },
                ].map((method) => (
                  <label key={method.id} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                    <div className="ml-3 flex items-center">
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{method.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-900">Pagamento na Entrega</h4>
                  <p className="mt-1 text-sm text-blue-700">Todas as formas de pagamento selecionadas estarão disponíveis para o cliente no momento da entrega do pedido.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button className="inline-flex items-center px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                <Save className="h-4 w-4 mr-2" />
                Salvar Pagamentos
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Upload Logo */}
      {showLogoModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Alterar Logo</h2>
              <button onClick={() => setShowLogoModal(false)} className="text-gray-400 hover:text-gray-500">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">Arraste e solte uma imagem aqui ou</p>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">escolher arquivo</button>
              <p className="text-xs text-gray-500 mt-4">PNG, JPG até 2MB</p>
            </div>
            <div className="flex space-x-3 pt-4">
              <button type="button" onClick={() => setShowLogoModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button type="submit" className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Salvar Logo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
