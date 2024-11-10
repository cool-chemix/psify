import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('17547c10-0b07-4f31-8f39-46007a18136d', 'hiranmayi.sarangapani@utdallas.edu', 'Hiranmayi Sarangapani', 'https://i.imgur.com/YfJQV5z.png?id=3', 'ghi789jkl012', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('631eddfb-341e-4c21-adcd-59955dc0d74b', 'maha.shaikh@utdallas.edu', 'Maha Shaikh', 'https://i.imgur.com/YfJQV5z.png?id=21', 'abc123def456', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('67128914-43be-47dc-93af-a965da7375b1', 'bhuvankrishnaa.subramanian@utdallas.edu', 'Bhuvankrishnaa Subramanian', 'https://i.imgur.com/YfJQV5z.png?id=39', 'abc123def456', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('bd92c1b5-4ed7-4125-aac9-88cdbcd2f503', 'chris.mathew@utdallas.edu', 'Chris Mathew', 'https://i.imgur.com/YfJQV5z.png?id=48', 'abc123def456', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('e1a8c8c2-724d-4565-8f8f-2597f79d9da2', 'aniket.joshi@utdallas.edu', 'Aniket Joshi', 'https://i.imgur.com/YfJQV5z.png?id=57', 'abc123def456', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('f4a0716b-8020-4e76-8463-cb6588944be7', 'keshav.kumar@utdallas.edu', 'Keshav Kumar', 'https://i.imgur.com/YfJQV5z.png?id=66', 'yz567abc890', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('daf14a2e-c2c9-4d55-a03c-2646dcbdcdd9', 'sharun.naicker@utdallas.edu', 'Sharun Naicker', 'https://i.imgur.com/YfJQV5z.png?id=75', 'mno345pqr678', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('73ff162b-b424-44ef-b3f3-7fc363e1217e', 'shrey.kulkarni@utdallas.edu', 'Shrey Kulkarni', 'https://i.imgur.com/YfJQV5z.png?id=84', 'abc123def456', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Sponsor" ("id", "name", "type", "contactEmail", "contributionAmount", "renewalDate", "status") VALUES ('5ccf5c19-68a2-4f3d-8596-6519a38c6a8f', 'State Farm', 'Corporate', 'statefarmsponsors@statefarm.com', '10000', '2025-06-18T01:58:49.017Z', 'Active');
INSERT INTO "Sponsor" ("id", "name", "type", "contactEmail", "contributionAmount", "renewalDate", "status") VALUES ('d61605f6-381c-46d1-b7e2-baf79980cab7', 'Verizon', 'Corporate', 'verizonoutreach@verizon.com', '10000', '2025-11-06T06:45:12.164Z', 'Inactive');
INSERT INTO "Sponsor" ("id", "name", "type", "contactEmail", "contributionAmount", "renewalDate", "status") VALUES ('c5c81345-c149-4cfa-bbe9-5071cee44b97', 'Kaye/Bassman', 'NonProfit', 'kbsponsor@kbass.com', '7500', '2024-04-20T06:04:29.839Z', 'Inactive');
INSERT INTO "Sponsor" ("id", "name", "type", "contactEmail", "contributionAmount", "renewalDate", "status") VALUES ('e8301c80-03a0-411f-9068-ead325266096', 'Lennar', 'Foundation', 'lennarhomes@lennar.com', '7500', '2025-02-17T12:16:03.198Z', 'Active');
INSERT INTO "Sponsor" ("id", "name", "type", "contactEmail", "contributionAmount", "renewalDate", "status") VALUES ('1a42b709-1dad-4869-8bc4-3e8f29cad338', 'Toyota', 'Corporate', 'letsgoplaces@toyota.com', '5000', '2025-06-15T23:06:55.466Z', 'Pending');


INSERT INTO "InstallmentPlan" ("id", "totalAmount", "numberOfInstallments", "frequency", "startDate", "userId") VALUES ('d4007b5f-0387-4436-8df9-bf801c781607', '350.00', 4, 'monthly', '2024-10-04', '17547c10-0b07-4f31-8f39-46007a18136d');
INSERT INTO "InstallmentPlan" ("id", "totalAmount", "numberOfInstallments", "frequency", "startDate", "userId") VALUES ('af55a6e6-5b09-47c2-ac46-ad922246d743', '150.00', 2, 'quarterly', '2024-10-09', '17547c10-0b07-4f31-8f39-46007a18136d');
INSERT INTO "InstallmentPlan" ("id", "totalAmount", "numberOfInstallments", "frequency", "startDate", "userId") VALUES ('4991f096-9bad-41c5-b475-e4cd2f9c2ee1', '700.00', 2, 'biannually', '2024-08-22', 'daf14a2e-c2c9-4d55-a03c-2646dcbdcdd9');
INSERT INTO "InstallmentPlan" ("id", "totalAmount", "numberOfInstallments", "frequency", "startDate", "userId") VALUES ('703ab87b-59de-4e36-a8d8-a5ac86928c22', '250.00', 2, 'monthly', '2024-01-09', 'bd92c1b5-4ed7-4125-aac9-88cdbcd2f503');

INSERT INTO "Event" ("id", "name", "description", "date", "budget", "cost", "status", "organizerId") VALUES ('00666df7-b499-495d-add4-4e053ddd74ba', 'Brotherhood Movie Night', 'Come enjoy food and a movie with fellow brothers!', '2024-10-14', '3000', '150', 'Completed', 'bd92c1b5-4ed7-4125-aac9-88cdbcd2f503');
INSERT INTO "Event" ("id", "name", "description", "date", "budget", "cost", "status", "organizerId") VALUES ('1ddb8716-bdab-4d48-9eb8-905b97ce762e', 'Service Event', 'Come support our community at this event!', '2025-10-30', '2000', '200', 'Scheduled', '67128914-43be-47dc-93af-a965da7375b1');
INSERT INTO "Event" ("id", "name", "description", "date", "budget", "cost", "status", "organizerId") VALUES ('0cd9ebc1-118d-49c5-befb-083440ff13a1', 'Meet the Brothers', 'Interact with potential new members of Alpha Kappa Psi!', '2024-02-10', '3000', 'None', 'Scheduled', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Event" ("id", "name", "description", "date", "budget", "cost", "status", "organizerId") VALUES ('992f68b9-2287-4d66-a68a-5012275854db', 'Leadership Workshop', 'A workshop aimed at developing leadership skills.', '2024-08-05', '1500', 'None', 'Completed', '67128914-43be-47dc-93af-a965da7375b1');
INSERT INTO "Event" ("id", "name", "description", "date", "budget", "cost", "status", "organizerId") VALUES ('a6f75118-5d8b-44d2-a326-d5739968ff43', 'Public Speaking Workshop', 'A workshop meant for public speaking.', '2024-12-02', '5000', 'None', 'Scheduled', 'f4a0716b-8020-4e76-8463-cb6588944be7');
INSERT INTO "Event" ("id", "name", "description", "date", "budget", "cost", "status", "organizerId") VALUES ('477ee1f1-b4e7-45e8-b3c7-9392777d81a4', 'Resume Review', 'Bring 3 to 4 copies of your resume for review!', '2025-07-28', '3000', 'None', 'Scheduled', 'e1a8c8c2-724d-4565-8f8f-2597f79d9da2');
INSERT INTO "Event" ("id", "name", "description", "date", "budget", "cost", "status", "organizerId") VALUES ('b12d179f-33e4-4b40-bdfb-3863befbbef3', 'Networking Mixer', 'Meet with our corporate sponsors and recruiters!', '2024-02-16', '3000', '350', 'Completed', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "FundraisingCampaign" ("id", "name", "description", "goal", "currentAmount", "startDate", "endDate", "status") VALUES ('e3e19f9f-c429-41ea-8991-04d405882daf', 'Canned Food Drive', 'Chapter initiative to purchase canned goods.', '450', '150', '2023-11-22', '2025-08-29', 'In Progress');
INSERT INTO "FundraisingCampaign" ("id", "name", "description", "goal", "currentAmount", "startDate", "endDate", "status") VALUES ('20ec1e79-7c11-4c76-88da-04ac7f5b6141', 'Basketball Tournament with DSP', 'Meant to support on-campus org. Vibha', '1000', '850', '2025-03-06', '2024-06-03', 'In Progress');
INSERT INTO "FundraisingCampaign" ("id", "name", "description", "goal", "currentAmount", "startDate", "endDate", "status") VALUES ('b0dbe3c8-a88a-4217-98f9-b1d3f7a18cad', 'Community Outreach Initiative', 'Drive to fund clean-up in downtown Dallas', '750', '425', '2024-12-30', '2025-08-30', 'In Progress');
INSERT INTO "FundraisingCampaign" ("id", "name", "description", "goal", "currentAmount", "startDate", "endDate", "status") VALUES ('3dba0079-deac-4132-bcf8-36413b95dda1', 'Youth Outreach Initiative', 'Donations meant to buy supplies in elementary schools.', '600', '240', '2024-12-05', '2024-10-24', 'In Progress');

INSERT INTO "MemberRole" ("id", "role", "userId", "assignedById") VALUES ('dbbdc47f-fb51-494e-8be9-afa460137aca', 'Treasurer', '73ff162b-b424-44ef-b3f3-7fc363e1217e', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "MemberRole" ("id", "role", "userId", "assignedById") VALUES ('5044f65d-fb1c-46fe-9920-8d7bc78aafb6', 'President', '17547c10-0b07-4f31-8f39-46007a18136d', 'daf14a2e-c2c9-4d55-a03c-2646dcbdcdd9');
INSERT INTO "MemberRole" ("id", "role", "userId", "assignedById") VALUES ('66655ea6-b2b0-42c8-bea5-7e9ffb8f678d', 'Treasurer', '17547c10-0b07-4f31-8f39-46007a18136d', '8248b44a-d90e-4e69-a439-e76b4d8da5e9');
INSERT INTO "MemberRole" ("id", "role", "userId", "assignedById") VALUES ('1b91f741-e9f9-4299-9889-1191b600408e', 'Fundraising Chair', 'bd92c1b5-4ed7-4125-aac9-88cdbcd2f503', 'f4a0716b-8020-4e76-8463-cb6588944be7');
INSERT INTO "MemberRole" ("id", "role", "userId", "assignedById") VALUES ('27449d82-61bc-433d-b56c-918f2494e784', 'Treasurer', '73ff162b-b424-44ef-b3f3-7fc363e1217e', 'f4a0716b-8020-4e76-8463-cb6588944be7');
INSERT INTO "MemberRole" ("id", "role", "userId", "assignedById") VALUES ('c05a4025-5478-467d-ac31-54c0c0aed87b', 'Treasurer', 'bd92c1b5-4ed7-4125-aac9-88cdbcd2f503', '631eddfb-341e-4c21-adcd-59955dc0d74b');
INSERT INTO "MemberRole" ("id", "role", "userId", "assignedById") VALUES ('7d52996e-2eb5-41a8-bd31-812e70697a55', 'Treasurer', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'bd92c1b5-4ed7-4125-aac9-88cdbcd2f503');
INSERT INTO "MemberRole" ("id", "role", "userId", "assignedById") VALUES ('9e13e669-333c-40a7-9fe7-8184b4481506', 'President', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'daf14a2e-c2c9-4d55-a03c-2646dcbdcdd9');
INSERT INTO "MemberRole" ("id", "role", "userId", "assignedById") VALUES ('602dbc33-662f-4cf0-977f-e41c6c529a35', 'Secretary', 'daf14a2e-c2c9-4d55-a03c-2646dcbdcdd9', 'f4a0716b-8020-4e76-8463-cb6588944be7');
INSERT INTO "MemberRole" ("id", "role", "userId", "assignedById") VALUES ('22340e3f-9175-4b70-95e0-fd9e7726690b', 'Secretary', '73ff162b-b424-44ef-b3f3-7fc363e1217e', '631eddfb-341e-4c21-adcd-59955dc0d74b');

INSERT INTO "Payment" ("id", "amount", "status", "type", "dueDate", "paymentMethod", "userId", "installmentPlanId") VALUES ('4b7c791b-a3b9-4748-912e-7254582ae240', '20.00', 'completed', 'donation', '2024-03-20', 'Zelle', 'f4a0716b-8020-4e76-8463-cb6588944be7', 'd4007b5f-0387-4436-8df9-bf801c781607');
INSERT INTO "Payment" ("id", "amount", "status", "type", "dueDate", "paymentMethod", "userId", "installmentPlanId") VALUES ('18664549-fe9d-426d-a4b5-649874c15b65', '150.00', 'completed', 'dues', '2025-06-22', 'Paypall', 'f4a0716b-8020-4e76-8463-cb6588944be7', '4d9417b2-375e-42d1-9c27-1d4e892faee9');
INSERT INTO "Payment" ("id", "amount", "status", "type", "dueDate", "paymentMethod", "userId", "installmentPlanId") VALUES ('36c0b768-5505-46d6-a788-32855dd75abb', '75.00', 'partial', 'dues', '2025-06-19', 'Stripe', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '08ff5434-2571-49f7-b42a-7c77fea6f502');
INSERT INTO "Payment" ("id", "amount", "status", "type", "dueDate", "paymentMethod", "userId", "installmentPlanId") VALUES ('1465e611-b12c-4134-902c-17904163c27a', '200.00', 'completed', 'donation', '2024-05-27', 'Venmo', '631eddfb-341e-4c21-adcd-59955dc0d74b', '703ab87b-59de-4e36-a8d8-a5ac86928c22');
INSERT INTO "Payment" ("id", "amount", "status", "type", "dueDate", "paymentMethod", "userId", "installmentPlanId") VALUES ('533270bc-44aa-463b-a329-657603ca31ca', '1000.00', 'pending', 'sponsorship', '2025-03-23', 'Bank Transfer', '8248b44a-d90e-4e69-a439-e76b4d8da5e9', '7d27d126-84e7-4f91-a969-835f6cdbc2ba');
INSERT INTO "Payment" ("id", "amount", "status", "type", "dueDate", "paymentMethod", "userId", "installmentPlanId") VALUES ('64b6849a-e258-4b94-9e70-1ef89bd1cbac', '350.00', 'completed', 'pledge dues', '2025-03-27', 'PayPal', 'bd92c1b5-4ed7-4125-aac9-88cdbcd2f503', '8c4853d0-3682-41db-b6d2-31c77c8fef19');


INSERT INTO "EventRegistration" ("id", "amountPaid", "eventId", "userId", "splitWithId") VALUES ('bd9ce6c1-18ea-46c5-811e-f73cc6b379d5', '50.00', '275bc68a-b3ad-4e18-a412-06d87387603c', '631eddfb-341e-4c21-adcd-59955dc0d74b', '17547c10-0b07-4f31-8f39-46007a18136d');
INSERT INTO "EventRegistration" ("id", "amountPaid", "eventId", "userId", "splitWithId") VALUES ('538add55-9aba-4b75-8403-882d0f52ba7a', '25.00', '1ddb8716-bdab-4d48-9eb8-905b97ce762e', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'e1a8c8c2-724d-4565-8f8f-2597f79d9da2');
INSERT INTO "EventRegistration" ("id", "amountPaid", "eventId", "userId", "splitWithId") VALUES ('3028fec8-a5ac-42f7-a7d0-d0d57d95adfa', '25.00', '0cd9ebc1-118d-49c5-befb-083440ff13a1', 'daf14a2e-c2c9-4d55-a03c-2646dcbdcdd9', '8248b44a-d90e-4e69-a439-e76b4d8da5e9');
INSERT INTO "EventRegistration" ("id", "amountPaid", "eventId", "userId", "splitWithId") VALUES ('c9e620ac-2b79-4368-bcef-dace037f22df', '60.00', 'fc3cc5b4-f10b-4c85-b94c-d6da63d14243', '8248b44a-d90e-4e69-a439-e76b4d8da5e9', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "EventRegistration" ("id", "amountPaid", "eventId", "userId", "splitWithId") VALUES ('c38f0cd7-b1cf-4b6c-86ed-9e738f8e5ae2', '25.00', '0cd9ebc1-118d-49c5-befb-083440ff13a1', 'f4a0716b-8020-4e76-8463-cb6588944be7', 'f4a0716b-8020-4e76-8463-cb6588944be7');
INSERT INTO "EventRegistration" ("id", "amountPaid", "eventId", "userId", "splitWithId") VALUES ('d956e054-bb5e-43bb-84de-eb7c93f664c0', '75.00', '1ddb8716-bdab-4d48-9eb8-905b97ce762e', '8248b44a-d90e-4e69-a439-e76b4d8da5e9', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "EventRegistration" ("id", "amountPaid", "eventId", "userId", "splitWithId") VALUES ('7a318333-2441-4dbc-989e-b919d5d1e79d', '75.00', '275bc68a-b3ad-4e18-a412-06d87387603c', '17547c10-0b07-4f31-8f39-46007a18136d', 'e1a8c8c2-724d-4565-8f8f-2597f79d9da2');
INSERT INTO "EventRegistration" ("id", "amountPaid", "eventId", "userId", "splitWithId") VALUES ('4dc1063a-a5c3-4465-a50b-ae6279ae268b', '75.00', '477ee1f1-b4e7-45e8-b3c7-9392777d81a4', 'bd92c1b5-4ed7-4125-aac9-88cdbcd2f503', '17547c10-0b07-4f31-8f39-46007a18136d');
INSERT INTO "EventRegistration" ("id", "amountPaid", "eventId", "userId", "splitWithId") VALUES ('3e9bd683-4d10-4cfc-9415-dbdcc60a2393', '75.00', '1ddb8716-bdab-4d48-9eb8-905b97ce762e', '73ff162b-b424-44ef-b3f3-7fc363e1217e', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "EventRegistration" ("id", "amountPaid", "eventId", "userId", "splitWithId") VALUES ('ccd288e6-fef0-4fa2-aa03-1b3ca9eae633', '25.00', 'a173b196-c4b1-497d-8241-e929ce1b0eb0', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '67128914-43be-47dc-93af-a965da7375b1');

INSERT INTO "ExpenseRequest" ("id", "amount", "description", "category", "receiptUrl", "status", "userId", "approvedById") VALUES ('984555e5-f3bd-4fc6-b812-047f5ae80720', '75.00', 'Brotherhood Event', 'Brotherhood', 'https://i.imgur.com/YfJQV5z.png?id=464', 'Approved', '73ff162b-b424-44ef-b3f3-7fc363e1217e', '67128914-43be-47dc-93af-a965da7375b1');
INSERT INTO "ExpenseRequest" ("id", "amount", "description", "category", "receiptUrl", "status", "userId", "approvedById") VALUES ('47b49083-f3ee-42e7-8f5b-5bb944f00199', '25.00', 'Food expenses', 'Personal', 'https://i.imgur.com/YfJQV5z.png?id=470', 'Rejected', 'f4a0716b-8020-4e76-8463-cb6588944be7', '67128914-43be-47dc-93af-a965da7375b1');
INSERT INTO "ExpenseRequest" ("id", "amount", "description", "category", "receiptUrl", "status", "userId", "approvedById") VALUES ('a6cb96a3-3d58-424c-94e4-f0f81c91a0a2', '455.00', 'Catering for event', 'Brotherhood', 'https://i.imgur.com/YfJQV5z.png?id=476', 'Approved', '8248b44a-d90e-4e69-a439-e76b4d8da5e9', '17547c10-0b07-4f31-8f39-46007a18136d');
INSERT INTO "ExpenseRequest" ("id", "amount", "description", "category", "receiptUrl", "status", "userId", "approvedById") VALUES ('5b01a5d4-3586-48af-8627-fa152dc4b3f1', '250.00', 'Unity Dinner, 'Pledge Rush', 'https://i.imgur.com/YfJQV5z.png?id=482', 'Under Review', 'f4a0716b-8020-4e76-8463-cb6588944be7', '17547c10-0b07-4f31-8f39-46007a18136d');

INSERT INTO "Transaction" ("id", "amount", "type", "status", "reference", "userId") VALUES ('45bb8731-c604-4716-a272-7a06e126b4a0', '75.00', 'dues', 'refunded', 'c6988c8c-ed88-4581-8a5f-7afe5eeb24c6', '73ff162b-b424-44ef-b3f3-7fc363e1217e');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "reference", "userId") VALUES ('55c7c5a9-d58c-4073-a3a3-e1a49713f988', '200.00', 'donation', 'refunded', 'e63af4ba-4a3b-438b-bb53-66481c1ba110', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "reference", "userId") VALUES ('2f5d15d6-b814-4ddc-9d0f-2c80b2acc075', '150.25', 'dues', 'failed', '29c86e02-31d6-4a4e-b366-608bfa5a81cc', '73ff162b-b424-44ef-b3f3-7fc363e1217e');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "reference", "userId") VALUES ('7a0c96c6-d513-410d-8212-770f7b206b03', '50.00', 'event fee', 'in process', '1919dd50-1efb-483b-a1cb-c7843c38186d', '17547c10-0b07-4f31-8f39-46007a18136d');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "reference", "userId") VALUES ('da66e129-09bc-4701-9444-62b555f7ca10', '200.00', 'dues', 'refunded', 'f96a9c13-3195-448d-9590-42ff875a1571', 'bd92c1b5-4ed7-4125-aac9-88cdbcd2f503');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "reference", "userId") VALUES ('2ef5a68c-f82e-4a22-a7f5-d545a444072c', '200.00', 'dues', 'completed', 'e00ccdd0-b0a0-499e-abea-cd65530546eb', '17547c10-0b07-4f31-8f39-46007a18136d');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "reference", "userId") VALUES ('b6cbf53a-686c-402b-8352-d2e83ecd8d73', '100.00', 'sponsorship', 'pending', '6e96c054-fd17-4bdc-97c5-269bdf1c7b3b', '73ff162b-b424-44ef-b3f3-7fc363e1217e');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "reference", "userId") VALUES ('7c25f477-4d83-4d5b-9bae-0b0ebdf561b3', '150.25', 'dues', 'in process', 'f854a4bd-2d3c-4d8e-8b87-a39d89859a58', 'daf14a2e-c2c9-4d55-a03c-2646dcbdcdd9');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "reference", "userId") VALUES ('827765c8-fada-4785-8c98-f96bbc8901ed', '100.00', 'event fee', 'failed', '376a6785-1c0e-4aab-be46-897f45595a32', 'f4a0716b-8020-4e76-8463-cb6588944be7');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "reference", "userId") VALUES ('b3042de5-ecde-4c69-9710-80967a5cc9f1', '150.25', 'event fee', 'failed', 'abf19957-fe8a-45fa-a407-456044390c6d', '73ff162b-b424-44ef-b3f3-7fc363e1217e');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
