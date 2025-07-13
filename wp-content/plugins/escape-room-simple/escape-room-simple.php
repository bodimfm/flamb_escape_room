<?php
/**
 * Plugin Name: Escape Room Simple
 * Description: Jogo de segurança da informação - Versão Simples
 * Version: 1.0.0
 * Author: Flamboyant Shopping
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class EscapeRoomSimple {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_shortcode('escape_room_game', array($this, 'game_shortcode'));
        add_action('wp_ajax_process_escape_room_achievement', array($this, 'process_achievement'));
        add_action('wp_ajax_nopriv_process_escape_room_achievement', array($this, 'process_achievement'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
    }
    
    public function init() {
        // Create table if needed
        $this->create_table();
    }
    
    public function enqueue_scripts() {
        wp_enqueue_script('jquery');
        wp_localize_script('jquery', 'escapeRoomAjax', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('escape_room_nonce')
        ));
    }
    
    public function game_shortcode($atts) {
        $atts = shortcode_atts(array(
            'user_id' => get_current_user_id(),
            'width' => '100%',
            'height' => '600px'
        ), $atts);
        
        // URL do jogo hospedado externamente
        $game_url = 'https://v0-escape-room-game-development.vercel.app/game?user_id=' . $atts['user_id'];
        
        ob_start();
        ?>
        <div class="escape-room-container" style="border: 3px solid #dc2626; border-radius: 12px; overflow: hidden; margin: 20px 0; background: linear-gradient(135deg, #fef2f2, #ffffff); padding: 10px;">
            <iframe src="<?php echo esc_url($game_url); ?>" 
                    width="<?php echo esc_attr($atts['width']); ?>" 
                    height="<?php echo esc_attr($atts['height']); ?>" 
                    frameborder="0" 
                    allowfullscreen
                    style="border-radius: 8px; width: 100%;">
            </iframe>
            
            <div id="escape-room-loading" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.9); color: white; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="border: 4px solid #f3f3f3; border-top: 4px solid #dc2626; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 10px;"></div>
                <p>Processando conquista...</p>
            </div>
        </div>
        
        <style>
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
            .escape-room-container iframe {
                height: 500px !important;
            }
        }
        </style>
        
        <script>
        jQuery(document).ready(function($) {
            window.addEventListener("message", function(event) {
                if (event.data.type === "ESCAPE_ROOM_COMPLETE") {
                    console.log("Jogo completado:", event.data.data);
                    
                    $('#escape-room-loading').show();
                    
                    $.ajax({
                        url: escapeRoomAjax.ajaxurl,
                        type: "POST",
                        data: {
                            action: "process_escape_room_achievement",
                            game_data: event.data.data,
                            nonce: escapeRoomAjax.nonce
                        },
                        success: function(response) {
                            $('#escape-room-loading').hide();
                            
                            if (response.success) {
                                var data = response.data;
                                alert("🎉 Conquista processada com sucesso!\n\n🏆 " + data.achievement + "\n⭐ " + data.points + " pontos\n📊 " + data.percentage + "% de acerto");
                            } else {
                                alert("❌ Erro: " + response.data);
                            }
                        },
                        error: function() {
                            $('#escape-room-loading').hide();
                            alert("❌ Erro ao processar conquista.");
                        }
                    });
                }
            });
        });
        </script>
        <?php
        return ob_get_clean();
    }
    
    public function process_achievement() {
        check_ajax_referer('escape_room_nonce', 'nonce');
        
        $game_data = $_POST['game_data'];
        $user_id = get_current_user_id();
        
        if (!$user_id) {
            wp_send_json_error('Usuário não está logado');
            return;
        }
        
        if (!isset($game_data['completed']) || !$game_data['completed']) {
            wp_send_json_error('Dados do jogo inválidos');
            return;
        }
        
        // Sanitize data
        $achievement_id = sanitize_text_field($game_data['achievement_id']);
        $points = intval($game_data['gamipress_points']);
        $game_points = intval($game_data['points']);
        $percentage = intval($game_data['percentage']);
        $correct_answers = intval($game_data['correct_answers']);
        $total_questions = intval($game_data['total_questions']);
        
        // Save to database
        global $wpdb;
        $table_name = $wpdb->prefix . 'escape_room_completions';
        
        $wpdb->insert($table_name, array(
            'user_id' => $user_id,
            'completion_date' => current_time('mysql'),
            'score' => $game_points,
            'percentage' => $percentage,
            'correct_answers' => $correct_answers,
            'total_questions' => $total_questions,
            'achievement_id' => $achievement_id,
            'gamipress_points' => $points
        ));
        
        // Try GamiPress integration if available
        $gamipress_success = false;
        if (function_exists('gamipress_award_achievement_to_user')) {
            // Map achievement IDs
            $achievement_mapping = array(
                'ciber_aprendiz_badge' => 'ciber_aprendiz',
                'ciber_vigilante_badge' => 'ciber_vigilante', 
                'ciber_guardiao_badge' => 'ciber_guardiao',
                'ciber_embaixador_flamboyant_badge' => 'ciber_embaixador_flamboyant'
            );
            
            $gamipress_achievement_id = isset($achievement_mapping[$achievement_id]) ? $achievement_mapping[$achievement_id] : $achievement_id;
            $achievement_post = get_page_by_path($gamipress_achievement_id, OBJECT, 'achievement');
            
            if ($achievement_post) {
                $user_achievements = gamipress_get_user_achievements(array(
                    'user_id' => $user_id,
                    'achievement_id' => $achievement_post->ID
                ));
                
                if (empty($user_achievements)) {
                    $achievement_awarded = gamipress_award_achievement_to_user($achievement_post->ID, $user_id);
                    if ($achievement_awarded) {
                        gamipress_award_points_to_user($user_id, $points, 'escape_room_completion');
                        $gamipress_success = true;
                    }
                }
            }
        }
        
        wp_send_json_success(array(
            'message' => 'Conquista processada com sucesso!',
            'achievement' => str_replace('_badge', '', $achievement_id),
            'points' => $points,
            'gamipress_success' => $gamipress_success,
            'game_points' => $game_points,
            'percentage' => $percentage
        ));
    }
    
    private function create_table() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'escape_room_completions';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            completion_date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            score int(11) NOT NULL,
            percentage int(11) NOT NULL,
            correct_answers int(11) NOT NULL,
            total_questions int(11) NOT NULL,
            achievement_id varchar(100) NOT NULL,
            gamipress_points int(11) NOT NULL,
            PRIMARY KEY (id),
            KEY user_id (user_id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}

// Initialize plugin
new EscapeRoomSimple();
