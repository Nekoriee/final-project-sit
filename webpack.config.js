module.exports = {
    entry: {
	Messenger_lodash: ['/assets/js/navbar.js', '/assets/js/Messenger_lodash.js'],
	Messenger: ['/assets/js/navbar.js', '/assets/js/Messenger.js'],
	Countdown: ['/assets/js/navbar.js', '/assets/js/Countdown.js'],
	Game_PilotBrothers: ['/assets/js/navbar.js', '/assets/js/Game_PilotBrothers.js'],
	Game_WhackAMole: ['/assets/js/navbar.js', '/assets/js/Game_WhackAMole.js'],
	navbar: '/assets/js/navbar.js',
    },

    output: {
	filename: '[name].js',
	path: __dirname + '/assets/js/dist',
      },
};