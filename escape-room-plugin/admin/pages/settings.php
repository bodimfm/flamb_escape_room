<?php
if (!defined('ABSPATH')) {
    exit;
}

$options = get_option('escape_room_options', array());
$defaults = array(
    'company_name' => 'Flamboyant Shopping',
    'game_title' => 'Desafio de Segurança - Vazamento de Dados',
    'enable_gamipress' => true,
    'daily_limit' => true,
    'webhook_url' => '',
    'redirect_url' => home_url('/obrigado/'),
);

$options = wp_parse_args($options, $defaults);
?>

<div class="wrap">
    <h1><?php _e('Configurações - Escape Room', 'escape-room-security'); ?></h1>
    
    <form method="post" action="">
        <?php wp_nonce_field('escape_room_settings', 'escape_room_nonce'); ?>
        
        <table class="form-table">
            <tbody>
                <tr>
                    <th scope="row">
                        <label for="company_name"><?php _e('Nome da Empresa', 'escape-room-security'); ?></label>
                    </th>
                    <td>
                        <input type="text" id="company_name" name="company_name" value="<?php echo esc_attr($options['company_name']); ?>" class="regular-text" />
                        <p class="description"><?php _e('Nome da empresa que aparecerá no jogo', 'escape-room-security'); ?></p>
                    </td>
                </tr>
                
                <tr>
                    <th scope="row">
                        <label for="game_title"><?php _e('Título do Jogo', 'escape-room-security'); ?></label>
                    </th>
                    <td>
                        <input type="text" id="game_title" name="game_title" value="<?php echo esc_attr($options['game_title']); ?>" class="regular-text" />
                        <p class="description"><?php _e('Título que aparecerá no cabeçalho do jogo', 'escape-room-security'); ?></p>
                    </td>
                </tr>
                
                <tr>
                    <th scope="row"><?php _e('Integração GamiPress', 'escape-room-security'); ?></th>
                    <td>
                        <fieldset>
                            <label for="enable_gamipress">
                                <input type="checkbox" id="enable_gamipress" name="enable_gamipress" value="1" <?php checked($options['enable_gamipress']); ?> />
                                <?php _e('Ativar integração com GamiPress', 'escape-room-security'); ?>
                            </label>
                            <p class="description">
                                <?php _e('Permite conceder conquistas e pontos automaticamente via GamiPress', 'escape-room-security'); ?>
                                <?php if (!function_exists('gamipress_award_achievement_to_user')): ?>
                                    <br><strong style="color: #d63638;"><?php _e('⚠️ Plugin GamiPress não está instalado/ativo', 'escape-room-security'); ?></strong>
                                <?php endif; ?>
                            </p>
                        </fieldset>
                    </td>
                </tr>
                
                <tr>
                    <th scope="row"><?php _e('Limite Diário', 'escape-room-security'); ?></th>
                    <td>
                        <fieldset>
                            <label for="daily_limit">
                                <input type="checkbox" id="daily_limit" name="daily_limit" value="1" <?php checked($options['daily_limit']); ?> />
                                <?php _e('Permitir apenas uma tentativa por dia por usuário', 'escape-room-security'); ?>
                            </label>
                            <p class="description"><?php _e('Evita spam e garante que cada usuário tenha apenas uma chance por dia', 'escape-room-security'); ?></p>
                        </fieldset>
                    </td>
                </tr>
                
                <tr>
                    <th scope="row">
                        <label for="webhook_url"><?php _e('URL do Webhook', 'escape-room-security'); ?></label>
                    </th>
                    <td>
                        <input type="url" id="webhook_url" name="webhook_url" value="<?php echo esc_attr($options['webhook_url']); ?>" class="regular-text" />
                        <p class="description"><?php _e('URL para enviar dados quando o jogo for completado (opcional)', 'escape-room-security'); ?></p>
                    </td>
                </tr>
                
                <tr>
                    <th scope="row">
                        <label for="redirect_url"><?php _e('URL de Redirecionamento', 'escape-room-security'); ?></label>
                    </th>
                    <td>
                        <input type="url" id="redirect_url" name="redirect_url" value="<?php echo esc_attr($options['redirect_url']); ?>" class="regular-text" />
                        <p class="description"><?php _e('URL para onde o usuário será redirecionado após completar o jogo', 'escape-room-security'); ?></p>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <h2><?php _e('Conquistas GamiPress', 'escape-room-security'); ?></h2>
        <p><?php _e('Para que a integração funcione corretamente, certifique-se de que as seguintes conquistas existem no GamiPress:', 'escape-room-security'); ?></p>
        
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th><?php _e('Slug da Conquista', 'escape-room-security'); ?></th>
                    <th><?php _e('Nome Sugerido', 'escape-room-security'); ?></th>
                    <th><?php _e('Pontos', 'escape-room-security'); ?></th>
                    <th><?php _e('Critério', 'escape-room-security'); ?></th>
                    <th><?php _e('Status', 'escape-room-security'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php
                $achievements = array(
                    'ciber_aprendiz' => array('name' => 'Ciber Aprendiz', 'points' => 50, 'criteria' => '0-25% de acerto'),
                    'ciber_vigilante' => array('name' => 'Ciber Vigilante', 'points' => 100, 'criteria' => '26-50% de acerto'),
                    'ciber_guardiao' => array('name' => 'Ciber Guardião', 'points' => 150, 'criteria' => '51-75% de acerto'),
                    'ciber_embaixador_flamboyant' => array('name' => 'Ciber Embaixador Flamboyant', 'points' => 200, 'criteria' => '76-100% de acerto'),
                );
                
                foreach ($achievements as $slug => $data):
                    $exists = get_page_by_path($slug, OBJECT, 'achievement');
                ?>
                    <tr>
                        <td><code><?php echo $slug; ?></code></td>
                        <td><?php echo $data['name']; ?></td>
                        <td><?php echo $data['points']; ?></td>
                        <td><?php echo $data['criteria']; ?></td>
                        <td>
                            <?php if ($exists): ?>
                                <span style="color: #46b450;">✅ <?php _e('Existe', 'escape-room-security'); ?></span>
                            <?php else: ?>
                                <span style="color: #d63638;">❌ <?php _e('Não encontrada', 'escape-room-security'); ?></span>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        
        <?php submit_button(__('Salvar Configurações', 'escape-room-security')); ?>
    </form>
</div>
