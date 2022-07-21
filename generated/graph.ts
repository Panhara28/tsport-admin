/* eslint-disable */
export declare namespace Graph {
  export interface Query {
    activityLogsList?: null | ActivityLogsList;
    activityLogsNews?: null | ActivityLogsNewsList;
    activityLogsOptions?: ActivityLogsOptions[] | null;
    me?: null | Me;
    adminMe?: null | Me;
    testing?: null | string;
    hrDepartmentList?: null | any;
    hrDepartment?: null | HrDepartment;
    hrDepartmentUsersCount?: null | any;
    hrEmployeeList?: null | HrEmployeeList;
    hrEmployee?: null | HrEmployee;
    playgroundList?: null | PlaygroundList;
    employeeReport?: null | EmployeeReportList;
    roleList?: null | RoleList;
    role?: null | Role;
    adminRoleList?: null | RoleList;
    hasRole?: null | Role;
    adminHasRole?: null | Role;
    roleDetail?: null | Role;
    superAdminList?: null | SuperAdminList;
    superAdmin?: null | SuperAdminList;
    adminUserList?: null | UserList;
    adminUserDetail?: null | User;
    userList?: null | UserList;
    userDetail?: null | User;
  }

  export interface FilterActivityLogs {
    type?: null | string;
  }

  export interface ActivityLogsOptions {
    type?: null | string;
  }

  export interface ActivityLogsNewsList {
    data?: ActivityLogsNews[] | null;
    pagination?: null | Pagination;
  }

  export interface ActivityLogsNews {
    id?: null | number;
    type?: null | string;
    user_id?: null | number;
    activity?: null | any;
    user?: null | User;
  }

  export interface ActivityLogsList {
    data?: ActivityLogs[] | null;
    pagination?: null | Pagination;
  }

  export interface ActivityLogs {
    id?: null | number;
    type?: null | string;
    user_id?: null | number;
    activity?: null | any;
    user?: null | User;
  }

  export interface Mutation {
    signIn?: null | Token;
    signOut?: null | boolean;
    signInSuperAdmin?: null | Token;
    signOutSuperAdmin?: null | boolean;
    changePassword?: null | boolean;
    testing?: null | boolean;
    createHrDepartment?: null | number;
    updateHrDepartment?: null | boolean;
    updateHrEmployee?: null | boolean;
    createHrEmployee?: null | number;
    updateHrEmployeeStatus?: null | boolean;
    createPlayground: number;
    createRole?: null | number;
    updateRole?: null | boolean;
    roleManageAccess?: null | boolean;
    adminAssignRoleToUser?: null | boolean;
    createSuperAdmin?: null | number;
    updateSuperAdmin?: null | boolean;
    singleUpload: UploadedFile;
    adminCreateUser: number;
    adminUpdateUser?: null | boolean;
    createUser: number;
    updateUser?: null | boolean;
  }

  export interface SignInInput {
    username: string;
    password: string;
  }

  export interface Token {
    token?: null | string;
  }

  export interface Me {
    id?: null | number;
    username?: null | string;
    fullname?: null | string;
    profilePicture?: null | string;
    roleName?: null | string;
    contact_district?: null | string;
    contact_commune?: null | string;
    contact_city_or_province?: null | string;
    contact_village?: null | string;
    phoneNumber?: null | string;
    email?: null | string;
    roleId?: null | number;
  }

  export interface Subscription {
    testing?: null | string;
  }

  export interface PaginationInput {
    page?: null | number;
    size?: null | number;
  }

  export interface Pagination {
    total?: null | number;
    size?: null | number;
    current?: null | number;
  }

  export interface HrDepartmentUsersCountFilter {
    parent_id?: null | number;
    type?: null | HrDepartmentUsersCountEnum;
  }

  export type HrDepartmentUsersCountEnum = 'DEPARTMENT' | 'OFFICE' | 'GENERAL_DEPARTMENT';

  export interface HrDepartmentList {
    data?: HrDepartment[] | null;
  }

  export interface HrDepartment {
    id?: null | number;
    name?: null | string;
    parent_id?: null | number;
  }

  export interface HrDepartmentInput {
    name?: null | string;
    parent_id?: null | number;
  }

