// Arquivo de configuração principal do jogo
// Edite este arquivo para personalizar o comportamento do jogo

// Configuration file for the escape room game

export const gameConfig = {
  // URL for redirection after game completion
  redirectUrl: "https://seusite.com/obrigado/",

  // Game information
  gameTitle: "Desafio de Segurança - Vazamento de Dados",
  companyName: "Flamboyant Shopping",

  // Custom text
  finishButtonText: "RESGATE SEUS PONTOS!",
  successMessage: "Parabéns! Você completou o desafio com sucesso!",

  // Parameters to pass in the redirect URL
  includePointsInRedirect: true,

  // GamiPress integration
  enableGamiPressTracking: false,
  gamiPressWebhookUrl: "",

  // Visual settings
  primaryColor: "#dc2626", // Default red
  secondaryColor: "#7f1d1d",
  logoPath: "/images/logo.png",
}
