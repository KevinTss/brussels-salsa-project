import type { NextPage } from 'next';

import DefaultLayout from '../../components/layouts/DefaultLayout';
import Head from '../../components/head';
import Onboarding from '../../views/onboarding';

const OnboardingPage: NextPage = () => (
  <DefaultLayout>
    <Head />
    <Onboarding />
  </DefaultLayout>
);

export default OnboardingPage;
