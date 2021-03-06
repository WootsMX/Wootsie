class ClaroVideo extends BaseProvider
{
	/**
	 * Constructor
	 */
	constructor() {
		super();

		this.name		= 'ClaroVideo';
		this.logo 		= 'claro.png';
		this.baseUrl	= 'https://www.clarovideo.com';
		this.viewUrl	= 'http://playerhtml5.clarovideo.net/playerhtml5/';
	}

	/**
	 * Objeto del <video>
	 */
	video() {
		return $('.video-container video').get(0);
	}

	/**
	 * Devuelve la ID del Stream
	 */
	getId() {
		return $.query.get('group_id');
	}

	/**
	 * Devuelve el título del Stream
	 */
	getTitle() {
		// Titulos
		var media		= $('.h2_content_title').first().text().trim();
		var subtitle	= $('.controls-title-wrapper span.ng-binding').first().next().text();
		var chapter		= $('.controls-title-wrapper span.ng-binding').last().text();

		if ( media.length == 0 ) return null;

		var title = media;

		if ( subtitle.length > 0 )
			title += ' - Temporada ' + subtitle;
		if ( chapter.length > 0 )
			title += ' - Episodio ' + chapter;

		return title;
	}

	/**
	 * Devuelve el estado actual de la reproducción
	 */
	getState() {
		if ( $('vph5-buffering').is(':visible') ) {
			return 'loading';
		}

		return super.getState();
	}

	/**
	 * Agregamos escuchas a eventos del reproductor
	 */
	binds() {
		// Nuestras propias acciones
		$('body').on('click', 'vph5-play-pause-button .fa-pause', this.onPaused);
		$('body').on('click', 'vph5-play-pause-button .fa-play', this.onPlay);
		$('vph5-scrub-bar').on('click', this.onSeek);

		$('body').on('keydown', function(e) {
			e.stopImmediatePropagation();
			e.stopPropagation();
		});
	}

	/**
	 * Limpiamos los escuchas
	 */
	clear() {
		$('body').off('click', 'vph5-play-pause-button .fa-pause');
		$('body').off('click', 'vph5-play-pause-button .fa-play');
		$('vph5-scrub-bar').off('click');

		$('body').off('keydown');
	}

	/**
	 * Devuelve el objeto donde debemos inyectar el chat
	 */
	injectChatAfterThis() {
		return $('.vph5-player.main-wrapper');
	}
}