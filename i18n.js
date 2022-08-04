module.exports = {
  locales: ['en-US', 'kh'],
  defaultLocale: 'kh',
  pages: {
    '*': ['common'],
    '/': ['dashboard'],
    '/hr/dashboard/general-department/[generalDepartmentId]': ['dashboard'],
    '/hr/dashboard/general-department/[generalDepartmentId]/department/[departmentId]': ['dashboard'],
    '/hr/dashboard/general-department/[generalDepartmentId]/department/[departmentId]/office/[officeId]': ['dashboard'],
    '/hr/general-departments/create': ['general_departments'],
    '/hr/general-departments/[hrDepartmentId]/edit': ['general_departments'],
  },
};
