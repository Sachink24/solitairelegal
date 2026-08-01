const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Get next report reference
router.get('/next-ref', reportController.getNextReportRef);

// Create report
router.post('/', reportController.createReport);

// Get all reports
router.get('/', reportController.getReports);

// Get report by reference
router.get('/:reportRef', reportController.getReport);

// Get report by lead ID
router.get('/lead/:leadId', reportController.getReportByLead);

// Update report
router.put('/:reportRef', reportController.updateReport);

// Submit report
router.patch('/:reportRef/submit', reportController.submitReport);

// Admin review
router.patch('/:reportRef/review', reportController.reviewReport);

// Delete report
router.delete('/:reportRef', reportController.deleteReport);

module.exports = router;