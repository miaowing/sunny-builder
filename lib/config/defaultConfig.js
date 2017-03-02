module.exports = {
    dev: {
        webpackServerPort: 8081,
        staticServer: 'http://localhost:' + 8081,
    },
    releaseDir: 'build',
    build: {
        publicPath: '/'
    },
    dist: {
        publicPath: '/'
    },
    scriptDir: '',
    styleDir: '',
    assetsDir: 'assets'
};
