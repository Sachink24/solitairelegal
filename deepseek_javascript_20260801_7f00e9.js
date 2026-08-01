const LegalReport = require('../models/LegalReport');
const Lead = require('../models/Lead');

exports.getNextReportRef = async (req, res) => {
  try {
    const year = new Date().getFullYear();
    const count = await LegalReport.countDocuments({
      reportRef: { $regex: `SFM-LSR-${year}-` }
    });
    const seq = String(count + 1).padStart(3, '0');
    res.json({ reportRef: `SFM-LSR-${year}-${seq}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createReport = async (req, res) => {
  try {
    const reportData = req.body;
    
    const existing = await LegalReport.findOne({ leadId: reportData.leadId });
    if (existing) {
      return res.status(409).json({ 
        error: 'Report already exists for this lead',
        reportRef: existing.reportRef 
      });
    }
    
    const report = new LegalReport(reportData);
    await report.save();
    
    await Lead.findOneAndUpdate(
      { leadId: reportData.leadId },
      { status: 'legal_check', updatedAt: new Date() }
    );
    
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const { status, leadId } = req.query;
    const query = {};
    if (status) query.status = status;
    if (leadId) query.leadId = leadId;
    
    const reports = await LegalReport.find(query).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReport = async (req, res) => {
  try {
    const report = await LegalReport.findOne({ reportRef: req.params.reportRef });
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReportByLead = async (req, res) => {
  try {
    const report = await LegalReport.findOne({ leadId: req.params.leadId });
    if (!report) {
      return res.status(404).json({ error: 'Report not found for this lead' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const report = await LegalReport.findOneAndUpdate(
      { reportRef: req.params.reportRef },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitReport = async (req, res) => {
  try {
    const report = await LegalReport.findOneAndUpdate(
      { reportRef: req.params.reportRef },
      { status: 'submitted', updatedAt: new Date() },
      { new: true }
    );
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.reviewReport = async (req, res) => {
  try {
    const { decision, comments, reviewer } = req.body;
    const status = decision === 'Approve' ? 'approved' : 
                   decision === 'Reject' ? 'rejected' : 'under_review';
    
    const report = await LegalReport.findOneAndUpdate(
      { reportRef: req.params.reportRef },
      {
        status,
        's10.adminDecision': decision,
        's10.adminComments': comments,
        's10.reviewer': reviewer,
        's10.approvedAt': new Date(),
        updatedAt: new Date()
      },
      { new: true }
    );
    
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    await Lead.findOneAndUpdate(
      { leadId: report.leadId },
      { status: status === 'approved' ? 'approved' : 'rejected', updatedAt: new Date() }
    );
    
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const report = await LegalReport.findOneAndDelete({ reportRef: req.params.reportRef });
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json({ success: true, message: 'Report deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};