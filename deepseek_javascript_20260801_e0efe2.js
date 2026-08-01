const mongoose = require('mongoose');
const Lead = require('../models/Lead');
require('dotenv').config();

const sampleLeads = [
  {
    leadId: 'SFM-LEAD-10457',
    borrowerName: 'Rohit Sharma',
    coBorrowerName: 'Sunita Sharma',
    phone: '9876543210',
    email: 'rohit.sharma@example.com',
    propertyAddress: 'Flat No. 302, Shreeji Heights, Near Anand Nagar, Bhiwandi, Thane',
    propertyType: 'Flat',
    loanAmount: 4500000,
    loanType: 'Home Loan',
    status: 'legal_check',
    source: 'Website'
  },
  {
    leadId: 'SFM-LEAD-10458',
    borrowerName: 'Amit Patel',
    coBorrowerName: '',
    phone: '9876543211',
    email: 'amit.patel@example.com',
    propertyAddress: 'Plot No. 15, Green Valley, Navi Mumbai',
    propertyType: 'Plot',
    loanAmount: 2500000,
    loanType: 'LAP',
    status: 'new',
    source: 'Referral'
  },
  {
    leadId: 'SFM-LEAD-10459',
    borrowerName: 'Priya Deshmukh',
    coBorrowerName: 'Vikram Deshmukh',
    phone: '9876543212',
    email: 'priya.d@example.com',
    propertyAddress: 'Bungalow No. 7, Lake View Estate, Thane',
    propertyType: 'House',
    loanAmount: 7500000,
    loanType: 'Home Loan',
    status: 'new',
    source: 'Direct'
  },
  {
    leadId: 'SFM-LEAD-10460',
    borrowerName: 'Sanjay Mehta',
    coBorrowerName: 'Kavita Mehta',
    phone: '9876543213',
    email: 'sanjay.mehta@example.com',
    propertyAddress: 'Office No. 201, Business Park, Andheri East, Mumbai',
    propertyType: 'Commercial',
    loanAmount: 12000000,
    loanType: 'LAP',
    status: 'in_progress',
    source: 'DSA'
  },
  {
    leadId: 'SFM-LEAD-10461',
    borrowerName: 'Neha Singh',
    coBorrowerName: '',
    phone: '9876543214',
    email: 'neha.singh@example.com',
    propertyAddress: 'Industrial Plot No. 45, MIDC, Taloja, Navi Mumbai',
    propertyType: 'Industrial',
    loanAmount: 8500000,
    loanType: 'Construction',
    status: 'new',
    source: 'Website'
  }
];

async function seedLeads() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/solitaire_finz_mart');
    console.log('Connected to MongoDB');
    
    for (const leadData of sampleLeads) {
      const existing = await Lead.findOne({ leadId: leadData.leadId });
      if (!existing) {
        await Lead.create(leadData);
        console.log(`✅ Created lead: ${leadData.leadId} - ${leadData.borrowerName}`);
      } else {
        console.log(`⏭️ Lead already exists: ${leadData.leadId}`);
      }
    }
    
    console.log('✅ Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding leads:', error);
    process.exit(1);
  }
}

seedLeads();