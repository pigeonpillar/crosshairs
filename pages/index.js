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

      {!opensourceLoading && <div style={{ width: '250px', display: 'inline-block', verticalAlign: 'top' }}>
        <b>Open Source Data</b>
        {opensourceData.map(record => <div style={{ fontSize: '10px', width: '200px', margin: '10px' }}>{record.fields.description}</div>)}
      </div>}

      {!fieldresearchLoading && <div style={{ width: '250px', display: 'inline-block', verticalAlign: 'top' }}>
        <b>Field Research Data</b>
        {fieldresearchData.map(record => <div style={{ fontSize: '10px', width: '200px', margin: '10px' }}>{record.fields['Description (AR)']}</div>)}
      </div>}

    </div>
  );
}
