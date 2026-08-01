const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

// Get lead by ID
router.get('/:leadId', leadController.getLead);

// Get all leads with filters
router.get('/', leadController.getLeads);

// Create new lead
router.post('/', leadController.createLead);

// Update lead status
router.patch('/:leadId/status', leadController.updateLeadStatus);

// Update lead
router.put('/:leadId', leadController.updateLead);

// Delete lead
router.delete('/:leadId', leadController.deleteLead);

module.exports = router;