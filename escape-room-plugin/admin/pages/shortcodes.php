<?php
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap">
    <h1><?php _e('Shortcodes - Escape Room', 'escape-room-security'); ?></h1>
    
    <div class="escape-room-shortcodes-guide">
        <div class="shortcode-section">
            <h2><?php _e('🎮 Shortcode Principal do Jogo', 'escape-room-security'); ?></h2>
            <p><?php _e('Use este shortcode para inserir o jogo em qualquer página ou post:', 'escape-room-security'); ?></p>
            
            <div class="shortcode-example">
                <h3><?php _e('Básico:', 'escape-room-security'); ?></h3>
                <code class="shortcode-code">[escape_room_game]</code>
                <button class="button copy-shortcode" data-shortcode="[escape_room_game]"><?php _e('Copiar', 'escape-room-security'); ?></button>
            </div>
            
            <div class="shortcode-example">
                <h3><?php _e('Com parâmetros:', 'escape-room-security'); ?></h3>
                <code class="shortcode-code">[escape_room_game user_id="current_user" width="100%" height="700px"]</code>
                <button class="button copy-shortcode" data-shortcode='[escape_room_game user_id="current_user" width="100%" height="700px"]'><?php _e('Copiar', 'escape-room-security'); ?></button>
            </div>
            
            <div class="shortcode-example">
                <h3><?php _e('Para usuário específico:', 'escape-room-security'); ?></h3>
                <code class="shortcode-code">[escape_room_game user_id="123" height="600px"]</code>
                <button class="button copy-shortcode" data-shortcode='[escape_room_game user_id="123" height="600px"]'><?php _e('Copiar', 'escape-room-security'); ?></button>
            </div>
            
            <h3><?php _e('Parâmetros disponíveis:', 'escape-room-security'); ?></h3>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th><?php _e('Parâmetro', 'escape-room-security'); ?></th>
                        <th><?php _e('Descrição', 'escape-room-security'); ?></th>
                        <th><?php _e('Padrão', 'escape-room-security'); ?></th>
                        <th><?php _e('Exemplo', 'escape-room-security'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>user_id</code></td>
                        <td><?php _e('ID do usuário que está jogando', 'escape-room-security'); ?></td>
                        <td><?php _e('Usuário atual logado', 'escape-room-security'); ?></td>
                        <td><code>user_id="123"</code></td>
                    </tr>
                    <tr>
                        <td><code>width</code></td>
                        <td><?php _e('Largura do iframe do jogo', 'escape-room-security'); ?></td>
                        <td><code>100%</code></td>
                        <td><code>width="800px"</code></td>
                    </tr>
                    <tr>
                        <td><code>height</code></td>
                        <td><?php _e('Altura do iframe do jogo', 'escape-room-security'); ?></td>
                        <td><code>600px</code></td>
                        <td><code>height="700px"</code></td>
                    </tr>
                    <tr>
                        <td><code>theme</code></td>
                        <td><?php _e('Tema visual do jogo', 'escape-room-security'); ?></td>
                        <td><code>default</code></td>
                        <td><code>theme="dark"</code></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="shortcode-section">
            <h2><?php _e('📊 Shortcode de Estatísticas', 'escape-room-security'); ?></h2>
            <p><?php _e('Use este shortcode para exibir as estatísticas de um usuário:', 'escape-room-security'); ?></p>
            
            <div class="shortcode-example">
                <h3><?php _e('Estatísticas do usuário atual:', 'escape-room-security'); ?></h3>
                <code class="shortcode-code">[escape_room_stats]</code>
                <button class="button copy-shortcode" data-shortcode="[escape_room_stats]"><?php _e('Copiar', 'escape-room-security'); ?></button>
            </div>
            
            <div class="shortcode-example">
                <h3><?php _e('Estatísticas de usuário específico:', 'escape-room-security'); ?></h3>
                <code class="shortcode-code">[escape_room_stats user_id="123"]</code>
                <button class="button copy-shortcode" data-shortcode='[escape_room_stats user_id="123"]'><?php _e('Copiar', 'escape-room-security'); ?></button>
            </div>
            
            <h3><?php _e('Parâmetros disponíveis:', 'escape-room-security'); ?></h3>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th><?php _e('Parâmetro', 'escape-room-security'); ?></th>
                        <th><?php _e('Descrição', 'escape-room-security'); ?></th>
                        <th><?php _e('Padrão', 'escape-room-security'); ?></th>
                        <th><?php _e('Exemplo', 'escape-room-security'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>user_id</code></td>
                        <td><?php _e('ID do usuário para exibir estatísticas', 'escape-room-security'); ?></td>
                        <td><?php _e('Usuário atual logado', 'escape-room-security'); ?></td>
                        <td><code>user_id="123"</code></td>
                    </tr>
                    <tr>
                        <td><code>style</code></td>
                        <td><?php _e('Estilo de exibição das estatísticas', 'escape-room-security'); ?></td>
                        <td><code>default</code></td>
                        <td><code>style="compact"</code></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="shortcode-section">
            <h2><?php _e('💡 Dicas de Uso', 'escape-room-security'); ?></h2>
            
            <div class="tips-grid">
                <div class="tip-card">
                    <h3>🎯 <?php _e('Página Dedicada', 'escape-room-security'); ?></h3>
                    <p><?php _e('Crie uma página específica para o jogo com o shortcode básico para melhor experiência.', 'escape-room-security'); ?></p>
                </div>
                
                <div class="tip-card">
                    <h3>📱 <?php _e('Responsividade', 'escape-room-security'); ?></h3>
                    <p><?php _e('Use width="100%" para garantir que o jogo se adapte a diferentes tamanhos de tela.', 'escape-room-security'); ?></p>
                </div>
                
                <div class="tip-card">
                    <h3>👥 <?php _e('Usuários Logados', 'escape-room-security'); ?></h3>
                    <p><?php _e('O jogo funciona melhor com usuários logados para salvar progresso e conquistas.', 'escape-room-security'); ?></p>
                </div>
                
                <div class="tip-card">
                    <h3>🏆 <?php _e('Página de Perfil', 'escape-room-security'); ?></h3>
                    <p><?php _e('Use o shortcode de estatísticas na página de perfil dos usuários.', 'escape-room-security'); ?></p>
                </div>
            </div>
        </div>
        
        <div class="shortcode-section">
            <h2><?php _e('🔧 Exemplos Práticos', 'escape-room-security'); ?></h2>
            
            <div class="example-card">
                <h3><?php _e('Página de Treinamento', 'escape-room-security'); ?></h3>
                <p><?php _e('Para uma página dedicada ao treinamento de segurança:', 'escape-room-security'); ?></p>
                <code class="example-code">
&lt;h2&gt;Treinamento de Segurança da Informação&lt;/h2&gt;
&lt;p&gt;Complete o desafio abaixo para testar seus conhecimentos:&lt;/p&gt;
[escape_room_game height="700px"]

&lt;h3&gt;Suas Estatísticas&lt;/h3&gt;
[escape_room_stats]
                </code>
            </div>
            
            <div class="example-card">
                <h3><?php _e('Widget de Sidebar', 'escape-room-security'); ?></h3>
                <p><?php _e('Para exibir estatísticas compactas na sidebar:', 'escape-room-security'); ?></p>
                <code class="example-code">
&lt;h4&gt;Meu Progresso&lt;/h4&gt;
[escape_room_stats style="compact"]
                </code>
            </div>
        </div>
    </div>
</div>

<style>
.escape-room-shortcodes-guide {
    max-width: 1200px;
}

.shortcode-section {
    background: #fff;
    border: 1px solid #ccd0d4;
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 25px;
}

.shortcode-example {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 20px;
    margin: 15px 0;
    position: relative;
}

.shortcode-code {
    background: #2d3748;
    color: #e2e8f0;
    padding: 12px 16px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    display: block;
    margin: 10px 0;
    word-break: break-all;
}

.copy-shortcode {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #dc2626 !important;
    color: white !important;
    border: none !important;
    padding: 6px 12px !important;
    border-radius: 4px !important;
    cursor: pointer;
    font-size: 12px;
}

.copy-shortcode:hover {
    background: #b91c1c !important;
}

.tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.tip-card {
    background: #f0f9ff;
    border: 1px solid #0ea5e9;
    border-radius: 6px;
    padding: 20px;
}

.tip-card h3 {
    color: #0c4a6e;
    margin-bottom: 10px;
}

.example-card {
    background: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 20px;
    margin: 15px 0;
}

.example-code {
    background: #1f2937;
    color: #f9fafb;
    padding: 15px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.5;
    white-space: pre-wrap;
    overflow-x: auto;
    display: block;
    margin-top: 10px;
}
</style>

<script>
jQuery(document).ready(function($) {
    $('.copy-shortcode').click(function(e) {
        e.preventDefault();
        
        var shortcode = $(this).data('shortcode');
        var button = $(this);
        
        // Create temporary textarea
        var temp = $('<textarea>');
        $('body').append(temp);
        temp.val(shortcode).select();
        document.execCommand('copy');
        temp.remove();
        
        // Show feedback
        var originalText = button.text();
        button.text('✓ Copiado!');
        
        setTimeout(function() {
            button.text(originalText);
        }, 2000);
    });
});
</script>
