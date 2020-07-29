import WSController from "./socket-service";
import {baseURL} from '../config';

export const wsController = new WSController();
wsController.connect(baseURL);