  export interface HrEmployee {
    id?: null | number;
    username?: null | string;
    fullname?: null | string;
    fullname_en?: null | string;
    profile?: null | string;
    phoneNumber?: null | string;
    status?: null | boolean;
    email?: null | string;
    gender?: null | string;
    nationality?: null | string;
    dob?: null | string;
    district?: null | string;
    commune?: null | string;
    education_level?: null | string;
    passport_id?: null | string;
    national_id?: null | string;
    position_level?: null | string;
    position_description?: null | string;
    unit?: null | string;
    department_id?: null | number;
    general_department_id?: null | number;
    contact_city_or_province?: null | string;
    province?: null | string;
    homeNo?: null | string;
    streetNo?: null | string;
    village_or_group?: null | string;
    contact_district?: null | string;
    contact_village?: null | string;
    contact_commune?: null | string;
    officer_id?: null | string;
    office_id?: null | number;
  }

  export interface HrEmployeeInput {
    username?: null | string;
    fullname?: null | string;
    password?: null | string;
    fullname_en?: null | string;
    profile?: null | string;
    phoneNumber?: null | string;
    email?: null | string;
    gender?: null | string;
    nationality?: null | string;
    dob?: null | string;
    district?: null | string;
    commune?: null | string;
    education_level?: null | string;
    passport_id?: null | string;
    national_id?: null | string;
    position_level?: null | string;
    position_description?: null | string;
    unit?: null | string;
    department_id?: null | number;
    general_department_id?: null | number;
    contact_city_or_province?: null | string;
    province?: null | string;
    homeNo?: null | string;
    streetNo?: null | string;
    village_or_group?: null | string;
    contact_district?: null | string;
    contact_village?: null | string;
    contact_commune?: null | string;
    officer_id?: null | string;
    office_id?: null | number;
  }

  export interface HrEmployeeList {
    data?: HrEmployee[] | null;
    pagination?: null | Pagination;
  }

  export interface Playground {
    id?: null | number;
    title?: null | string;
  }

  export interface PlaygroundList {
    data?: Playground[] | null;
  }

  export interface PlaygroundInput {
    title?: null | string;
  }

  export interface EmployeeReportList {
    data?: HrEmployee[] | null;
    pagination?: null | Pagination;
  }

  export interface EmployeeReportFilter {
    all?: null | string;
    officerName?: null | string;
    generalDepartmentId?: null | number;
    departmentId?: null | number;
    officeId?: null | number;
  }

  export interface RoleList {
    data?: Role[] | null;
    permission?: null | RolePermission;
  }

  export interface Role {
    id?: null | number;
    name?: null | string;
    access?: null | RoleAccess;
  }

  export interface RoleAccess {
    read?: null | boolean;
    write?: null | boolean;
    modify?: null | boolean;
    delete?: null | boolean;
  }

  export interface RoleInput {
    name?: null | string;
  }

  export interface RolePermission {
    isCreated?: null | boolean;
    isModified?: null | boolean;
    isRemove?: null | boolean;
    isList?: null | boolean;
    isDetail?: null | boolean;
  }

  export interface RolePermissionInput {
    isCreated?: null | boolean;
    isModified?: null | boolean;
    isRemove?: null | boolean;
    isList?: null | boolean;
    isDetail?: null | boolean;
  }

  export interface SuperAdminList {
    data?: SuperAdmin[] | null;
  }

  export interface SuperAdmin {
    id?: null | number;
    username?: null | string;
    fullname?: null | string;
  }

  export interface SuperAdminInput {
    username?: null | string;
    password?: null | string;
    fullname?: null | string;
  }

  export interface UploadedFile {
    filename: string;
    url: string;
    fileSize: string;
    mimetype: string;
    width: string;
    height: string;
  }

  export interface User {
    id?: null | number;
    fullname?: null | string;
    username?: null | string;
    email?: null | string;
    phoneNumber?: null | string;
    profile_picture?: null | string;
  }

  export interface UserList {
    data?: User[] | null;
    pagination?: null | Pagination;
  }

  export interface UserInput {
    fullname?: null | string;
    username?: null | string;
    password?: null | string;
    email?: null | string;
    phoneNumber?: null | string;
    profile_picture?: null | string;
  }

  export type UserGender = 'MALE' | 'FEMALE';
}
