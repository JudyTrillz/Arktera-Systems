export interface AssessmentNotification {
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  website: string;
  businessLocation: string;
  industry: string;
  description: string;
  primaryServices: string;
  idealCustomers: string;
  areasServed: string;
  challenges: string[];
  otherChallenge?: string;
  goals: string[];
  otherGoal?: string;
  additionalInfo?: string;
}
