import type { NextPage } from 'next';

import DefaultLayout from '../../components/layouts/DefaultLayout';
import Head from '../../components/head';
import SettingsView from '../../views/settings';

const SettingsPage: NextPage = () => (
  <DefaultLayout>
    <Head />
    <SettingsView />
  </DefaultLayout>
);

export default SettingsPage;
