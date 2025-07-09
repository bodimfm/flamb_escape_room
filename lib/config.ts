// Configuration file for the escape room game

export const gameConfig = {
  // URL for redirection after game completion
  redirectUrl: "https://seusite.com/conclusao-do-jogo/",

  // Game information
  gameTitle: "Escape Room - Vazamento de Dados",
  companyName: "Flamboyant Shopping",

  // Time settings
  timeLimit: 600, // in seconds (10 minutes)

  // Custom text
  finishButtonText: "Finalizar",
  successMessage: "Parabéns! Você completou o desafio com sucesso!",

  // Parameters to pass in the redirect URL
  includeScoreInRedirect: true,
  includeTimeInRedirect: true,

  // GamiPress integration
  enableGamiPressTracking: false,
  gamiPressWebhookUrl: "",

  // Visual settings
  primaryColor: "#dc2626", // Default red
  secondaryColor: "#7f1d1d",
  logoPath: "/images/logo.png",
}
