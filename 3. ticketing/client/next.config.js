module.exports = { // in theory it is use to try to make faster that 
    webpack: (config) => { // reflect the changes on the files when they are running on a docker container
        config.watchOptions.poll = 300; // other solution, kill the client pod and skaffold will try to construct the pod again
        return config;
    },
}