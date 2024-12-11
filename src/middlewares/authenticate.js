import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/user";
import { SessionCollection } from "../db/models/session";


export const authenticate = async(req, res, next)=>{
const authHeader = req.get('Authorization');

if(!authHeader){
    createHttpError(401, 'Provide authorization header');
    return;
};

const bearer = authHeader.split(' ')[0];
const token = authHeader.split(' ')[1];

if(bearer !== 'Bearer' || !token){
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
};

const session = await SessionCollection.findOne({
    accessToken: token
});

if(!session){
    next(createHttpError(401, 'Session not found'));
    return;
};

const isAccessTokenExpire =
 new Date() > new Date(session.accessTokenValidUntil);

if(isAccessTokenExpire){
    next(createHttpError(401, 'Access token expired'));
    return;
};

const sessions = await SessionCollection.find({});
console.log('Sessions:', sessions);

const user = await UsersCollection.findById(session.userId);

if(!user){
    next(createHttpError(401));
    return;
};

req.user = user;

next();
};