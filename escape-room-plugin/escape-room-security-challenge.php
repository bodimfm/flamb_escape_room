<?php
/**
 * Plugin Name: Escape Room - Security Challenge
 * Plugin URI: https://v0-escape-room-game-development.vercel.app/
 * Description: Jogo educativo sobre segurança da informação com integração GamiPress
 * Version: 1.0.0
 * Author: Flamboyant Shopping
 * Author URI: https://flamboyant.com.br
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: escape-room-security
 * Domain Path: /languages
 * Requires at least: 5.0
 * Tested up to: 6.4
 * Requires PHP: 7.4
 * Network: false
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('ESCAPE_ROOM_VERSION', '1.0.0');
define('ESCAPE_ROOM_PLUGIN_URL', plugin_dir_url(__FILE__));
define('ESCAPE_ROOM_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('ESCAPE_ROOM_PLUGIN_BASENAME', plugin_basename(__FILE__));

/**
 * Main Plugin Class
 */
class EscapeRoomSecurityChallenge {
    
    /**
     * Instance of this class
     */
    private static $instance = null;
    
    /**
     * Get instance
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('admin_enqueue_scripts', array($this, 'admin_enqueue_scripts'));
        
        // Plugin activation/deactivation hooks
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
        
        // Admin menu
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Shortcodes
        add_shortcode('escape_room_game', array($this, 'game_shortcode'));
        add_shortcode('escape_room_stats', array($this, 'stats_shortcode'));
        
        // AJAX handlers
        add_action('wp_ajax_process_escape_room_achievement', array($this, 'process_achievement'));
        add_action('wp_ajax_nopriv_process_escape_room_achievement', array($this, 'process_achievement'));
        
        // Custom post types for achievements (if GamiPress not available)
        add_action('init', array($this, 'register_post_types'));
        
        // Load text domain
        add_action('plugins_loaded', array($this, 'load_textdomain'));
    }
    
    /**
     * Initialize plugin
     */
    public function init() {
        // Create database tables if needed
        $this->create_tables();
    }
    
    /**
     * Load plugin text domain
     */
    public function load_textdomain() {
        load_plugin_textdomain('escape-room-security', false, dirname(ESCAPE_ROOM_PLUGIN_BASENAME) . '/languages');
    }
    
