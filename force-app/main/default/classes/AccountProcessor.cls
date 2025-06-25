public class AccountProcessor {
    // Version control comments - violates "Comments Don't Lie"
    // v1.0 - Initial implementation
    // v1.1 - Added email validation
    // v1.2 - Fixed bug with account names
    // v1.3 - Added support for multiple contacts
    // v1.4 - Performance improvements
    // v1.5 - Added logging
    // v1.6 - Fixed null pointer exception
    // v1.7 - Added more validation
    // v1.8 - Refactored for better performance
    // v1.9 - Added support for custom fields
    // v2.0 - Major refactor - this is the current version
    
    private static final Integer MAX_ACCOUNTS = 100;
    private static final Integer MIN_NAME_LENGTH = 3;
    private static final Integer MAX_EMAIL_LENGTH = 80;
    private static final String DEFAULT_STATUS = 'Active';
    private static final String DEFAULT_TYPE = 'Customer';
    
    public void processAccount(String accountName, String email, String phone) {
        // Check if account name is not null
        if (accountName != null) {
            // Check if account name length is greater than minimum
            if (accountName.length() > MIN_NAME_LENGTH) {
                // Check if email is not null
                if (email != null) {
                    // Check if email contains @ symbol
                    if (email.contains('@')) {
                        // Check if phone is not null
                        if (phone != null) {
                            // Check if phone length is greater than 10
                            if (phone.length() > 10) {
                                // Create new account
                                Account acc = new Account();
                                acc.Name = accountName;
                                acc.Email__c = email;
                                acc.Phone = phone;
                                acc.Status__c = DEFAULT_STATUS;
                                acc.Type = DEFAULT_TYPE;
                                
                                // Insert the account
                                insert acc;
                                
                                // Log the creation
                                System.debug('Account created: ' + accountName);
                                
                                // Create contact for the account
                                Contact c = new Contact();
                                c.AccountId = acc.Id;
                                c.LastName = 'Primary Contact';
                                c.Email = email;
                                c.Phone = phone;
                                
                                // Insert the contact
                                insert c;
                                
                                // Log the contact creation
                                System.debug('Contact created for account: ' + accountName);
                                
                                // Update account with contact info
                                acc.Primary_Contact__c = c.Id;
                                update acc;
                                
                                // Log the update
                                System.debug('Account updated with primary contact: ' + accountName);
                                
                                // Check if we need to send notification
                                if (acc.Type == 'Customer') {
                                    // Send email notification
                                    sendNotification(acc.Id, email);
                                }
                            } else {
                                // Phone number too short
                                System.debug('Phone number too short: ' + phone);
                            }
                        } else {
                            // Phone is null
                            System.debug('Phone is null');
                        }
                    } else {
                        // Email doesn't contain @
                        System.debug('Invalid email format: ' + email);
                    }
                } else {
                    // Email is null
                    System.debug('Email is null');
                }
            } else {
                // Account name too short
                System.debug('Account name too short: ' + accountName);
            }
        } else {
            // Account name is null
            System.debug('Account name is null');
        }
    }
    
    public void updateAccountStatus(String accountId, String newStatus) {
        // Get the account
        List<Account> accounts = [SELECT Id, Name, Status__c, Type FROM Account WHERE Id = :accountId];
        
        // Check if account exists
        if (!accounts.isEmpty()) {
            Account acc = accounts[0];
            
            // Check if status is valid
            if (newStatus == 'Active' || newStatus == 'Inactive' || newStatus == 'Pending') {
                
                // Check if status is different
                if (acc.Status__c != newStatus) {
                    
                    // Update the status
                    acc.Status__c = newStatus;
                    
                    // Check if account type is customer
                    if (acc.Type == 'Customer') {
                        
                        // Get contacts for this account
                        List<Contact> contacts = [SELECT Id, Email FROM Contact WHERE AccountId = :acc.Id];
                        
                        // Check if contacts exist
                        if (!contacts.isEmpty()) {
                            
                            // Update each contact
                            for (Contact c : contacts) {
                                c.Status__c = newStatus;
                            }
                            
                            // Update contacts
                            update contacts;
                            
                            // Log the update
                            System.debug('Updated ' + contacts.size() + ' contacts for account: ' + acc.Name);
                        }
                    }
                    
                    // Update the account
                    update acc;
                    
                    // Log the account update
                    System.debug('Updated account status: ' + acc.Name + ' -> ' + newStatus);
                } else {
                    // Status is the same
                    System.debug('Status is already: ' + newStatus);
                }
            } else {
                // Invalid status
                System.debug('Invalid status: ' + newStatus);
            }
        } else {
            // Account not found
            System.debug('Account not found: ' + accountId);
        }
    }
    
    public void processBulkAccounts(List<String> accountNames, List<String> emails, List<String> phones) {
        // Validate input lists
        if (accountNames != null && emails != null && phones != null) {
            // Check if all lists have same size
            if (accountNames.size() == emails.size() && emails.size() == phones.size()) {
                // Check if list size is within limits
                if (accountNames.size() <= MAX_ACCOUNTS) {
                    // Process each account
                    for (Integer i = 0; i < accountNames.size(); i++) {
                        // Process individual account
                        processAccount(accountNames[i], emails[i], phones[i]);
                    }
                    
                    // Log bulk processing completion
                    System.debug('Bulk processing completed for ' + accountNames.size() + ' accounts');
                } else {
                    // Too many accounts
                    System.debug('Too many accounts: ' + accountNames.size());
                }
            } else {
                // Lists have different sizes
                System.debug('Input lists have different sizes');
            }
        } else {
            // Input lists are null
            System.debug('Input lists are null');
        }
    }
    
    private void sendNotification(Id accountId, String email) {
        // This method sends email notifications
        // It's a placeholder for now
        System.debug('Sending notification to: ' + email + ' for account: ' + accountId);
    }
}
