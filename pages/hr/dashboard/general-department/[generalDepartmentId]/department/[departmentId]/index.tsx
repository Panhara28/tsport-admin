import type { NextPage } from "next";
import { useRouter } from 'next/router';
import DepartmentListDashboardScreen from "../../../../../../../src/Screens/Dashboard/DepartmentListDashboardScreen";

const DepartmentListDashboardPage: NextPage = () => {
  const router = useRouter();
  const { departmentId, generalDepartmentId } = router?.query;

  return (
    <DepartmentListDashboardScreen departmentId={Number(departmentId)} generalDepartmentId={Number(generalDepartmentId)} />
  );
};

export default DepartmentListDashboardPage;