    /**
     * Enqueue frontend scripts and styles
     */
    public function enqueue_scripts() {
        wp_enqueue_script('jquery');
        
        // Enqueue game styles
        wp_enqueue_style(
            'escape-room-frontend',
            ESCAPE_ROOM_PLUGIN_URL . 'assets/css/frontend.css',
            array(),
            ESCAPE_ROOM_VERSION
        );
        
        // Localize script for AJAX
        wp_localize_script('jquery', 'escapeRoomAjax', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('escape_room_nonce'),
            'strings' => array(
                'processing' => __('Processando conquista...', 'escape-room-security'),
                'success' => __('Conquista processada com sucesso!', 'escape-room-security'),
                'error' => __('Erro ao processar conquista.', 'escape-room-security'),
            )
        ));
    }
    
    /**
     * Enqueue admin scripts and styles
     */
    public function admin_enqueue_scripts($hook) {
        if (strpos($hook, 'escape-room') === false) {
            return;
        }
        
        wp_enqueue_style(
            'escape-room-admin',
            ESCAPE_ROOM_PLUGIN_URL . 'assets/css/admin.css',
            array(),
            ESCAPE_ROOM_VERSION
        );
        
        wp_enqueue_script(
            'escape-room-admin',
            ESCAPE_ROOM_PLUGIN_URL . 'assets/js/admin.js',
            array('jquery'),
            ESCAPE_ROOM_VERSION,
            true
        );
    }
    
    /**
     * Plugin activation
     */
    public function activate() {
        // Create database tables
        $this->create_tables();
        
        // Set default options
        $default_options = array(
            'company_name' => 'Flamboyant Shopping',
            'game_title' => 'Desafio de Segurança - Vazamento de Dados',
            'enable_gamipress' => true,
            'daily_limit' => true,
            'webhook_url' => '',
            'redirect_url' => home_url('/obrigado/'),
        );
        
        add_option('escape_room_options', $default_options);
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Plugin deactivation
     */
    public function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Create database tables
     */
    private function create_tables() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'escape_room_completions';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            completion_date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            score int(11) NOT NULL,
            percentage int(11) NOT NULL,
            correct_answers int(11) NOT NULL,
            total_questions int(11) NOT NULL,
            achievement_id varchar(100) NOT NULL,
            gamipress_points int(11) NOT NULL,
            completion_time int(11) NOT NULL,
            ip_address varchar(45),
            user_agent text,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY completion_date (completion_date)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    /**
     * Register custom post types
     */
    public function register_post_types() {
        // Only register if GamiPress is not active
        if (!function_exists('gamipress_award_achievement_to_user')) {
            register_post_type('escape_achievement', array(
                'labels' => array(
                    'name' => __('Conquistas Escape Room', 'escape-room-security'),
                    'singular_name' => __('Conquista', 'escape-room-security'),
                ),
                'public' => false,
                'show_ui' => true,
                'show_in_menu' => 'escape-room-main',
                'supports' => array('title', 'editor', 'thumbnail'),
                'capability_type' => 'post',
                'capabilities' => array(
                    'create_posts' => 'manage_options',
                ),
                'map_meta_cap' => true,
            ));
        }
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_menu_page(
            __('Escape Room', 'escape-room-security'),
            __('Escape Room', 'escape-room-security'),
            'manage_options',
            'escape-room-main',
            array($this, 'admin_page_main'),
            'dashicons-games',
            30
        );
        
        add_submenu_page(
            'escape-room-main',
            __('Configurações', 'escape-room-security'),
            __('Configurações', 'escape-room-security'),
            'manage_options',
            'escape-room-settings',
            array($this, 'admin_page_settings')
        );
        
        add_submenu_page(
            'escape-room-main',
            __('Relatórios', 'escape-room-security'),
            __('Relatórios', 'escape-room-security'),
            'manage_options',
            'escape-room-reports',
            array($this, 'admin_page_reports')
        );
        
        add_submenu_page(
            'escape-room-main',
            __('Shortcodes', 'escape-room-security'),
            __('Shortcodes', 'escape-room-security'),
            'manage_options',
            'escape-room-shortcodes',
            array($this, 'admin_page_shortcodes')
        );
    }
    
    /**
     * Main admin page
     */
    public function admin_page_main() {
        include ESCAPE_ROOM_PLUGIN_PATH . 'admin/pages/main.php';
    }
    
    /**
     * Settings admin page
     */
    public function admin_page_settings() {
        if (isset($_POST['submit'])) {
            $this->save_settings();
        }
        include ESCAPE_ROOM_PLUGIN_PATH . 'admin/pages/settings.php';
    }
    
    /**
     * Reports admin page
     */
    public function admin_page_reports() {
        include ESCAPE_ROOM_PLUGIN_PATH . 'admin/pages/reports.php';
    }
    
    /**
     * Shortcodes admin page
     */
    public function admin_page_shortcodes() {
        include ESCAPE_ROOM_PLUGIN_PATH . 'admin/pages/shortcodes.php';
    }
    
    /**
     * Save settings
     */
    private function save_settings() {
        if (!wp_verify_nonce($_POST['escape_room_nonce'], 'escape_room_settings')) {
            wp_die(__('Erro de segurança', 'escape-room-security'));
        }
        
        $options = array(
            'company_name' => sanitize_text_field($_POST['company_name']),
            'game_title' => sanitize_text_field($_POST['game_title']),
            'enable_gamipress' => isset($_POST['enable_gamipress']),
            'daily_limit' => isset($_POST['daily_limit']),
            'webhook_url' => esc_url_raw($_POST['webhook_url']),
            'redirect_url' => esc_url_raw($_POST['redirect_url']),
        );
        
        update_option('escape_room_options', $options);
        
        add_action('admin_notices', function() {
            echo '<div class="notice notice-success is-dismissible"><p>' . __('Configurações salvas com sucesso!', 'escape-room-security') . '</p></div>';
        });
    }
    
    /**
     * Game shortcode
     */
    public function game_shortcode($atts) {
        $atts = shortcode_atts(array(
            'user_id' => get_current_user_id(),
            'width' => '100%',
            'height' => '600px',
            'theme' => 'default'
        ), $atts);
        
        // Get game URL
        $game_url = ESCAPE_ROOM_PLUGIN_URL . 'game/escape-room-vanilla.html?user_id=' . $atts['user_id'];
        
        ob_start();
        include ESCAPE_ROOM_PLUGIN_PATH . 'templates/game-shortcode.php';
        return ob_get_clean();
    }
    
    /**
     * Stats shortcode
     */
    public function stats_shortcode($atts) {
        $atts = shortcode_atts(array(
            'user_id' => get_current_user_id(),
            'style' => 'default'
        ), $atts);
        
        $user_id = intval($atts['user_id']);
        
        if (!$user_id) {
            return '<p>' . __('Usuário não encontrado.', 'escape-room-security') . '</p>';
        }
        
        $stats = $this->get_user_stats($user_id);
        
        ob_start();
        include ESCAPE_ROOM_PLUGIN_PATH . 'templates/stats-shortcode.php';
        return ob_get_clean();
    }
    
    /**
     * Get user statistics
     */
    private function get_user_stats($user_id) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'escape_room_completions';
        
        $stats = $wpdb->get_row($wpdb->prepare("
            SELECT 
                COUNT(*) as total_completions,
                MAX(percentage) as best_percentage,
                MAX(score) as best_score,
                MAX(completion_date) as last_completion,
                AVG(percentage) as avg_percentage
            FROM $table_name 
            WHERE user_id = %d
        ", $user_id), ARRAY_A);
        
        if (!$stats['total_completions']) {
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
    
    /**
     * Process achievement AJAX handler
     */
    public function process_achievement() {
        // Verify nonce
        check_ajax_referer('escape_room_nonce', 'nonce');
        
        $game_data = $_POST['game_data'];
        $user_id = get_current_user_id();
        
        // Validate user
        if (!$user_id) {
            wp_send_json_error(__('Usuário não está logado', 'escape-room-security'));
            return;
        }
        
        // Validate game data
        if (!isset($game_data['completed']) || !$game_data['completed']) {
            wp_send_json_error(__('Dados do jogo inválidos', 'escape-room-security'));
            return;
        }
        
        // Get plugin options
        $options = get_option('escape_room_options', array());
        
        // Check daily limit
        if (isset($options['daily_limit']) && $options['daily_limit']) {
            if ($this->check_daily_limit($user_id)) {
                wp_send_json_error(__('Você já completou o desafio hoje. Tente novamente amanhã.', 'escape-room-security'));
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
        
        // Send webhook if configured
        if (!empty($options['webhook_url'])) {
            $this->send_webhook($options['webhook_url'], $game_data, $user_id);
        }
        
        // Success response
        wp_send_json_success(array(
            'message' => __('Conquista processada com sucesso!', 'escape-room-security'),
            'achievement' => $achievement_name ?: $achievement_id,
            'points' => $points,
            'gamipress_success' => $gamipress_success,
            'game_points' => $game_points,
            'percentage' => $percentage,
            'completion_id' => $completion_id
        ));
    }
    
    /**
     * Check daily limit
     */
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
    
    /**
     * Save completion to database
     */
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
            'user_agent' => sanitize_text_field($_SERVER['HTTP_USER_AGENT'])
        );
        
        $wpdb->insert($table_name, $data);
        
        return $wpdb->insert_id;
    }
    
    /**
     * Process GamiPress achievement
     */
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
    
    /**
     * Send webhook
     */
    private function send_webhook($webhook_url, $game_data, $user_id) {
        $user = get_userdata($user_id);
        
        $payload = array(
            'event' => 'escape_room_completed',
            'user_id' => $user_id,
            'user_email' => $user->user_email,
            'user_login' => $user->user_login,
            'game_data' => $game_data,
            'timestamp' => current_time('mysql'),
            'site_url' => home_url()
        );
        
        wp_remote_post($webhook_url, array(
            'body' => json_encode($payload),
            'headers' => array(
                'Content-Type' => 'application/json'
            ),
            'timeout' => 30
        ));
    }
    
    /**
     * Get client IP address
     */
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
}

// Initialize plugin
EscapeRoomSecurityChallenge::get_instance();
