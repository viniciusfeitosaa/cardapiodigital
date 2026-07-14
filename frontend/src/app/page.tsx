export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-6xl font-bold text-gray-900">
          Cardápio Digital
        </h1>
        
        <p className="text-xl text-gray-600">
          Sistema multi-tenant para restaurantes e delivery
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-lg font-semibold mb-2">Multi-Tenant</h3>
            <p className="text-gray-600">
              Múltiplas empresas em uma única instalação com isolamento completo
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-lg font-semibold mb-2">Seguro</h3>
            <p className="text-gray-600">
              Autenticação JWT com papéis de usuário e proteção de dados
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-lg font-semibold mb-2">Pronto para Produção</h3>
            <p className="text-gray-600">
              Dockerizado e configurado para deploy fácil em qualquer VPS
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              📋 Status do Projeto
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-green-500">✅</span>
                <span className="text-gray-700">Backend NestJS configurado</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-500">✅</span>
                <span className="text-gray-700">Autenticação JWT implementada</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-500">✅</span>
                <span className="text-gray-700">Gerenciamento de Tenants (Empresas)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-500">✅</span>
                <span className="text-gray-700">Gerenciamento de Usuários</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-500">✅</span>
                <span className="text-gray-700">Docker Compose configurado</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-500">✅</span>
                <span className="text-gray-700">Nginx Reverse Proxy</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-500">✅</span>
                <span className="text-gray-700">Documentação Swagger</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-yellow-500">⏳</span>
                <span className="text-gray-700">Módulo de Cardápios (em breve)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-yellow-500">⏳</span>
                <span className="text-gray-700">Dashboard Administrativo (em breve)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>API Documentation: <a href="/api-docs" className="text-blue-600 hover:underline">/api-docs</a></p>
          <p className="mt-2">Versão 1.0.0 - Pronto para produção</p>
        </div>
      </div>
    </main>
  );
}
