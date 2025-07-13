<?php
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="escape-room-game-container" data-user-id="<?php echo esc_attr($atts['user_id']); ?>">
    <iframe src="<?php echo esc_url($game_url); ?>" 
            width="<?php echo esc_attr($atts['width']); ?>" 
            height="<?php echo esc_attr($atts['height']); ?>" 
            frameborder="0" 
            allowfullscreen
            class="escape-room-iframe">
    </iframe>
    
    <div class="escape-room-loading" style="display: none;">
        <div class="loading-spinner"></div>
        <p><?php _e('Processando conquista...', 'escape-room-security'); ?></p>
    </div>
</div>

<script>
jQuery(document).ready(function($) {
    var container = $('.escape-room-game-container');
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
                        message += "🏆 " + data.achievement + "\n";
                        message += "⭐ " + data.points + " pontos GamiPress\n";
                        message += "🎯 " + data.game_points + " pontos do jogo\n";
                        message += "📊 " + data.percentage + "% de acerto";
                        
                        alert(message);
                        
                        // Trigger custom event for other plugins/themes
                        $(document).trigger('escape_room_completed', [data]);
                        
                    } else {
                        alert("❌ Erro: " + response.data);
                    }
                },
                error: function(xhr, status, error) {
                    loadingDiv.hide();
                    console.error("Erro AJAX:", error);
                    alert("❌ " + escapeRoomAjax.strings.error);
                }
            });
        }
    });
});
</script>

<style>
.escape-room-game-container {
    position: relative;
    border: 3px solid #dc2626;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(220, 38, 38, 0.15);
    margin: 20px 0;
    background: linear-gradient(135deg, #fef2f2, #ffffff);
    padding: 10px;
}

.escape-room-iframe {
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    display: block;
}

.escape-room-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    z-index: 1000;
    min-width: 200px;
}

.loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #dc2626;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 15px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
    .escape-room-game-container {
        margin: 10px -15px;
        border-radius: 0;
    }
    
    .escape-room-iframe {
        height: 500px !important;
    }
}
</style>
