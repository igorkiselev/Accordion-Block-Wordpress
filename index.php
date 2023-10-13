<?php
/**
 * Plugin Name: Accordion
 * Plugin URI: http://www.justbenice.ru/plugins/accordion/
 * Description: Accordion block for miscellaneous content.
 * Text Domain: jbn
 * Author: Just Be Nice
 * Author URI: http://www.justbenice.ru/
 * Version: 1.0
 */

if (!class_exists('jbn_accordion')) {
    class jbn_accordion
    {
        private function version()
        {
            return WP_DEBUG ? rand(0, 100000) : false;
        }
        private function assets($filename  = null)
        {
            return trailingslashit(plugin_dir_url(__FILE__)).'assets/'. ($filename ? $filename : '') ;
        }
        
        public function __construct()
        {
            add_action('plugins_loaded', array($this , 'plugins_loaded'));
        }
        public function plugins_loaded()
        {
            add_action('init', array($this , 'blocks'));

            add_action('wp_enqueue_scripts', array($this , 'enqueue'));
            
            add_filter('block_categories_all', array($this , 'category'), 10,2);
        }
        
        public function blocks()
        {
            if (! function_exists('register_block_type')) {
                return;
            }

            $basic = array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-block-editor');

            $blocks = array("jbn-accordion","jbn-accordion-content");

            foreach ($blocks as &$block) {
                
                wp_register_script($block, $this->assets('blocks/'.$block.'.min.js'), $basic, $this->version(), false);

                $block_name = str_replace("jbn-", "jbn/", $block);

                register_block_type($block_name, array('editor_script' => $block));
            
            }
        }
        
        public function enqueue()
        {
            
            wp_enqueue_script('jquery');
            
            wp_enqueue_script('jquery-ui-core');
            
            wp_enqueue_script('jquery-ui-accordion');

            wp_register_script('wp-block-jbn-accordion', $this->assets('enqueue/accordion-init.min.js'), array('jquery', 'jquery-ui-core','jquery-ui-accordion'), $this->version(), false);

            wp_enqueue_script('wp-block-jbn-accordion');
        }
        
        public function category( $_categories, $_context ){
            
            if ( ! empty( $_context->post ) ) {
            
                $return = array_map( fn($value): string => $value['slug'], $_categories);
            
                !in_array('jbn-jquery-category', $return) ? array_push(
                    $_categories,
                    array(
                        'slug'  => 'jbn-jquery-category',
                        'title' => __( 'JQuery blocks'),
                        'icon'  => null,
                    )
                ) : null;
            }
            return $_categories;
        }
    }
    $jbn_accordion = new jbn_accordion();
}
