import { useState, useEffect, useRef } from 'react';
import Airtable from 'airtable';

const useAirtable = (baseId, tableName, view) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const recordsRef = useRef([]);

  useEffect(() => {

    // localStorage.removeItem(`${baseId}-${tableName}-records`);
    // return;

    // const storedData = localStorage.getItem(`${baseId}-${tableName}-records`);

    // console.log(storedData);
    // if (storedData) {
    //   setRecords(JSON.parse(storedData));
    //   setLoading(false);
    // } else {
    const fetchData = async () => {
      const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(baseId);

      try {

        let out = [];

        base(tableName).select({
          view: view
        }).eachPage((records, fetchNextPage) => {
          out = out.concat(records);
          fetchNextPage();
        }, err => {
          if (err) {
            console.error('Error:', err);
          }
          setRecords(out);
          setLoading(false);
        });
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
    // }

  }, [baseId, tableName]);

  // useEffect(() => {
  //   console.log(loading);
  //   const storedData = localStorage.getItem(`${baseId}-${tableName}-records`);
  //   if (!loading && !storedData) {
  //     console.log('store', records.length);
  //     localStorage.setItem(`${baseId}-${tableName}-records`, JSON.stringify(records));
  //   }
  // }, [loading]);

  return { records, loading, error };
};

export default useAirtable;
