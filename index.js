const request = require('request');

/**
 * This is a simple jim-workflow that prints a random dadjoke to the console
 */
module.exports = class JimDadjoke {
	/**
	 * Kick things off
	 *
	 * @param {Object} jim The jim-object
	 */
	constructor(jim) {
		this.headers = {
			'User-Agent': 'jim',
			Accept: 'application/json',
		};
		this.api = 'https://icanhazdadjoke.com';
		this.jim = jim;
	}

	/**
	 * The jim-run method.
	 */
	run() {
		request(
			{
				url: this.api,
				headers: this.headers,
			},
			(error, response, body) => {
				if (!error && response.statusCode === 200) {
					this._displayJoke(body);
				} else {
					this.jim.Logger.error(error);
				}
			}
		);
	}

	/**
	 * Prints the joke to the console
	 * @param {String} _jokeData the API response
	 */
	_displayJoke(_jokeData) {
		const data = JSON.parse(_jokeData);
		this.jim.Logger.log(data.joke);
	}
};
