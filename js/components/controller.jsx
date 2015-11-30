// React
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

// Components
import PostList from './posts';
import Navigation from './navigation';
import SinglePost from './post';

// Private vars
var _currentSlug, _currentType, _currentPage;

let Controller = {
	setup: function( context, next ) {
		var path = context.pathname;

		if ( path.match( /\/wp-admin/i ) ) {
			next();
		}

		if ( path.substr( -1 ) === '/' ) {
			path = path.substr( 0, path.length - 1 );
		}
		if ( path.length ) {
			_currentSlug = path.substring( path.lastIndexOf( '/' ) + 1 );
		}

		_currentType = 'post';
		if ( ! path.match( /\d{4}\/\d{2}/ ) ) {
			_currentType = 'page';
		}

		let bodyClass = {
			'logged-in': ( parseInt( AnadamaSettings.user ) !== 0 ),
			'home': ( path.length === 0 ),
			'single': ( path.length > 0 ),
			'single-page': ( path.length > 0 ) && ( 'page' === _currentType ),
			'single-post': ( path.length > 0 ) && ( 'post' === _currentType ),
		};
		document.body.className = classNames( bodyClass );

		_currentPage = parseInt( context.params.page ) || 1;

		next();
	},

	navigation: function( context, next ) {
		ReactDOM.render(
			<Navigation />,
			document.getElementById( 'site-navigation' )
		);

		next();
	},

	posts: function() {
		ReactDOM.render(
			<PostList page={ _currentPage } />,
			document.getElementById( 'main' )
		);
	},

	post: function() {
		ReactDOM.render(
			<SinglePost slug={ _currentSlug } type={ _currentType } />,
			document.getElementById( 'main' )
		);
	},
};

export default Controller;
