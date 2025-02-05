const fs = require('fs');
const path = require('path');

// Define the directory for classes
const projectRoot = path.join(__dirname, 'force-app', 'main', 'default', 'objects');

// Ensure the classes directory exists
if (!fs.existsSync(projectRoot)) {
    fs.mkdirSync(projectRoot, { recursive: true });
}

const customObjectNames = [
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

for (let customObject of customObjectNames) {

    const objectDir = path.join(projectRoot, `${customObject}__c`);
    if (!fs.existsSync(objectDir)) {
        fs.mkdirSync(objectDir, { recursive: true });
    }
    const objectPath = path.join(objectDir, `${customObject}__c.object-meta.xml`);

    // Create the .xml file content
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <CustomObject xmlns="http://soap.sforce.com/2006/04/metadata">
        <actionOverrides>
            <actionName>Accept</actionName>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>Accept</actionName>
            <formFactor>Large</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>Accept</actionName>
            <formFactor>Small</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>CancelEdit</actionName>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>CancelEdit</actionName>
            <formFactor>Large</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>CancelEdit</actionName>
            <formFactor>Small</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>Clone</actionName>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>Clone</actionName>
            <formFactor>Large</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>Clone</actionName>
            <formFactor>Small</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>Delete</actionName>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>Delete</actionName>
            <formFactor>Large</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>Delete</actionName>
            <formFactor>Small</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>Edit</actionName>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>Edit</actionName>
            <formFactor>Large</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>Edit</actionName>
            <formFactor>Small</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>List</actionName>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>List</actionName>
            <formFactor>Large</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>List</actionName>
            <formFactor>Small</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>New</actionName>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>New</actionName>
            <formFactor>Large</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>New</actionName>
            <formFactor>Small</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>SaveEdit</actionName>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>SaveEdit</actionName>
            <formFactor>Large</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>SaveEdit</actionName>
            <formFactor>Small</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>Tab</actionName>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>Tab</actionName>
            <formFactor>Large</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>Tab</actionName>
            <formFactor>Small</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>View</actionName>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>View</actionName>
            <formFactor>Large</formFactor>
            <type>Default</type>
        </actionOverrides>
        <actionOverrides>
            <actionName>View</actionName>
            <formFactor>Small</formFactor>
            <type>Default</type>
        </actionOverrides>
        <allowInChatterGroups>false</allowInChatterGroups>
        <compactLayoutAssignment>SYSTEM</compactLayoutAssignment>
        <deploymentStatus>Deployed</deploymentStatus>
        <enableActivities>false</enableActivities>
        <enableBulkApi>true</enableBulkApi>
        <enableFeeds>false</enableFeeds>
        <enableHistory>false</enableHistory>
        <enableLicensing>false</enableLicensing>
        <enableReports>false</enableReports>
        <enableSearch>false</enableSearch>
        <enableSharing>true</enableSharing>
        <enableStreamingApi>true</enableStreamingApi>
        <externalSharingModel>Private</externalSharingModel>
        <label>${customObject}</label>
        <nameField>
            <label>${customObject} Name</label>
            <type>Text</type>
        </nameField>
        <pluralLabel>${customObject}</pluralLabel>
        <searchLayouts></searchLayouts>
        <sharingModel>ReadWrite</sharingModel>
        <visibility>Public</visibility>
    </CustomObject>
    `

    // Write the .xml file
    fs.writeFileSync(objectPath, xmlContent, 'utf8');

    console.log(`Created ${customObject}__c.object-meta.xml`);

}





