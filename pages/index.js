import { setState, useMemo, useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import * as Airtable from 'airtable';
import useAirtable from '../components/useAirtable';
import { Map } from '../components/Map';

export default function Home() {

  const mapRef = useRef(null);

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
      {opensourceLoading && <p style={{ zIndex: 1000, position: 'absolute', top: 0, left: 0 }}>Loading open source data...</p>}
      {fieldresearchLoading && <p style={{ zIndex: 1000, position: 'absolute', top: '15px', left: 0 }}>Loading field research data...</p>}

      {/* {false && !opensourceLoading && <div style={{ width: '250px', display: 'inline-block', verticalAlign: 'top' }}>
        <b>Open Source Data</b>
        {opensourceData.map(record => <div key={record.id} style={{ fontSize: '10px', width: '200px', margin: '10px' }}>{record.fields.description}</div>)}
      </div>}

      {false && !fieldresearchLoading && <div style={{ width: '250px', display: 'inline-block', verticalAlign: 'top' }}>
        <b>Field Research Data</b>
        {fieldresearchData.map(record => <div key={record.id} style={{ fontSize: '10px', width: '200px', margin: '10px' }}>{record.fields['Description (AR)']}</div>)}
      </div>} */}

      <Map
        mapRef={mapRef}
        data={opensourceLoading ? {} : { opensourceData }}
      />

    </div>
  );
}
