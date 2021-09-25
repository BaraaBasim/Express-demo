

function authen(req,res,next) {
    console.log('Authenticating..');
    next();
}

module.exports = authen;