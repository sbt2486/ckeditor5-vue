/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const { bundler } = require( '@ckeditor/ckeditor5-dev-utils' );
// const UglifyJsWebpackPlugin = require( 'uglifyjs-webpack-plugin' );

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	entry: [
		require.resolve( '@babel/polyfill' ),
		require.resolve( 'unorm' ),
		require.resolve( './src/ie11-polyfills.js' ),
		require.resolve( 'regenerator-runtime/runtime.js' ),
		path.join( __dirname, 'src', 'plugin.js' ),
		//path.resolve( __dirname, 'src', 'plugin.js' ),
	],
	//
	// entry: path.join( __dirname, 'src', 'plugin.js' ),

	output: {
		library: 'CKEditor',
		path: path.join( __dirname, 'dist' ),
		filename: 'ckeditor.js',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},

	optimization: {
		minimizer: []
	},

	plugins: [
		new webpack.BannerPlugin( {
			banner: bundler.getLicenseBanner(),
			raw: true
		} ),
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /ckeditor5-[^/\\]+[/\\].*\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env', {
										debug: true
									}
								]
							],
							plugins: [
								[
									'@babel/plugin-transform-modules-commonjs', {
										strictMode: false
									}
								]
							]
						}
					}
				]
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: require.resolve( './src/remove-strict.js' )
					}
				]
			},
		]
	},
};
