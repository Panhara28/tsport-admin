import type { NextPage } from "next";
import { useRouter } from 'next/router';
import OfficeListDashboardScreen from "../../../../../../../../../src/Screens/Dashboard/OfficeListDashboardScreen";

const DepartmentListDashboardPage: NextPage = () => {
  const router = useRouter();
  const { departmentId, generalDepartmentId, officeId } = router?.query;

  return (
    <OfficeListDashboardScreen departmentId={Number(departmentId)} generalDepartmentId={Number(generalDepartmentId)} officeId={Number(officeId)} />
  );
};

export default DepartmentListDashboardPage;
