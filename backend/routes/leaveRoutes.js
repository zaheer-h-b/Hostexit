const express = require('express');
const router = express.Router();
const { applyLeave, getAllLeaves ,updateLeaveStatus } = require('../controllers/leaveController');

router.post('/', applyLeave);    
router.get('/', getAllLeaves);   
router.put('/:id', updateLeaveStatus);

module.exports = router;
