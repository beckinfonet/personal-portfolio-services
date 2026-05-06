import { Router } from 'express';
import { getApps, getExperience, getHealth, getPosts, getProfile, getSkills } from '../controllers/contentController';

const apiRoutes = Router();

apiRoutes.get('/health', getHealth);
apiRoutes.get('/profile', getProfile);
apiRoutes.get('/skills', getSkills);
apiRoutes.get('/experience', getExperience);
apiRoutes.get('/apps', getApps);
apiRoutes.get('/posts', getPosts);

export default apiRoutes;
