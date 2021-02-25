<?php
/**
 * Change src script by data-lazy-src.
 *
 * @package DidYouKnow
 */

add_filter( 'embed_oembed_html', 'filter_embed_handler_html', 10, 3 );

/**
 * Enable lazy loading embeds such as Twitter, Instagram, Scribd.
 *
 * @param string $html Original embed html.
 * @param string $url  Embed URL.
 *
 * @return string Modified HTML.
 */
function filter_embed_handler_html( $html, $url ) {
	$is_instagram = false !== strpos( $url, 'instagram' );
	$is_twitter   = false !== strpos( $url, 'twitter' );
	$is_facebook  = false !== strpos( $url, 'facebook' );
	$is_scribd    = false !== strpos( $url, 'scribd' );
	if ( ! $is_twitter && ! $is_instagram && ! $is_scribd ) {
		return $html;
	}

	$pattern = '/<\s*script[^>]*>(.*?)<\s*\/\s*script>/';
	preg_match( $pattern, $html, $matches );
	$no_script_tags_present = empty( $matches );
	if ( ! $is_youtube && $no_script_tags_present ) {
		return $html;
	}

	if ( $is_twitter || $is_instagram || $is_facebook ) {
		$replace = str_replace( 'src', 'data-lazy-src', $matches[0] );
		$html    = str_replace( $matches[0], $replace, $html );
	} elseif ( $is_scribd ) {
		$pattern = '/<\s*iframe[^>]*>(.*?)<\s*\/\s*iframe>/';
		preg_match( $pattern, $html, $iframe_matches );
		if ( empty( $iframe_matches ) ) {
			return $html;
		}

		$replace = str_replace( 'src', 'data-src', $iframe_matches[0] );
		$html    = str_replace( $iframe_matches[0], $replace, $html );

		// Replace the script to avoid it from running and add it to data-script instead.
		if ( array_key_exists( 1, $matches ) ) {
			$html = str_replace( $matches[1], '', $html );
			$html = str_replace( '<script', "<script data-script='" . $matches[1] . "' ", $html );
		}
	}

	return $html;
}
