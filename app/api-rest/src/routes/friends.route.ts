import {Express} from 'express';
import {FriendsPostController} from "../friends/controllers/FriendsPostController";
import container from "../di";

export const register = async (app: Express) => {
    const friendsController: FriendsPostController = container.get('FriendsPostController');

    app.post('/user', friendsController.run.bind(friendsController));
};
