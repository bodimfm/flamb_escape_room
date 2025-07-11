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
  enableGamiPressTracking: true,
  gamiPressWebhookUrl: "https://seusite.com/wp-json/gamipress/v1/achievements/award",

  // Performance-based achievement IDs for GamiPress
  achievementIds: {
    // 0-25% de acerto (0-50 pontos)
    bronze: {
      id: "security_bronze_badge",
      name: "Aprendiz de Segurança",
      description: "Completou o desafio e demonstrou interesse em segurança da informação",
      minPercentage: 0,
      maxPercentage: 25,
      points: 10,
      color: "#CD7F32",
    },
    // 26-50% de acerto (51-100 pontos)
    silver: {
      id: "security_silver_badge",
      name: "Guardião Digital",
      description: "Demonstrou conhecimento básico em segurança da informação",
      minPercentage: 26,
      maxPercentage: 50,
      points: 25,
      color: "#C0C0C0",
    },
    // 51-75% de acerto (101-150 pontos)
    gold: {
      id: "security_gold_badge",
      name: "Especialista em Segurança",
      description: "Excelente conhecimento em práticas de segurança digital",
      minPercentage: 51,
      maxPercentage: 75,
      points: 50,
      color: "#FFD700",
    },
    // 76-100% de acerto (151-200 pontos)
    platinum: {
      id: "security_platinum_badge",
      name: "Mestre da Segurança",
      description: "Domínio excepcional em segurança da informação",
      minPercentage: 76,
      maxPercentage: 100,
      points: 100,
      color: "#E5E4E2",
    },
  },

  // Visual settings
  primaryColor: "#dc2626", // Default red
  secondaryColor: "#7f1d1d",
  logoPath: "/images/logo.png",
}

// Helper function to determine achievement based on performance
export const getAchievementByPerformance = (correctAnswers: number, totalQuestions: number) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100)

  const { achievementIds } = gameConfig

  if (percentage >= achievementIds.platinum.minPercentage) {
    return { ...achievementIds.platinum, percentage }
  } else if (percentage >= achievementIds.gold.minPercentage) {
    return { ...achievementIds.gold, percentage }
  } else if (percentage >= achievementIds.silver.minPercentage) {
    return { ...achievementIds.silver, percentage }
  } else {
    return { ...achievementIds.bronze, percentage }
  }
}
