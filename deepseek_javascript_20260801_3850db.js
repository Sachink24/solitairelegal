const mongoose = require('mongoose');

const LegalReportSchema = new mongoose.Schema({
  // Meta
  reportRef: { 
    type: String, 
    unique: true, 
    required: true,
    index: true
  },
  leadId: { 
    type: String, 
    required: true, 
    index: true 
  },
  reportDate: { 
    type: Date, 
    default: Date.now 
  },
  fileRef: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected'],
    default: 'draft'
  },
  
  // Section 1: Case Identification
  s1: {
    borrowerNames: { type: String, required: true },
    coBorrowerNames: { type: String },
    mortgagorNames: { type: String, required: true },
    loanType: { type: String, required: true },
    mortgagePurpose: { type: String, required: true },
    mortgageMode: { type: String, required: true },
    advocateName: { type: String, required: true },
    panelCode: { type: String },
    fileReference: { type: String }
  },
  
  // Section 2: Property Identification
  s2: {
    address: { type: String, required: true },
    propertyType: { type: String, required: true },
    surveyCts: { type: String },
    locality: { type: String },
    taluka: { type: String },
    district: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    areaBuiltUp: { type: String },
    areaLand: { type: String },
    boundaries: {
      north: { type: String },
      south: { type: String },
      east: { type: String },
      west: { type: String }
    },
    landmark: { type: String }
  },
  
  // Section 3: Document Scrutiny
  s3: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    upload: { type: String },
    copyType: { type: String, enum: ['Original', 'Xerox'], default: 'Xerox' },
    verified: { type: Boolean, default: false },
    remarks: { type: String },
    custom: { type: Boolean, default: false }
  }],
  
  // Section 4: Title Flow
  s4: {
    rows: [{
      id: { type: String, required: true },
      date: { type: String },
      transferor: { type: String },
      transferee: { type: String },
      docType: { type: String },
      regDetails: { type: String }
    }],
    lookbackConfirmed: { type: String, enum: ['Yes', 'No'], default: 'Yes' }
  },
  
  // Section 5: Encumbrance
  s5: {
    searchFrom: { type: String },
    searchTo: { type: String },
    encumbranceFound: { type: String, enum: ['Yes', 'No'], default: 'No' },
    encumbranceType: { type: String },
    outstandingAmount: { type: String },
    searchBy: { type: String },
    searchAt: { type: String },
    searchDate: { type: String },
    remarks: { type: String }
  },
  
  // Section 6: Statutory & Tax
  s6: {
    taxUpToDate: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
    electricityWaterInOwnerName: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
    maintenanceDuesCleared: { type: String, enum: ['Yes', 'No', 'NA'], default: 'Yes' },
    statutoryDuesPending: { type: String, enum: ['Yes', 'No'], default: 'No' },
    statutoryDuesAmount: { type: String },
    approvedPlanAvailable: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
    ocCcAvailable: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
    unauthorizedConstruction: { type: String, enum: ['Yes', 'No'], default: 'No' },
    unauthorizedDetails: { type: String },
    conversionOrderObtained: { type: String, enum: ['Yes', 'No', 'NA'], default: 'NA' }
  },
  
  // Section 7: Litigation
  s7: {
    litigationPending: { type: String, enum: ['Yes', 'No'], default: 'No' },
    courtName: { type: String },
    caseNo: { type: String },
    parties: { type: String },
    caseStatus: { type: String },
    nextHearing: { type: String },
    revenueNotice: { type: String, enum: ['Yes', 'No'], default: 'No' },
    revenueNoticeDetails: { type: String },
    arbitrationPending: { type: String, enum: ['Yes', 'No'], default: 'No' },
    arbitrationDetails: { type: String }
  },
  
  // Section 8: Mortgageability
  s8: {
    titleStatus: { type: String, enum: ['Clear', 'Conditional', 'Defective'], default: 'Clear' },
    ownerCapacity: { type: String, enum: ['Confirmed', 'Doubtful'], default: 'Confirmed' },
    poaValid: { type: String, enum: ['Yes', 'No', 'NA'], default: 'NA' },
    freeFromEncumbrance: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
    thirdPartyNocRequired: { type: String, enum: ['Yes', 'No'], default: 'No' },
    thirdPartyNocFrom: { type: String },
    conditions: [{
      id: { type: String, required: true },
      text: { type: String },
      dueDate: { type: String }
    }]
  },
  
  // Section 9: Final Opinion
  s9: {
    finalOpinion: { 
      type: String, 
      enum: ['Property is fit for mortgage', 'Not fit for mortgage', 'Fit subject to conditions'],
      required: true
    },
    conclusion: { type: String },
    advocateSignName: { type: String, required: true },
    signatureUpload: { type: String },
    barCouncilNo: { type: String, required: true },
    signOffDate: { type: String }
  },
  
  // Section 10: Review
  s10: {
    adminDecision: { type: String },
    adminComments: { type: String },
    reviewer: { type: String },
    approvedAt: { type: Date }
  },
  
  // Audit
  createdBy: { type: String },
  updatedBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
LegalReportSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('LegalReport', LegalReportSchema);