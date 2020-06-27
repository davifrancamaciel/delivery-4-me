import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import validateUserStore from './app/validators/User/store';
import validateUserUpdate from './app/validators/User/update';

import SessionController from './app/controllers/SessionController';
import validateSessionStore from './app/validators/Session/store';

const routes = new Router();

routes.get('/', (req, res) =>
  res.json({ message: 'Bem vindo a API do Delivery For Me!!!!' })
);

// rotas publicas
routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);

// rotas privadas
routes.use(authMiddleware);
routes.get('/users', UserController.index);
routes.put('/users', validateUserUpdate, UserController.update);
routes.get('/users/:id', UserController.find);

export default routes;
