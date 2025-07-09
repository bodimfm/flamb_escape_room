import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Code, Award, Settings, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Integration() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gradient-to-b from-red-950 to-red-900">
      <div className="max-w-4xl w-full">
        <Link href="/" className="flex items-center text-red-300 hover:text-red-100 mb-8">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Voltar ao Início
        </Link>

        <div className="flex items-center justify-center mb-8">
          <Image src="/images/logo.png" alt="Flamboyant Shopping Logo" width={120} height={120} />
          <h1 className="text-4xl font-bold text-white ml-4">Instruções de Integração</h1>
        </div>

        <Tabs defaultValue="wordpress" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-red-950/70 border border-red-800">
            <TabsTrigger value="wordpress">WordPress</TabsTrigger>
            <TabsTrigger value="gamipress">GamiPress</TabsTrigger>
            <TabsTrigger value="config">Configuração</TabsTrigger>
          </TabsList>

          <TabsContent
            value="wordpress"
            className="mt-6 bg-red-950/70 p-6 rounded-lg border border-red-800 text-gray-200"
          >
            <h2 className="text-2xl font-semibold text-red-300 mb-4 flex items-center">
              <Code className="mr-2 h-6 w-6" />
              Integração com WordPress
            </h2>

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-medium text-red-200 mb-2">Passo 1: Instalação do Jogo</h3>
                <p className="mb-3">
                  Para integrar este jogo em seu site WordPress, você precisará adicionar os arquivos do jogo ao seu
                  tema ou criar uma página personalizada.
                </p>
                <div className="bg-red-900/50 p-4 rounded-lg border border-red-700">
                  <h4 className="font-medium text-red-300 mb-2">Método 1: Usando um iframe</h4>
                  <p className="mb-2">
                    Esta é a maneira mais simples de integrar o jogo. Hospede os arquivos em um subdiretório do seu site
                    e use um iframe:
                  </p>
                  <pre className="bg-gray-900 p-3 rounded-md text-sm overflow-x-auto">
                    {`<iframe 
  src="https://seusite.com/jogos/escape-room/" 
  width="100%" 
  height="800" 
  frameborder="0"
></iframe>`}
                  </pre>
                </div>

                <div className="bg-red-900/50 p-4 rounded-lg border border-red-700 mt-4">
                  <h4 className="font-medium text-red-300 mb-2">Método 2: Usando um Plugin de HTML Personalizado</h4>
                  <p className="mb-2">
                    Instale um plugin como "Custom HTML Block" e adicione o código do jogo diretamente em uma página:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-2">
                    <li>Instale e ative o plugin "Custom HTML Block" ou similar</li>
                    <li>Crie uma nova página no WordPress</li>
                    <li>Adicione um bloco HTML personalizado</li>
                    <li>Cole o código HTML, CSS e JavaScript do jogo</li>
                    <li>Publique a página</li>
                  </ol>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-medium text-red-200 mb-2">
                  Passo 2: Configuração da URL de Redirecionamento
                </h3>
                <p className="mb-3">
                  O jogo inclui um botão "Finalizar" que redireciona o jogador para uma URL específica após a conclusão.
                  Esta URL pode ser configurada para apontar para qualquer página do seu site WordPress.
                </p>
                <div className="bg-red-900/50 p-4 rounded-lg border border-red-700">
                  <p className="mb-2">
                    Edite o arquivo <code>config.js</code> para definir a URL de redirecionamento:
                  </p>
                  <pre className="bg-gray-900 p-3 rounded-md text-sm overflow-x-auto">
                    {`// config.js
export const gameConfig = {
  redirectUrl: "https://seusite.com/conclusao-do-jogo/",
  gameTitle: "Escape Room - Vazamento de Dados",
  // outras configurações...
};`}
                  </pre>
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent
            value="gamipress"
            className="mt-6 bg-red-950/70 p-6 rounded-lg border border-red-800 text-gray-200"
          >
            <h2 className="text-2xl font-semibold text-red-300 mb-4 flex items-center">
              <Award className="mr-2 h-6 w-6" />
              Integração com GamiPress
            </h2>

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-medium text-red-200 mb-2">Passo 1: Instalação do GamiPress</h3>
                <p className="mb-3">
                  Certifique-se de que o plugin GamiPress está instalado e ativado em seu site WordPress.
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>Acesse o painel do WordPress > Plugins > Adicionar novo</li>
                  <li>Pesquise por "GamiPress"</li>
                  <li>Instale e ative o plugin GamiPress</li>
                  <li>Configure os tipos de pontos e conquistas básicas</li>
                </ol>
              </section>

              <section>
                <h3 className="text-xl font-medium text-red-200 mb-2">Passo 2: Criação de Conquistas</h3>
                <p className="mb-3">Configure conquistas específicas para o jogo Escape Room no GamiPress.</p>
                <div className="bg-red-900/50 p-4 rounded-lg border border-red-700">
                  <h4 className="font-medium text-red-300 mb-2">Exemplo de Conquistas:</h4>
                  <ol className="list-decimal list-inside space-y-2 ml-2">
                    <li>Acesse GamiPress > Conquistas > Adicionar Nova</li>
                    <li>Crie uma conquista chamada "Especialista em Segurança"</li>
                    <li>Defina a descrição e pontos para a conquista</li>
                    <li>Em "Requisitos", adicione um novo requisito do tipo "Visitar uma URL específica"</li>
                    <li>Configure o requisito para a URL de conclusão do jogo (a mesma URL definida no config.js)</li>
                    <li>Salve a conquista</li>
                  </ol>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-medium text-red-200 mb-2">Passo 3: Configuração de Pontos</h3>
                <p className="mb-3">Configure um sistema de pontos para recompensar os jogadores.</p>
                <div className="bg-red-900/50 p-4 rounded-lg border border-red-700">
                  <h4 className="font-medium text-red-300 mb-2">Configuração de Pontos:</h4>
                  <ol className="list-decimal list-inside space-y-2 ml-2">
                    <li>Acesse GamiPress > Tipos de Pontos > Adicionar Novo</li>
                    <li>Crie um tipo de ponto chamado "Pontos de Segurança"</li>
                    <li>Acesse GamiPress > Regras de Pontos > Adicionar Nova</li>
                    <li>Crie uma regra para conceder pontos quando o usuário visitar a URL de conclusão</li>
                    <li>Defina a quantidade de pontos (ex: 100 pontos)</li>
                    <li>Salve a regra</li>
                  </ol>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-medium text-red-200 mb-2">Passo 4: Rastreamento Avançado (Opcional)</h3>
                <p className="mb-3">
                  Para um rastreamento mais avançado, você pode usar o webhook do GamiPress para registrar eventos
                  específicos do jogo.
                </p>
                <div className="bg-red-900/50 p-4 rounded-lg border border-red-700">
                  <h4 className="font-medium text-red-300 mb-2">Configuração de Webhook:</h4>
                  <p className="mb-2">
                    Edite o arquivo <code>game-win.tsx</code> para incluir uma chamada ao webhook do GamiPress:
                  </p>
                  <pre className="bg-gray-900 p-3 rounded-md text-sm overflow-x-auto">
                    {`// Exemplo de código para enviar dados ao GamiPress
const sendGameCompletion = (userId, score, timeRemaining) => {
  fetch('https://seusite.com/wp-json/gamipress/v1/track-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event: 'escape_room_completed',
      user_id: userId,
      score: score,
      time_remaining: timeRemaining,
      // outros dados relevantes
    }),
  });
};`}
                  </pre>
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="config" className="mt-6 bg-red-950/70 p-6 rounded-lg border border-red-800 text-gray-200">
            <h2 className="text-2xl font-semibold text-red-300 mb-4 flex items-center">
              <Settings className="mr-2 h-6 w-6" />
              Configuração Avançada
            </h2>

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-medium text-red-200 mb-2">Personalização do Jogo</h3>
                <p className="mb-3">
                  Você pode personalizar vários aspectos do jogo editando o arquivo de configuração.
                </p>
                <div className="bg-red-900/50 p-4 rounded-lg border border-red-700">
                  <h4 className="font-medium text-red-300 mb-2">Opções de Configuração:</h4>
                  <pre className="bg-gray-900 p-3 rounded-md text-sm overflow-x-auto">
                    {`// config.js - Opções completas
export const gameConfig = {
  // URL para redirecionamento após conclusão do jogo
  redirectUrl: "https://seusite.com/conclusao-do-jogo/",
  
  // Informações do jogo
  gameTitle: "Escape Room - Vazamento de Dados",
  companyName: "Flamboyant Shopping",
  
  // Configurações de tempo
  timeLimit: 600, // em segundos (10 minutos)
  
  // Textos personalizados
  finishButtonText: "Finalizar",
  successMessage: "Parabéns! Você completou o desafio com sucesso!",
  
  // Parâmetros para passar na URL de redirecionamento
  includeScoreInRedirect: true,
  includeTimeInRedirect: true,
  
  // Integração com GamiPress
  enableGamiPressTracking: false,
  gamiPressWebhookUrl: "",
  
  // Configurações visuais
  primaryColor: "#dc2626", // Vermelho padrão
  secondaryColor: "#7f1d1d",
  logoPath: "/images/logo.png",
};`}
                  </pre>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-medium text-red-200 mb-2">Passando Parâmetros na URL</h3>
                <p className="mb-3">
                  Você pode configurar o jogo para passar informações adicionais na URL de redirecionamento, que podem
                  ser usadas pelo GamiPress para atribuir pontos ou conquistas baseados no desempenho.
                </p>
                <div className="bg-red-900/50 p-4 rounded-lg border border-red-700">
                  <h4 className="font-medium text-red-300 mb-2">Exemplo de URL com Parâmetros:</h4>
                  <pre className="bg-gray-900 p-3 rounded-md text-sm overflow-x-auto">
                    {`https://seusite.com/conclusao-do-jogo/?completed=true&score=500&time=374&code=38659`}
                  </pre>
                  <p className="mt-2">
                    Estes parâmetros podem ser capturados pelo GamiPress para atribuir pontos variáveis baseados no
                    desempenho.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-medium text-red-200 mb-2">Identificação de Usuários</h3>
                <p className="mb-3">
                  Para rastrear o progresso de usuários específicos, você pode passar o ID do usuário WordPress para o
                  jogo.
                </p>
                <div className="bg-red-900/50 p-4 rounded-lg border border-red-700">
                  <h4 className="font-medium text-red-300 mb-2">Código PHP para WordPress:</h4>
                  <pre className="bg-gray-900 p-3 rounded-md text-sm overflow-x-auto">
                    {`<?php
// Adicione este código ao seu tema ou plugin
function add_user_id_to_game_url() {
    if ( is_user_logged_in() ) {
        $user_id = get_current_user_id();
        ?>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                // Adiciona o ID do usuário como parâmetro na URL do jogo
                var gameIframe = document.getElementById('escape-room-iframe');
                if (gameIframe) {
                    var currentSrc = gameIframe.src;
                    gameIframe.src = currentSrc + (currentSrc.includes('?') ? '&' : '?') + 'user_id=<?php echo $user_id; ?>';
                }
            });
        </script>
        <?php
    }
}
add_action('wp_footer', 'add_user_id_to_game_url');
?>`}
                  </pre>
                </div>
              </section>

              <div className="mt-8 flex justify-center">
                <a
                  href="https://gamipress.com/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-red-300 hover:text-red-100"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Documentação Completa do GamiPress
                </a>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
