import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function IntegrationSummary() {
  return (
    <Card className="bg-red-950/70 border-red-800 text-white mt-8">
      <CardHeader>
        <CardTitle className="text-2xl text-red-300">Integração com WordPress e GamiPress</CardTitle>
        <CardDescription className="text-gray-300">
          Resumo das etapas para integrar o jogo ao seu site WordPress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-medium text-red-200 mb-2">1. Configuração do Redirecionamento</h3>
          <p className="text-gray-200">
            Edite o arquivo <code>lib/config.ts</code> para definir a URL de redirecionamento após a conclusão do jogo:
          </p>
          <pre className="bg-gray-900 p-3 rounded-md text-sm overflow-x-auto mt-2">
            {`// lib/config.ts
export const gameConfig = {
  redirectUrl: "https://seusite.com/conclusao-do-jogo/",
  // outras configurações...
};`}
          </pre>
        </div>

        <div>
          <h3 className="text-xl font-medium text-red-200 mb-2">2. Integração com WordPress</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Hospede os arquivos do jogo em um subdiretório do seu site WordPress</li>
            <li>Incorpore o jogo usando um iframe ou bloco HTML personalizado</li>
            <li>Crie uma página de destino para receber os jogadores após a conclusão</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-medium text-red-200 mb-2">3. Configuração do GamiPress</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Instale e ative o plugin GamiPress no WordPress</li>
            <li>Crie uma conquista para jogadores que completam o jogo</li>
            <li>Configure regras de pontos baseadas na URL de conclusão</li>
            <li>
              Opcionalmente, configure o webhook para rastreamento avançado:
              <pre className="bg-gray-900 p-3 rounded-md text-sm overflow-x-auto mt-2">
                {`// Em lib/config.ts
export const gameConfig = {
  // ...
  enableGamiPressTracking: true,
  gamiPressWebhookUrl: "https://seusite.com/wp-json/gamipress/v1/track-event",
};`}
              </pre>
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <Link href="/integration" className="flex items-center text-red-300 hover:text-red-100">
            Ver instruções detalhadas <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
