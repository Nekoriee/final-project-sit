module.exports = {
    entry: {
	Messenger_lodash: ['/src/scripts/navbar.js', '/src/scripts/Messenger_lodash.js'],
	Messenger: ['/src/scripts/navbar.js', '/src/scripts/Messenger.js'],
	Countdown: ['/src/scripts/navbar.js', '/src/scripts/Countdown.js'],
	Game_PilotBrothers: ['/src/scripts/navbar.js', '/src/scripts/Game_PilotBrothers.js'],
	Game_WhackAMole: ['/src/scripts/navbar.js', '/src/scripts/Game_WhackAMole.js'],
	navbar: '/src/scripts/navbar.js',
    },

    output: {
	filename: '[name].js',
	path: __dirname + '/src/scripts/dist',
      },
};