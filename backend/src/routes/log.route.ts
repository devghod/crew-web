import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middlewares';
import { 
  getLogs,
  postLogsPaginate,
} from '../controllers/log.controller';

const router = Router();

router.get('/get-logs', authenticate, getLogs);
router.post('/post-logs-paginate', authenticate, postLogsPaginate);

module.exports = router;