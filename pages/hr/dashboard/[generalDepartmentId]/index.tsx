import type { NextPage } from "next";
import { useRouter } from 'next/router';
import GeneralDepartmentListDashboardScreen from "../../../../src/Screens/Dashboard/GeneralDepartmentListDashboardScreen";

const GeneralDepartmentListDashboardPage: NextPage = () => {
  const router = useRouter();
  const { generalDepartmentId } = router?.query;

  return (
    <GeneralDepartmentListDashboardScreen generalDepartmentId={Number(generalDepartmentId)} />
  );
};

export default GeneralDepartmentListDashboardPage;
