<?php
/**
 * Plugin Name: Escape Room - Security Challenge
 * Plugin URI: https://v0-escape-room-game-development.vercel.app/
 * Description: Jogo educativo sobre segurança da informação com integração GamiPress - Versão BuddyBoss Compatible
 * Version: 1.0.0
 * Author: Flamboyant Shopping
 * License: GPL v2 or later
 * Text Domain: escape-room-simple
 * Requires at least: 5.0
 * Tested up to: 6.4
 * Requires PHP: 7.4
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('ESCAPE_ROOM_SIMPLE_VERSION', '1.0.0');
define('ESCAPE_ROOM_SIMPLE_PLUGIN_URL', plugin_dir_url(__FILE__));
define('ESCAPE_ROOM_SIMPLE_PLUGIN_PATH', plugin_dir_path(__FILE__));

class EscapeRoomSimple {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_shortcode('escape_room_game', array($this, 'game_shortcode'));
        add_shortcode('escape_room_stats', array($this, 'stats_shortcode'));
        add_action('wp_ajax_process_escape_room_achievement', array($this, 'process_achievement'));
        add_action('wp_ajax_nopriv_process_escape_room_achievement', array($this, 'process_achievement'));
        
        // Plugin activation/deactivation
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
        
        // Admin menu (optional)
        add_action('admin_menu', array($this, 'add_admin_menu'));
    }
    
    public function init() {
        // Create database table
        $this->create_table();
        
        // Load text domain
        load_plugin_textdomain('escape-room-simple', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    public function enqueue_scripts() {
        wp_enqueue_script('jquery');
        
        // Localize script for AJAX
        wp_localize_script('jquery', 'escapeRoomAjax', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('escape_room_nonce'),
            'strings' => array(
                'processing' => __('Processando conquista...', 'escape-room-simple'),
                'success' => __('Conquista processada com sucesso!', 'escape-room-simple'),
                'error' => __('Erro ao processar conquista.', 'escape-room-simple'),
            )
        ));
    }
    
    public function activate() {
        // Create database table
        $this->create_table();
        
        // Set default options
        $default_options = array(
            'company_name' => 'Flamboyant Shopping',
            'game_title' => 'Desafio de Segurança - Vazamento de Dados',
            'enable_gamipress' => true,
            'daily_limit' => false,
            'game_url' => 'https://v0-escape-room-game-development.vercel.app/game',
        );
        
        add_option('escape_room_simple_options', $default_options);
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    public function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    private function create_table() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'escape_room_completions';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            completion_date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            score int(11) NOT NULL DEFAULT 0,
            percentage int(11) NOT NULL DEFAULT 0,
            correct_answers int(11) NOT NULL DEFAULT 0,
            total_questions int(11) NOT NULL DEFAULT 8,
            achievement_id varchar(100) NOT NULL DEFAULT '',
            gamipress_points int(11) NOT NULL DEFAULT 0,
            completion_time int(11) NOT NULL DEFAULT 0,
            ip_address varchar(45) DEFAULT '',
            user_agent text,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY completion_date (completion_date),
            KEY achievement_id (achievement_id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    public function game_shortcode($atts) {
        $atts = shortcode_atts(array(
            'user_id' => get_current_user_id(),
            'width' => '100%',
            'height' => '600px',
            'theme' => 'default'
        ), $atts);
        
        $options = get_option('escape_room_simple_options', array());
        $game_url = isset($options['game_url']) ? $options['game_url'] : 'https://v0-escape-room-game-development.vercel.app/game';
        
        // Add user_id parameter
        $game_url .= '?user_id=' . $atts['user_id'];
        
        // Check daily limit
        if (isset($options['daily_limit']) && $options['daily_limit'] && $atts['user_id']) {
            if ($this->check_daily_limit($atts['user_id'])) {
                return '<div class="escape-room-daily-limit" style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                    <h3 style="color: #dc2626; margin-bottom: 10px;">⏰ Limite Diário Atingido</h3>
                    <p style="color: #374151;">Você já completou o desafio hoje. Tente novamente amanhã!</p>
                </div>';
            }
        }
        
        ob_start();
        ?>
        <div class="escape-room-game-container" data-user-id="<?php echo esc_attr($atts['user_id']); ?>" style="position: relative;">
            <iframe src="<?php echo esc_url($game_url); ?>" 
                    width="<?php echo esc_attr($atts['width']); ?>" 
                    height="<?php echo esc_attr($atts['height']); ?>" 
                    frameborder="0" 
                    allowfullscreen
                    class="escape-room-iframe"
                    style="border-radius: 8px; width: 100%; border: none;">
            </iframe>
            
            <div class="escape-room-loading" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0, 0, 0, 0.9); color: white; padding: 30px; border-radius: 12px; text-align: center; z-index: 1000; min-width: 200px;">
                <div class="loading-spinner" style="border: 4px solid #f3f3f3; border-top: 4px solid #dc2626; border-radius: 50%; width: 40px; height: 40px; animation: escape-room-spin 1s linear infinite; margin: 0 auto 15px;"></div>
                <p style="margin: 0; font-weight: bold;"><?php _e('Processando conquista...', 'escape-room-simple'); ?></p>
            </div>
        </div>
        
        <style>
        .escape-room-game-container {
            border: 3px solid #dc2626;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(220, 38, 38, 0.15);
            margin: 20px 0;
            background: linear-gradient(135deg, #fef2f2, #ffffff);
            padding: 10px;
        }
        
        .escape-room-iframe {
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        @keyframes escape-room-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
            .escape-room-game-container {
                margin: 10px -15px;
                border-radius: 0;
                padding: 5px;
            }
            
            .escape-room-iframe {
                height: 500px !important;
                border-radius: 4px;
            }
        }
        
        @media (max-width: 480px) {
            .escape-room-loading {
                padding: 20px !important;
                min-width: 150px !important;
            }
        }
        </style>
        
        <script>
        jQuery(document).ready(function($) {
            var container = $('.escape-room-game-container[data-user-id="<?php echo esc_js($atts['user_id']); ?>"]');
            var loadingDiv = container.find('.escape-room-loading');
            
            window.addEventListener("message", function(event) {
                if (event.data.type === "ESCAPE_ROOM_COMPLETE") {
                    console.log("Jogo completado:", event.data.data);
                    
                    // Show loading
                    loadingDiv.show();
                    
                    // Process achievement via AJAX
                    $.ajax({
                        url: escapeRoomAjax.ajaxurl,
                        type: "POST",
                        data: {
                            action: "process_escape_room_achievement",
                            game_data: event.data.data,
                            nonce: escapeRoomAjax.nonce
                        },
                        success: function(response) {
                            loadingDiv.hide();
                            
                            if (response.success) {
                                var data = response.data;
                                var message = "🎉 " + escapeRoomAjax.strings.success + "\n\n";
                                message += "🏆 Conquista: " + data.achievement + "\n";
                                message += "⭐ Pontos GamiPress: " + data.points + "\n";
                                message += "🎯 Pontos do Jogo: " + data.game_points + "\n";
                                message += "📊 Taxa de Acerto: " + data.percentage + "%";
                                
                                if (data.gamipress_success) {
                                    message += "\n\n✅ Integração GamiPress: Sucesso";
                                } else {
                                    message += "\n\n⚠️ Integração GamiPress: Não disponível";
                                }
                                
                                alert(message);
                                
                                // Trigger custom event for other plugins/themes
                                $(document).trigger('escape_room_completed', [data]);
                                
                                // Optional: reload page after 3 seconds
                                setTimeout(function() {
                                    if (confirm("Deseja recarregar a página para ver suas estatísticas atualizadas?")) {
                                        window.location.reload();
                                    }
                                }, 3000);
                                
                            } else {
                                alert("❌ Erro: " + response.data);
                            }
                        },
                        error: function(xhr, status, error) {
                            loadingDiv.hide();
                            console.error("Erro AJAX:", error);
                            alert("❌ " + escapeRoomAjax.strings.error + "\n\nDetalhes técnicos: " + error);
                        }
                    });
                }
            });
        });
        </script>
        <?php
        return ob_get_clean();
    }
    
    public function stats_shortcode($atts) {
        $atts = shortcode_atts(array(
            'user_id' => get_current_user_id(),
            'style' => 'default'
        ), $atts);
        
        $user_id = intval($atts['user_id']);
        
        if (!$user_id) {
            return '<p style="color: #dc2626; text-align: center; padding: 20px;">' . __('Usuário não encontrado.', 'escape-room-simple') . '</p>';
        }
        
        $stats = $this->get_user_stats($user_id);
        
        ob_start();
        ?>
        <div class="escape-room-stats" style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #dc2626; margin-bottom: 15px; font-size: 1.2em; text-align: center;">
                📊 <?php _e('Suas Estatísticas - Escape Room', 'escape-room-simple'); ?>
            </h3>
            
            <?php if ($stats['total_completions'] > 0): ?>
                <div class="escape-room-stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 15px;">
                    <div class="escape-room-stat-item" style="text-align: center; padding: 15px; background: white; border-radius: 6px; border: 1px solid #e9ecef;">
                        <div class="escape-room-stat-number" style="font-size: 2em; font-weight: bold; color: #dc2626; margin-bottom: 5px;">
                            <?php echo intval($stats['total_completions']); ?>
                        </div>
                        <div class="escape-room-stat-label" style="color: #6c757d; font-size: 0.9em;">
                            <?php _e('Completações', 'escape-room-simple'); ?>
                        </div>
                    </div>
                    
                    <div class="escape-room-stat-item" style="text-align: center; padding: 15px; background: white; border-radius: 6px; border: 1px solid #e9ecef;">
                        <div class="escape-room-stat-number" style="font-size: 2em; font-weight: bold; color: #dc2626; margin-bottom: 5px;">
                            <?php echo intval($stats['best_percentage']); ?>%
                        </div>
                        <div class="escape-room-stat-label" style="color: #6c757d; font-size: 0.9em;">
                            <?php _e('Melhor Taxa', 'escape-room-simple'); ?>
                        </div>
                    </div>
                    
                    <div class="escape-room-stat-item" style="text-align: center; padding: 15px; background: white; border-radius: 6px; border: 1px solid #e9ecef;">
                        <div class="escape-room-stat-number" style="font-size: 2em; font-weight: bold; color: #dc2626; margin-bottom: 5px;">
                            <?php echo intval($stats['best_score']); ?>
                        </div>
                        <div class="escape-room-stat-label" style="color: #6c757d; font-size: 0.9em;">
                            <?php _e('Melhor Pontuação', 'escape-room-simple'); ?>
                        </div>
                    </div>
                    
                    <div class="escape-room-stat-item" style="text-align: center; padding: 15px; background: white; border-radius: 6px; border: 1px solid #e9ecef;">
                        <div class="escape-room-stat-number" style="font-size: 2em; font-weight: bold; color: #dc2626; margin-bottom: 5px;">
                            <?php echo number_format(floatval($stats['avg_percentage']), 1); ?>%
                        </div>
                        <div class="escape-room-stat-label" style="color: #6c757d; font-size: 0.9em;">
                            <?php _e('Média de Acerto', 'escape-room-simple'); ?>
                        </div>
                    </div>
                </div>
                
                <?php if ($stats['last_completion']): ?>
                    <div class="escape-room-achievement-badge" style="background: #e7f3ff; border-left: 4px solid #007bff; padding: 10px 15px; margin-top: 15px; border-radius: 4px;">
                        <strong style="color: #0056b3;">🕒 <?php _e('Última tentativa:', 'escape-room-simple'); ?></strong>
                        <?php echo date_i18n(get_option('date_format') . ' ' . get_option('time_format'), strtotime($stats['last_completion'])); ?>
                    </div>
                <?php endif; ?>
                
            <?php else: ?>
                <div class="escape-room-no-stats" style="text-align: center; color: #6c757d; font-style: italic; padding: 30px;">
                    <p style="margin-bottom: 10px;"><?php _e('Você ainda não completou o Escape Room.', 'escape-room-simple'); ?></p>
                    <p><a href="#" style="color: #dc2626; text-decoration: none;"><?php _e('Que tal tentar agora?', 'escape-room-simple'); ?></a></p>
                </div>
            <?php endif; ?>
        </div>
        
        <style>
        @media (max-width: 768px) {
            .escape-room-stats-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 10px !important;
            }
            
            .escape-room-stat-item {
                padding: 10px !important;
            }
            
            .escape-room-stat-number {
                font-size: 1.5em !important;
            }
        }
        
        @media (max-width: 480px) {
            .escape-room-stats-grid {
                grid-template-columns: 1fr !important;
            }
        }
        </style>
        <?php
        return ob_get_clean();
    }
    
    private function get_user_stats($user_id) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'escape_room_completions';
        
        $stats = $wpdb->get_row($wpdb->prepare("
            SELECT 
                COUNT(*) as total_completions,
                COALESCE(MAX(percentage), 0) as best_percentage,
                COALESCE(MAX(score), 0) as best_score,
                MAX(completion_date) as last_completion,
                COALESCE(AVG(percentage), 0) as avg_percentage
            FROM $table_name 
            WHERE user_id = %d
        ", $user_id), ARRAY_A);
        
        if (!$stats || !$stats['total_completions']) {
            return array(
                'total_completions' => 0,
                'best_percentage' => 0,
                'best_score' => 0,
                'last_completion' => null,
                'avg_percentage' => 0
            );
        }
        
        return $stats;
    }
    
    private function check_daily_limit($user_id) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'escape_room_completions';
        $today = date('Y-m-d');
        
        $count = $wpdb->get_var($wpdb->prepare("
            SELECT COUNT(*) 
            FROM $table_name 
            WHERE user_id = %d 
            AND DATE(completion_date) = %s
        ", $user_id, $today));
        
        return $count > 0;
    }
    
    public function process_achievement() {
        // Verify nonce
        check_ajax_referer('escape_room_nonce', 'nonce');
        
        $game_data = $_POST['game_data'];
        $user_id = get_current_user_id();
        
        // Validate user
        if (!$user_id) {
            wp_send_json_error(__('Usuário não está logado', 'escape-room-simple'));
            return;
        }
        
        // Validate game data
        if (!isset($game_data['completed']) || !$game_data['completed']) {
            wp_send_json_error(__('Dados do jogo inválidos', 'escape-room-simple'));
            return;
        }
        
        // Get plugin options
        $options = get_option('escape_room_simple_options', array());
        
        // Check daily limit
        if (isset($options['daily_limit']) && $options['daily_limit']) {
            if ($this->check_daily_limit($user_id)) {
                wp_send_json_error(__('Você já completou o desafio hoje. Tente novamente amanhã.', 'escape-room-simple'));
                return;
            }
        }
        
        // Sanitize data
        $achievement_id = sanitize_text_field($game_data['achievement_id']);
        $points = intval($game_data['gamipress_points']);
        $game_points = intval($game_data['points']);
        $percentage = intval($game_data['percentage']);
        $correct_answers = intval($game_data['correct_answers']);
        $total_questions = intval($game_data['total_questions']);
        
        // Save completion to database
        $completion_id = $this->save_completion($user_id, $game_data);
        
        // Process GamiPress integration
        $gamipress_success = false;
        $achievement_name = '';
        
        if (isset($options['enable_gamipress']) && $options['enable_gamipress'] && function_exists('gamipress_award_achievement_to_user')) {
            $result = $this->process_gamipress_achievement($user_id, $achievement_id, $points);
            $gamipress_success = $result['success'];
            $achievement_name = $result['name'];
        }
        
        // Success response
        wp_send_json_success(array(
            'message' => __('Conquista processada com sucesso!', 'escape-room-simple'),
            'achievement' => $achievement_name ?: str_replace('_badge', '', $achievement_id),
            'points' => $points,
            'gamipress_success' => $gamipress_success,
            'game_points' => $game_points,
            'percentage' => $percentage,
            'completion_id' => $completion_id
        ));
    }
    
    private function save_completion($user_id, $game_data) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'escape_room_completions';
        
        $data = array(
            'user_id' => $user_id,
            'completion_date' => current_time('mysql'),
            'score' => intval($game_data['points']),
            'percentage' => intval($game_data['percentage']),
            'correct_answers' => intval($game_data['correct_answers']),
            'total_questions' => intval($game_data['total_questions']),
            'achievement_id' => sanitize_text_field($game_data['achievement_id']),
            'gamipress_points' => intval($game_data['gamipress_points']),
            'completion_time' => 0, // Could be calculated from game data
            'ip_address' => $this->get_client_ip(),
            'user_agent' => sanitize_text_field($_SERVER['HTTP_USER_AGENT'] ?? '')
        );
        
        $wpdb->insert($table_name, $data);
        
        return $wpdb->insert_id;
    }
    
    private function process_gamipress_achievement($user_id, $achievement_id, $points) {
        // Achievement mapping
        $achievement_mapping = array(
            'ciber_aprendiz_badge' => 'ciber_aprendiz',
            'ciber_vigilante_badge' => 'ciber_vigilante',
            'ciber_guardiao_badge' => 'ciber_guardiao',
            'ciber_embaixador_flamboyant_badge' => 'ciber_embaixador_flamboyant'
        );
        
        $gamipress_achievement_id = isset($achievement_mapping[$achievement_id]) ? $achievement_mapping[$achievement_id] : $achievement_id;
        
        // Find achievement post
        $achievement_post = get_page_by_path($gamipress_achievement_id, OBJECT, 'achievement');
        
        if (!$achievement_post) {
            return array('success' => false, 'name' => '');
        }
        
        $achievement_name = $achievement_post->post_title;
        
        // Check if user already has this achievement
        $user_achievements = gamipress_get_user_achievements(array(
            'user_id' => $user_id,
            'achievement_id' => $achievement_post->ID
        ));
        
        if (empty($user_achievements)) {
            // Award achievement
            $achievement_awarded = gamipress_award_achievement_to_user($achievement_post->ID, $user_id);
            
            if ($achievement_awarded) {
                // Award points
                gamipress_award_points_to_user($user_id, $points, 'escape_room_completion');
                return array('success' => true, 'name' => $achievement_name);
            }
        }
        
        return array('success' => true, 'name' => $achievement_name . ' (já conquistada)');
    }
    
    private function get_client_ip() {
        $ip_keys = array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR');
        
        foreach ($ip_keys as $key) {
            if (array_key_exists($key, $_SERVER) === true) {
                foreach (explode(',', $_SERVER[$key]) as $ip) {
                    $ip = trim($ip);
                    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                        return $ip;
                    }
                }
            }
        }
        
        return isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '0.0.0.0';
    }
    
    public function add_admin_menu() {
        add_options_page(
            __('Escape Room Settings', 'escape-room-simple'),
            __('Escape Room', 'escape-room-simple'),
            'manage_options',
            'escape-room-simple',
            array($this, 'admin_page')
        );
    }
    
    public function admin_page() {
        if (isset($_POST['submit'])) {
            $this->save_settings();
        }
        
        $options = get_option('escape_room_simple_options', array());
        ?>
        <div class="wrap">
            <h1><?php _e('Configurações do Escape Room', 'escape-room-simple'); ?></h1>
            
            <form method="post" action="">
                <?php wp_nonce_field('escape_room_simple_settings', 'escape_room_simple_nonce'); ?>
                
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php _e('Nome da Empresa', 'escape-room-simple'); ?></th>
                        <td>
                            <input type="text" name="company_name" value="<?php echo esc_attr($options['company_name'] ?? 'Flamboyant Shopping'); ?>" class="regular-text" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('Título do Jogo', 'escape-room-simple'); ?></th>
                        <td>
                            <input type="text" name="game_title" value="<?php echo esc_attr($options['game_title'] ?? 'Desafio de Segurança - Vazamento de Dados'); ?>" class="regular-text" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('URL do Jogo', 'escape-room-simple'); ?></th>
                        <td>
                            <input type="url" name="game_url" value="<?php echo esc_attr($options['game_url'] ?? 'https://v0-escape-room-game-development.vercel.app/game'); ?>" class="regular-text" />
                            <p class="description"><?php _e('URL onde o jogo está hospedado', 'escape-room-simple'); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('Integração GamiPress', 'escape-room-simple'); ?></th>
                        <td>
                            <label>
                                <input type="checkbox" name="enable_gamipress" value="1" <?php checked($options['enable_gamipress'] ?? true); ?> />
                                <?php _e('Ativar integração com GamiPress', 'escape-room-simple'); ?>
                            </label>
                            <?php if (!function_exists('gamipress_award_achievement_to_user')): ?>
                                <p class="description" style="color: #d63638;"><?php _e('⚠️ Plugin GamiPress não está instalado/ativo', 'escape-room-simple'); ?></p>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('Limite Diário', 'escape-room-simple'); ?></th>
                        <td>
                            <label>
                                <input type="checkbox" name="daily_limit" value="1" <?php checked($options['daily_limit'] ?? false); ?> />
                                <?php _e('Permitir apenas uma tentativa por dia por usuário', 'escape-room-simple'); ?>
                            </label>
                        </td>
                    </tr>
                </table>
                
                <?php submit_button(); ?>
            </form>
            
            <h2><?php _e('Shortcodes Disponíveis', 'escape-room-simple'); ?></h2>
            <p><strong><?php _e('Jogo:', 'escape-room-simple'); ?></strong> <code>[escape_room_game]</code></p>
            <p><strong><?php _e('Estatísticas:', 'escape-room-simple'); ?></strong> <code>[escape_room_stats]</code></p>
            
            <h2><?php _e('Estatísticas Gerais', 'escape-room-simple'); ?></h2>
            <?php
            global $wpdb;
            $table_name = $wpdb->prefix . 'escape_room_completions';
            $total_completions = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
            $unique_users = $wpdb->get_var("SELECT COUNT(DISTINCT user_id) FROM $table_name");
            $avg_percentage = $wpdb->get_var("SELECT AVG(percentage) FROM $table_name");
            ?>
            <p><strong><?php _e('Total de Completações:', 'escape-room-simple'); ?></strong> <?php echo intval($total_completions); ?></p>
            <p><strong><?php _e('Usuários Únicos:', 'escape-room-simple'); ?></strong> <?php echo intval($unique_users); ?></p>
            <p><strong><?php _e('Taxa Média de Acerto:', 'escape-room-simple'); ?></strong> <?php echo number_format(floatval($avg_percentage), 1); ?>%</p>
        </div>
        <?php
    }
    
    private function save_settings() {
        if (!wp_verify_nonce($_POST['escape_room_simple_nonce'], 'escape_room_simple_settings')) {
            wp_die(__('Erro de segurança', 'escape-room-simple'));
        }
        
        $options = array(
            'company_name' => sanitize_text_field($_POST['company_name']),
            'game_title' => sanitize_text_field($_POST['game_title']),
            'game_url' => esc_url_raw($_POST['game_url']),
            'enable_gamipress' => isset($_POST['enable_gamipress']),
            'daily_limit' => isset($_POST['daily_limit']),
        );
        
        update_option('escape_room_simple_options', $options);
        
        add_action('admin_notices', function() {
            echo '<div class="notice notice-success is-dismissible"><p>' . __('Configurações salvas com sucesso!', 'escape-room-simple') . '</p></div>';
        });
    }
}

// Initialize plugin
EscapeRoomSimple::get_instance();
