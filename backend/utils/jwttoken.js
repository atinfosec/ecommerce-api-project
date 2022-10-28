// creating token and saving it to cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    
    //options for cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 60 * 1000),
        httponly: true
    }
    res.status(statusCode)
    .cookie("token", token, options)
    .json({
        success: true,
        user,
        token,
    });
}

module.exports = sendToken;