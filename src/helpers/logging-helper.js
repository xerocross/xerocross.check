let externalLogger = {
    error () {},
    warn () {},
    info () {},
    debug () {},
};

export default {
    init (externalLoggerInput) {
        externalLogger = externalLoggerInput;
    },
    error (message) {
        
    },
    warn () {},
    info () {},
    debug () {},
}