import { ONE_DAY } from "../constants/index.js";
import { singInUser, singUpUser, logOutUser,  resetPassword, requestResetToken } from "../services/auth.js";


export const createUserController = async(req, res)=>{
const User = await singUpUser(req.body);

res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: User,
});

    
};

export const logInUserController = async(req,res)=>{
const session = await singInUser(req.body);

res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
    });
    
    res.cookie('sessionId', session._id,{
    httpOnly: true,
    expires: new Date(Date.now()+ ONE_DAY),
    });

res.status(200).json({
status: 200,
message: 'Successfully logged in a user!',
data:  {
    accessToken: session.accessToken,
  },
});
};

export const logOutUserController = async(req, res)=>{
if(req.cookies.sesionId){
    logOutUser(req.cookies.sesionId);
}
res.clean('sessionId');
res.clean('refreshToken');
res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
    await requestResetToken(req.body.email);
    res.json({
      message: 'Reset password email was successfully sent!',
      status: 200,
      data: {},
    });
  };

export const resetPasswordController = async(req,res)=>{
    await resetPassword(req.body);
    
    res.json({
    status: 200,
    message: 'Password was successfully reset!',
    data: {},
    });
};    