import { useRouter } from 'next/router';
import React from 'react';
import { FormCustomerScreen } from '../../../src/Screens/Customer/FormCustomerScreen';

export default function EditCustomerPage() {
  const router = useRouter();
  return <FormCustomerScreen id={Number(router.query.id)} />;
}
