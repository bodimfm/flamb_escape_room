# Escape Room - Vazamento de Dados

Jogo educativo sobre segurança da informação desenvolvido para o Flamboyant Shopping.

## Características

- Jogo de escape room temático sobre vazamento de dados
- 5 perguntas sobre segurança da informação
- Timer de 10 minutos
- Sistema de pontuação baseado no tempo
- Botão "Finalizar" com redirecionamento configurável
- Interface responsiva

## Configuração

Edite o arquivo `lib/config.ts` para personalizar:

- URL de redirecionamento após conclusão
- Textos do jogo
- Tempo limite
- Configurações visuais

## Estrutura de Arquivos

\`\`\`
/app
  /game - Página principal do jogo
  /instructions - Como jogar
  page.tsx - Página inicial
/components
  /game - Componentes do jogo
  /ui - Componentes de interface
/lib
  config.ts - Configurações principais
/public
  /images - Imagens do jogo
\`\`\`

## Deploy

1. Faça build do projeto Next.js
2. Hospede os arquivos em seu servidor
3. Configure a URL de redirecionamento no config.ts
4. Integre via iframe, shortcode ou HTML personalizado

## Parâmetros de URL

O jogo passa os seguintes parâmetros na URL de redirecionamento:

- `completed=true` - Jogo concluído com sucesso
- `score=XXX` - Pontuação do jogador
- `time=XXX` - Tempo restante em segundos
- `code=XXXXX` - Código de segurança encontrado
- `user_id=XXX` - ID do usuário (se fornecido)

## Tecnologias

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui
