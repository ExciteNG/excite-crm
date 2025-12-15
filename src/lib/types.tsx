export interface BaseResponse<T> {
  data: T;
  totalPages?: number;
  pageSize?: number;
  currentPage?: number;
  totalDocuments?: number;
  count?: number;
  token?: string;
  message: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  team: Team;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface VerifyRequest {
  confirmationCode: string;
}

export interface UserData {
  cookie: string;
  token: string;
  user: UserProfile;
}
export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
  provider: string;
  team: Team;
  isVerified: boolean;
  externalUserProfile?: ExternalUserProfile;
}

export interface ExternalUserProfile {
  functions: ("Researcher" | "Location Manager" | "Supervisor")[];
  researchers: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  }[];
}

export interface ProspectData {
  fullName: string;
  email: string;
  company?: string;
  jobTitle?: string;
  contact?: string;
  linkedIn?: string;
  location?: string;
  source?: string;
  industry?: string;
  status?: "New" | "Contacted" | "Qualified" | "Converted" | "Unqualified";
  sector?: string;
}
export interface PartnerData {
  fullName: string;
  email: string;
  phoneNumber?: string;
  institution?: string;
  department?: string;
  level?: string;
  preferredRewardType?: string;
  consent: boolean;
}

export interface SubscribersData {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  platform: string;
  userType: UserType;
  sector: string;
  subSector: string;
  isSubscribed: boolean;
  provider: string;
  profile: SubscriberProfile;
}
export interface AddSubscribersData {
  fullName: string;
  email: string;
  phoneNumber?: string;
  platform: string;
  userType: UserType;
  sector?: string;
  subSector: string;
  isSubscribed?: boolean;
  provider?: string;
  profile: SubscriberProfile;
}

export interface SubscriberProfile {
  company?: string;
  position?: string;
  linkedIn?: string;
  location?: string;
  source?: string;
  industry?: string;
  status?: "New" | "Contacted" | "Pending" | "Converted";
  partnersCategory?: string;
  usersCategory?: string;
  handle?: string;
  primaryPlatform?: string;
  profileLink?: string;
  contentStyle?: string;
  niche?: string;
}

export interface ApiRes {
  message: string;
  data: OverviewResponse;
}

export interface OverviewResponse {
  emailList: OverviewData[];
  noOfNewsteonSubscribers: number;
  noOfPollteonSubcribers: number;
  noOfSurveytseonSubcribers: number;
  noOfTeonengineSubscribers: number;
  noOfTotalSubscribers: number;
  noOfTrendteonSubscribers: number;
}

export interface OverviewData {
  _id: string;
  email: string;
  sector: string;
  subSector: string;
  provider: string;
  isSubscribed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type SectionType = {
  image?: string;
  content?: string;
};

export type TemplateProps = {
  id?: string;
  subject: string;
  message: string;
  image?: string;
  content?: string;
  link?: string;
  template?: string;
  banner?: string;
  description?: string;
  hotPicks?: HotPicks[];
  stockData?: StockData;
  sections?: SectionType[];
  economicReport?: EconomicReport[];
  podcastVlog?: PodcastVlogs[];
  masthead?: string;
  attachemntUrl?: string;
  // masthead?: "chevron" | "promasidor" | "shoreline" | "nestlé";
};

export type StockData = {
  stock_market: {
    all_share_index?: string;
    percentage?: string;
    volume?: string;
    value_traded?: string;
    transaction?: string;
  };
  crude_oil: { wti_oil?: string; brent_oil?: string };
  commodity: {
    gold?: string;
    platinum?: string;
    silver?: string;
    coal?: string;
    uranium?: string;
    lead?: string;
    iron_ore?: string;
  };
};

export type HotPicks = {
  title?: string;
  description?: string;
  image?: string;
  link?: string;
};

export type Attendee = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  organization?: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  eventType: string;
  __v: number;
};

export type EconomicReport = {
  description?: string;
  issueType?: string;
  duration?: string;
  geography?: string;
  coverage?: string;
};

export type PodcastVlogs = {
  title?: string;
  description?: string;
  banner?: string;
  link?: string;
};

export type Query = {
  provider?: string;
  sector?: string;
  platform?: string;
  userType?: string;
  institution?: string;
  isSubscribed?: boolean;
};
export type ProspectQuery = {
  page?: number;
  status?: string;
};

export type ReportData = {
  _id?: string;
  sector: string;
  prospect: string;
  status: "Not Engaged" | "Engaged" | "Engaged, Advanced Discussion";
  newDevelopments: string[];
  priority: "Low" | "Medium" | "High";
  nextActions: string[];
  responsibility: string;
  dates: string[];
};

export type ScoreCardData = {
  _id?: string;
  focus: string;
  target: string;
  sets: string[];
  achieved?: string[];
  performanceComments?: string[];
};

export type ScheduleDemoData = {
  _id?: string;
  title: string;
  description: string;
  meetingType: MeetingsTypeEnum;
  firstName: string;
  lastName?: string;
  email: string;
  moderators?: string[];
  members?: string[];
  startAt?: Date | string;
  endAt?: Date | string;
  timezone: string;
  meetingLink?: string;
};

export interface ActivityRequest {
  activityId?: string;
  activityDate: Date;
  startTime: string;
  endTime: string;
  description: string;
  status?: "initiated" | "ongoing" | "done" | "cancelled";
  cancelReason?: string;
}
export interface ProjectActivityData {
  _id: string;
  activityName: string;
  criticalSteps: ProjectCriticalStepData[];
  location: string;
  startDate: string;
  endDate: string;
  status: "Yet to Commence" | "Ongoing" | "Completed";
  timeTrack: "Earlier" | "onSchedule" | "overDue" | "";
  lastUpdatedBy: string;
  updatedStartDate: string;
  updatedEndDate: string;
  createdBy: string;
  updatedBy: string;
}
export interface ProjectCriticalStepData {
  _id: string;
  criticalStep: string;
  projectActivityId: string;
  stakeholder: string;
  responsibility: string[];
  dependency: string;
  isDone: boolean;
}

export interface FieldReportData {
  _id: string;
  summary: string;
  dateInitiated: string;
  currentStatus: string;
  completionSummary: string;
  videoLink?: string;
  videoLinks?: string[];
  images?: string[];
  documents?: string[];
  location: string;
  locationManagerComment?: string;
  supervisorComment?: string;
  createdBy: {
    firstName: string;
    lastName: string;
    _id: string;
  };
}

export type Metric = {
  _id: string;
  subject: string;
  type: "Prospect" | "Lead" | "Existing Client";
  activity: string;
  actions: string;
  delivery: "Achieved" | "In the Works" | "Not Done";
};

export enum Team {
  TEONENGIN = "teonengine",
  PRECISE = "precise",
  EXCITE = "excite",
}

export enum UserType {
  USERS = "Users",
  PROSPECTS = "Prospects",
  PARTNERS = "Partners",
  INFLUENCER = "Influencer",
}

export enum Roles {
  USER = "user",
  ADMIN = "admin",
  EXTERNAL = "external",
}

export enum MeetingsTypeEnum {
  INSTANT = "instant",
  FUTURE = "future",
  REOCCURRING = "reoccurring",
}

export enum FunctionTypes {
  RESEARCHER = "researcher",
  LOCATION_MANAGER = "location_manager",
  SUPERVISOR = "supervisor",
}
