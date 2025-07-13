<?php
if (!defined('ABSPATH')) {
    exit;
}

$stats = $this->get_global_stats();
?>

<div class="wrap">
    <h1><?php _e('Escape Room - Security Challenge', 'escape-room-security'); ?></h1>
    
    <div class="escape-room-admin-header">
        <div class="escape-room-logo">
            <img src="<?php echo ESCAPE_ROOM_PLUGIN_URL; ?>assets/images/logo.png" alt="Escape Room" style="max-width: 100px;">
        </div>
        <div class="escape-room-info">
            <h2><?php _e('Painel de Controle', 'escape-room-security'); ?></h2>
            <p><?php _e('Gerencie o jogo educativo sobre segurança da informação', 'escape-room-security'); ?></p>
        </div>
    </div>

    <div class="escape-room-dashboard">
        <div class="escape-room-stats-grid">
            <div class="stat-card">
                <div class="stat-number"><?php echo $stats['total_completions']; ?></div>
                <div class="stat-label"><?php _e('Total de Completações', 'escape-room-security'); ?></div>
            </div>
            
            <div class="stat-card">
                <div class="stat-number"><?php echo $stats['unique_users']; ?></div>
                <div class="stat-label"><?php _e('Usuários Únicos', 'escape-room-security'); ?></div>
            </div>
            
            <div class="stat-card">
                <div class="stat-number"><?php echo number_format($stats['avg_percentage'], 1); ?>%</div>
                <div class="stat-label"><?php _e('Taxa Média de Acerto', 'escape-room-security'); ?></div>
            </div>
            
            <div class="stat-card">
                <div class="stat-number"><?php echo $stats['today_completions']; ?></div>
                <div class="stat-label"><?php _e('Completações Hoje', 'escape-room-security'); ?></div>
            </div>
        </div>

        <div class="escape-room-quick-actions">
            <h3><?php _e('Ações Rápidas', 'escape-room-security'); ?></h3>
            
            <div class="quick-actions-grid">
                <a href="<?php echo admin_url('admin.php?page=escape-room-settings'); ?>" class="quick-action-card">
                    <div class="quick-action-icon">⚙️</div>
                    <div class="quick-action-title"><?php _e('Configurações', 'escape-room-security'); ?></div>
                    <div class="quick-action-desc"><?php _e('Configure o jogo e integrações', 'escape-room-security'); ?></div>
                </a>
                
                <a href="<?php echo admin_url('admin.php?page=escape-room-reports'); ?>" class="quick-action-card">
                    <div class="quick-action-icon">📊</div>
                    <div class="quick-action-title"><?php _e('Relatórios', 'escape-room-security'); ?></div>
                    <div class="quick-action-desc"><?php _e('Visualize estatísticas detalhadas', 'escape-room-security'); ?></div>
                </a>
                
                <a href="<?php echo admin_url('admin.php?page=escape-room-shortcodes'); ?>" class="quick-action-card">
                    <div class="quick-action-icon">📝</div>
                    <div class="quick-action-title"><?php _e('Shortcodes', 'escape-room-security'); ?></div>
                    <div class="quick-action-desc"><?php _e('Códigos para inserir o jogo', 'escape-room-security'); ?></div>
                </a>
                
                <a href="<?php echo ESCAPE_ROOM_PLUGIN_URL; ?>game/escape-room-vanilla.html" target="_blank" class="quick-action-card">
                    <div class="quick-action-icon">🎮</div>
                    <div class="quick-action-title"><?php _e('Testar Jogo', 'escape-room-security'); ?></div>
                    <div class="quick-action-desc"><?php _e('Abrir o jogo em nova aba', 'escape-room-security'); ?></div>
                </a>
            </div>
        </div>

        <div class="escape-room-recent-activity">
            <h3><?php _e('Atividade Recente', 'escape-room-security'); ?></h3>
            
            <?php
            global $wpdb;
            $table_name = $wpdb->prefix . 'escape_room_completions';
            $recent_completions = $wpdb->get_results("
                SELECT c.*, u.display_name, u.user_email 
                FROM $table_name c 
                LEFT JOIN {$wpdb->users} u ON c.user_id = u.ID 
                ORDER BY c.completion_date DESC 
                LIMIT 10
            ");
            ?>
            
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th><?php _e('Usuário', 'escape-room-security'); ?></th>
                        <th><?php _e('Data', 'escape-room-security'); ?></th>
                        <th><?php _e('Pontuação', 'escape-room-security'); ?></th>
                        <th><?php _e('Taxa de Acerto', 'escape-room-security'); ?></th>
                        <th><?php _e('Conquista', 'escape-room-security'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($recent_completions)): ?>
                        <tr>
                            <td colspan="5" style="text-align: center; padding: 20px;">
                                <?php _e('Nenhuma atividade recente encontrada.', 'escape-room-security'); ?>
                            </td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($recent_completions as $completion): ?>
                            <tr>
                                <td>
                                    <strong><?php echo esc_html($completion->display_name ?: 'Usuário #' . $completion->user_id); ?></strong>
                                    <br>
                                    <small><?php echo esc_html($completion->user_email); ?></small>
                                </td>
                                <td><?php echo date_i18n(get_option('date_format') . ' ' . get_option('time_format'), strtotime($completion->completion_date)); ?></td>
                                <td><strong><?php echo $completion->score; ?></strong> pontos</td>
                                <td>
                                    <span class="percentage-badge percentage-<?php echo $completion->percentage >= 75 ? 'high' : ($completion->percentage >= 50 ? 'medium' : 'low'); ?>">
                                        <?php echo $completion->percentage; ?>%
                                    </span>
                                </td>
                                <td><?php echo esc_html(str_replace('_badge', '', $completion->achievement_id)); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php
// Add method to main class to get global stats
if (!method_exists('EscapeRoomSecurityChallenge', 'get_global_stats')) {
    // This would be added to the main class
}
?>

<style>
.escape-room-admin-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    padding: 20px;
    background: #fff;
    border: 1px solid #ccd0d4;
    border-radius: 8px;
}

.escape-room-logo {
    margin-right: 20px;
}

.escape-room-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    background: #fff;
    border: 1px solid #ccd0d4;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
}

.stat-number {
    font-size: 2.5em;
    font-weight: bold;
    color: #dc2626;
    margin-bottom: 5px;
}

.stat-label {
    color: #666;
    font-size: 0.9em;
}

.quick-actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 15px;
}

.quick-action-card {
    background: #fff;
    border: 1px solid #ccd0d4;
    border-radius: 8px;
    padding: 20px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
}

.quick-action-card:hover {
    border-color: #dc2626;
    box-shadow: 0 2px 8px rgba(220, 38, 38, 0.1);
    color: inherit;
}

.quick-action-icon {
    font-size: 2em;
    margin-bottom: 10px;
}

.quick-action-title {
    font-weight: bold;
    margin-bottom: 5px;
}

.quick-action-desc {
    color: #666;
    font-size: 0.9em;
}

.escape-room-recent-activity {
    background: #fff;
    border: 1px solid #ccd0d4;
    border-radius: 8px;
    padding: 20px;
    margin-top: 30px;
}

.percentage-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.9em;
}

.percentage-high {
    background: #d4edda;
    color: #155724;
}

.percentage-medium {
    background: #fff3cd;
    color: #856404;
}

.percentage-low {
    background: #f8d7da;
    color: #721c24;
}
</style>
