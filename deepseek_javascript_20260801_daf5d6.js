const Lead = require('../models/Lead');

exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({ leadId: req.params.leadId });
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const { status, assignedTo, search } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (assignedTo) query.assignedTo = assignedTo;
    if (search) {
      query.$or = [
        { leadId: { $regex: search, $options: 'i' } },
        { borrowerName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    
    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLead = async (req, res) => {
  try {
    const { leadId } = req.body;
    
    const existing = await Lead.findOne({ leadId });
    if (existing) {
      return res.status(409).json({ error: 'Lead ID already exists' });
    }
    
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findOneAndUpdate(
      { leadId: req.params.leadId },
      { status, updatedAt: new Date() },
      { new: true }
    );
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      { leadId: req.params.leadId },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({ leadId: req.params.leadId });
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};