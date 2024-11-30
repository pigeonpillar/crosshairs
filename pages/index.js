import { setState, useMemo, useRef } from 'react';
import Head from 'next/head';
import * as Airtable from 'airtable';

import useAirtable from '../components/useAirtable';
import { fetchAirtable } from '../utils/fetch';
import { Map } from '../components/Map';
import styles from '../styles/Home.module.css';

export async function getStaticProps() {

  const [opensourceData, fieldresearchData] = await Promise.all([
    fetchAirtable(process.env.NEXT_PUBLIC_FIELD_RESEARCH_BASE_ID, 'Open Source'),
    fetchAirtable(process.env.NEXT_PUBLIC_FIELD_RESEARCH_BASE_ID, 'Field Research'),
  ]);

  return {
    props: {
      opensourceData,
      fieldresearchData,
    },
    revalidate: 10,
  };
}


export default function Home({
  opensourceData,
  fieldresearchData
}) {

  const mapRef = useRef(null);

  console.log(opensourceData);

  /*

    // alternative method for fetching airtable data
  
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
  
    const spatialData = {
      opensourceData:
      {
        loading: opensourceLoading,
        spatial: true,
        temporal: true,
        data: opensourceData,
      },
    }
  
    */

  return (
    <div>
      {!opensourceData && <p style={{ zIndex: 1000, position: 'absolute', top: 0, left: 0 }}>Loading open source data...</p>}
      {!fieldresearchData && <p style={{ zIndex: 1000, position: 'absolute', top: '15px', left: 0 }}>Loading field research data...</p>}

      <Map
        mapRef={mapRef}
        data={{ opensourceData }}
      />

    </div>
  );
}