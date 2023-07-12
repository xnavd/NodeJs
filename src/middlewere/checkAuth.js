import expressJWT from 'express-jwt';

exports.checkAuth = (req, res, next) => {
    const isAdmin = true;
    if(isAdmin){
        next();
    } else {
        res.redirect('/');
    }
}

export const requireSignin = expressJWT({
    secret: "123456",
    algorithms:["HS256"],
    requestProperty: "auth"
});

export const isAuth = (req, res, next) => {
    console.log(req.auth);
    const user = req.profile._id == res.auth._id;
    if(!user){
      res.status(402).json({
        message: "Không được phép truy cập!"
      })
    }
    next();
}

export const isAdmin = (req, res, next) => {
    if(req.profile.role == 0) {
        return res.status(401).json({
            message: "Bạn không phải admin"
        })
    }
    next();
}

