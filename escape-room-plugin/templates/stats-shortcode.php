<?php
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="escape-room-stats">
    <h3><?php _e('📊 Suas Estatísticas - Escape Room', 'escape-room-security'); ?></h3>
    
    <?php if ($stats['total_completions'] > 0): ?>
        <div class="escape-room-stats-grid">
            <div class="escape-room-stat-item">
                <div class="escape-room-stat-number"><?php echo intval($stats['total_completions']); ?></div>
                <div class="escape-room-stat-label"><?php _e('Completações', 'escape-room-security'); ?></div>
            </div>
            
            <div class="escape-room-stat-item">
                <div class="escape-room-stat-number"><?php echo intval($stats['best_percentage']); ?>%</div>
                <div class="escape-room-stat-label"><?php _e('Melhor Taxa', 'escape-room-security'); ?></div>
            </div>
            
            <div class="escape-room-stat-item">
                <div class="escape-room-stat-number"><?php echo intval($stats['best_score']); ?></div>
                <div class="escape-room-stat-label"><?php _e('Melhor Pontuação', 'escape-room-security'); ?></div>
            </div>
            
            <div class="escape-room-stat-item">
                <div class="escape-room-stat-number"><?php echo number_format(floatval($stats['avg_percentage']), 1); ?>%</div>
                <div class="escape-room-stat-label"><?php _e('Média de Acerto', 'escape-room-security'); ?></div>
            </div>
        </div>
        
        <?php if ($stats['last_completion']): ?>
            <div class="escape-room-achievement-badge">
                <strong><?php _e('🕒 Última tentativa:', 'escape-room-security'); ?></strong>
                <?php echo date_i18n(get_option('date_format'), strtotime($stats['last_completion'])); ?>
            </div>
        <?php endif; ?>
        
    <?php else: ?>
        <div class="escape-room-no-stats">
            <p><?php _e('Você ainda não completou o Escape Room.', 'escape-room-security'); ?></p>
            <p><a href="#" style="color: #dc2626;"><?php _e('Que tal tentar agora?', 'escape-room-security'); ?></a></p>
        </div>
    <?php endif; ?>
</div>
