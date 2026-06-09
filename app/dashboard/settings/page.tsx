"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Save,
  Check
} from 'lucide-react'

const tabs = [
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'notifications', label: 'Notificações', icon: Bell },
  { id: 'security', label: 'Segurança', icon: Shield },
  { id: 'appearance', label: 'Aparência', icon: Palette },
  { id: 'language', label: 'Idioma', icon: Globe },
]

const PROFILE_NAME_STORAGE_KEY = 'orbitguard:profileName'
const DEFAULT_PROFILE_NAME = 'Operador OrbitGuard'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)
  const [profileName, setProfileName] = useState(DEFAULT_PROFILE_NAME)

  useEffect(() => {
    const savedName = localStorage.getItem(PROFILE_NAME_STORAGE_KEY)

    if (savedName) {
      setProfileName(savedName)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem(PROFILE_NAME_STORAGE_KEY, profileName.trim() || DEFAULT_PROFILE_NAME)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-1">Gerencie suas preferências e configurações da conta</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="glass-card rounded-xl p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="glass-card rounded-xl p-6"
          >
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-foreground">Informações do Perfil</h2>
                
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <button className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-muted transition-colors">
                      Alterar foto
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nome</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="operador@orbitguard.com"
                      className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Organização</label>
                    <input
                      type="text"
                      defaultValue="Agência Espacial OrbitGuard"
                      className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-foreground">Preferências de Notificação</h2>
                
                <div className="space-y-4">
                  {[
                    { label: 'Alertas críticos de colisão', description: 'Receber notificações imediatas para riscos críticos', defaultChecked: true },
                    { label: 'Alertas de monitoramento', description: 'Notificações sobre objetos sendo monitorados', defaultChecked: true },
                    { label: 'Relatórios diários', description: 'Resumo diário de atividades orbitais', defaultChecked: false },
                    { label: 'Atualizações do sistema', description: 'Novidades e melhorias da plataforma', defaultChecked: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                        <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-foreground">Segurança da Conta</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Senha atual</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nova senha</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Confirmar nova senha</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium text-foreground mb-3">Autenticação de dois fatores</h3>
                  <button className="px-4 py-2 text-sm font-medium gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                    Ativar 2FA
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-foreground">Aparência</h2>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Tema</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Escuro', 'Claro', 'Sistema'].map((theme) => (
                      <button
                        key={theme}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                          theme === 'Escuro'
                            ? 'border-primary bg-primary/20 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Densidade da interface</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Compacto', 'Normal', 'Confortável'].map((density) => (
                      <button
                        key={density}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                          density === 'Normal'
                            ? 'border-primary bg-primary/20 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {density}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'language' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-foreground">Idioma e Região</h2>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Idioma</label>
                  <select className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary">
                    <option>Português (Brasil)</option>
                    <option>English (US)</option>
                    <option>Español</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Fuso horário</label>
                  <select className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary">
                    <option>UTC-3 (Brasília)</option>
                    <option>UTC-5 (Eastern)</option>
                    <option>UTC+0 (GMT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Formato de data</label>
                  <select className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary">
                    <option>DD/MM/AAAA</option>
                    <option>MM/DD/AAAA</option>
                    <option>AAAA-MM-DD</option>
                  </select>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-6 mt-6 border-t border-border">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 gradient-primary text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    Salvo
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar alterações
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
