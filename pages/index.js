import { setState, useMemo } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import * as Airtable from 'airtable';
import useAirtable from '../components/useAirtable';

export default function Home() {

  const {
    records: opensourceData,
    loading: opensourceLoading,
    error: opensourceError
  } = useAirtable(process.env.NEXT_PUBLIC_FIELD_RESEARCH_BASE_ID, 'Open Source', 'Grid view');

  const {
    records: fieldresearchData,
    loading: fieldresearchLoading,
    error: fieldresearchError
  } = useAirtable(process.env.NEXT_PUBLIC_FIELD_RESEARCH_BASE_ID, 'Field Research', 'Tracking');

  return (
    <div>
      {opensourceLoading && <p>Loading open source data...</p>}
      {fieldresearchLoading && <p>Loading field research data...</p>}
    </div>
  );
}
