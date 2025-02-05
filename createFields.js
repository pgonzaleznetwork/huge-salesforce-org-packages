const fs = require('fs');
const path = require('path');


const objects = [
    "accountManagement", "leadTracking", "contactProfile", "opportunityPipeline", "salesForecast",
    "customerFeedback", "invoiceTracking", "paymentProcessing", "orderFulfillment", "productCatalog",
    "serviceRequest", "caseManagement", "contractAgreement", "projectMilestone", "taskAssignment",
    "employeeOnboarding", "recruitmentPipeline", "performanceReview", "trainingModule", "timeTracking",
    "expenseReport", "budgetAllocation", "financialStatement", "taxCompliance", "auditLog",
    "assetInventory", "vendorManagement", "purchaseOrder", "supplyChain", "warehouseLogistics",
    "shippingSchedule", "deliveryTracking", "returnAuthorization", "qualityAssurance", "maintenanceSchedule",
    "riskAssessment", "complianceCheck", "policyDocument", "incidentReport", "securityAudit",
    "customerOnboarding", "loyaltyProgram", "subscriptionPlan", "billingCycle", "renewalReminder",
    "campaignAnalytics", "marketingAutomation", "leadScoring", "emailTemplate", "socialMediaEngagement",
    "eventRegistration", "webinarTracking", "surveyResponse", "customerJourney", "salesPlaybook",
    "partnerPortal", "channelManagement", "dealRegistration", "quoteGeneration", "proposalTemplate",
    "contractRenewal", "serviceLevelAgreement", "supportTicket", "knowledgeBase", "faqManagement",
    "communityForum", "userFeedback", "bugTracking", "featureRequest", "releaseSchedule",
    "dataMigration", "integrationFlow", "apiEndpoint", "systemLog", "errorReport",
    "dashboardWidget", "reportTemplate", "analyticsMetric", "kpiTracking", "dataVisualization",
    "userPermission", "roleHierarchy", "accessControl", "loginHistory", "passwordPolicy",
    "notificationSetting", "alertConfiguration", "workflowRule", "approvalProcess", "automationTrigger",
    "dataValidation", "fieldMapping", "recordType", "pageLayout", "customLabel",
    "emailAlert", "smsNotification", "pushNotification", "inAppMessage", "chatbotScript",
    "aiPrediction", "machineLearning", "dataEnrichment", "customerSegmentation", "behavioralAnalysis",
    "salesTerritory", "regionMapping", "districtAssignment", "teamCollaboration", "goalSetting",
    "competitorAnalysis", "marketResearch", "productLaunch", "pricingStrategy", "discountApproval",
    "inventoryTracking", "stockReplenishment", "supplierRating", "procurementProcess", "vendorContract",
    "projectResource", "taskDependency", "ganttChart", "resourceAllocation", "costEstimation",
    "timeOffRequest", "leaveBalance", "payrollProcessing", "benefitEnrollment", "employeeSurvey",
    "trainingFeedback", "skillAssessment", "careerPath", "successionPlanning", "exitInterview",
    "travelRequest", "expenseApproval", "reimbursementProcess", "corporateCard", "budgetForecast",
    "cashFlowAnalysis", "investmentPlan", "loanApplication", "creditCheck", "fraudDetection",
    "insurancePolicy", "claimProcessing", "coverageLimit", "premiumCalculation", "riskMitigation",
    "disasterRecovery", "businessContinuity", "incidentResponse", "threatDetection", "vulnerabilityScan",
    "dataBackup", "systemRestore", "networkMonitoring", "serverHealth", "applicationPerformance",
    "userActivity", "sessionTimeout", "multiFactorAuth", "singleSignOn", "dataEncryption",
    "fileStorage", "documentVersion", "contentLibrary", "digitalAsset", "mediaUpload",
    "videoStreaming", "audioRecording", "imageGallery", "presentationSlide", "spreadsheetTemplate",
    "formBuilder", "surveyDesign", "pollCreation", "quizModule", "certificateTemplate",
    "eventCalendar", "roomBooking", "meetingAgenda", "conferenceCall", "webinarRecording",
    "socialPost", "blogArticle", "newsletterTemplate", "pressRelease", "contentCalendar",
    "seoKeyword", "adCampaign", "landingPage", "ctaButton", "conversionTracking",
    "affiliateProgram", "referralTracking", "partnerCommission", "dealIncentive", "salesContest",
    "customerReward", "pointsRedemption", "giftCard", "voucherCode", "promotionCampaign",
    "productReview", "ratingSystem", "feedbackForm", "testimonialCollection", "caseStudy",
    "whitePaper", "eBookDownload", "webinarArchive", "videoTutorial", "knowledgeArticle",
    "faqCategory", "helpDesk", "supportAgent", "chatTranscript", "callRecording",
    "emailThread", "messageTemplate", "autoResponse", "outOfOffice", "holidaySchedule",
    "systemUpdate", "patchNote", "versionControl", "bugFix", "featureUpdate",
    "dataExport", "importTemplate", "duplicateCheck", "mergeTool", "recordCleanup",
    "fieldHistory", "auditTrail", "complianceReport", "dataRetention", "privacyPolicy",
    "termsOfService", "userAgreement", "licenseKey", "subscriptionPlan", "billingInvoice",
    "paymentGateway", "refundRequest", "creditMemo", "debitNote", "financialReconciliation",
    "currencyConversion", "exchangeRate", "taxCalculation", "vatReport", "gstCompliance",
    "payrollTax", "employeeDeduction", "benefitPlan", "retirementAccount", "pensionFund",
    "investmentPortfolio", "stockTrade", "bondIssue", "mutualFund", "assetAllocation",
    "loanAgreement", "mortgagePlan", "creditScore", "debtCollection", "bankStatement",
    "cashReceipt", "depositSlip", "withdrawalRequest", "atmTransaction", "onlinePayment",
    "mobileWallet", "digitalCurrency", "blockchainLedger", "smartContract", "tokenization",
    "aiAssistant", "chatbotFlow", "voiceCommand", "naturalLanguage", "sentimentAnalysis",
    "predictiveModel", "dataMining", "patternRecognition", "clusterAnalysis", "regressionTest",
    "simulationRun", "scenarioPlanning", "whatIfAnalysis", "decisionTree", "optimizationModel",
    "resourceScheduler", "capacityPlanning", "demandForecast", "supplyOptimization", "inventoryControl",
    "orderManagement", "shippingLabel", "trackingNumber", "deliveryConfirmation", "returnLabel",
    "productReturn", "warrantyClaim", "repairTicket", "serviceAppointment", "technicianDispatch",
    "fieldService", "remoteSupport", "customerSatisfaction", "netPromoterScore", "feedbackAnalysis",
    "employeeEngagement", "teamPerformance", "goalTracking", "kpiDashboard", "metricReport",
    "dataWarehouse", "etlProcess", "dataLake", "businessIntelligence", "analyticsPlatform",
    "reportScheduler", "dataExport", "importWizard", "dataCleansing", "recordDeletion",
    "backupRestore", "systemUpgrade", "patchManagement", "versionHistory", "releaseNote",
    "userTraining", "onboardingChecklist", "roleAssignment", "permissionSet", "accessReview",
    "securityPolicy", "firewallRule", "intrusionDetection", "malwareScan", "dataBreach",
    "incidentLog", "auditReport", "complianceChecklist", "policyUpdate", "riskRegister",
    "businessImpact", "recoveryPlan", "continuityStrategy", "disasterDrill", "emergencyResponse",
    "crisisManagement", "communicationPlan", "stakeholderUpdate", "projectStatus", "milestoneReview"
];

for(let object of objects){
    
    
    createFields(object);
}

function createFields(object){

    const objectRoot = path.join(__dirname, 'force-app','main', 'default', 'objects',`${object}__c`,'fields');
    if (!fs.existsSync(objectRoot)) {
        fs.mkdirSync(objectRoot, { recursive: true });
    }

    for (let i = 1; i <= 400; i++) {
        const fieldName = `CustomField${i}`;
        const fieldFilePath = path.join(objectRoot, `${fieldName}__c.field-meta.xml`);
    
        // Create the .xml file content
        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
        <CustomField xmlns="http://soap.sforce.com/2006/04/metadata">
            <fullName>${fieldName}__c</fullName>
            <externalId>false</externalId>
            <label>${fieldName}</label>
            <length>50</length>
            <required>false</required>
            <trackTrending>false</trackTrending>
            <type>Text</type>
            <unique>false</unique>
        </CustomField>`;
    
        // Write the .xml file
        fs.writeFileSync(fieldFilePath, xmlContent, 'utf8');
    
        console.log(`Created ${fieldName}`);
    }
}





