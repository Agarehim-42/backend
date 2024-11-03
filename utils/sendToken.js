export default (user, statusCode, res) => {
    const token = user.jwtTokeniEldeEt()
    console.log(token)

    //options cookies

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME *24*60*60*1000) ,
        httpOnly:true
    }
    //COOKIE
    res.status(statusCode).cookie("token" , token , options).json({
        token
    })
}

// function welcomeUser(username) {
//     return "Hello , " + username
// }

// welcomeUser(user.findOne())