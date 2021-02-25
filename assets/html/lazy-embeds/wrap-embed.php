<?php
/**
 * Wrap embed around a div with a class.
 *
 * @package DidYouKnow
 */

add_filter( 'embed_oembed_html', 'filter_responsive_embeds', 10, 3 );

/**
 * Add a wrapper around embed.
 *
 * @param string $html Original embed html.
 */
function filter_responsive_embeds( $html ) {
	if ( stripos( $html, 'twitter' ) !== false ) {
		return '<div class="embed-twitter">' . $html . '</div>';
	} elseif ( stripos( $html, 'facebook' ) !== false ) {
		return '<div class="embed-facebook">' . $html . '</div>';
	} elseif ( stripos( $html, 'instagram' ) !== false ) {
		return '<div class="embed-instagram">' . $html . '</div>';
	} elseif ( stripos( $html, 'twitter' ) === false && stripos( $html, 'facebook' ) === false && stripos( $html, 'instagram' ) === false ) {
		return $html;
	}
}
