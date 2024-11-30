export async function fetchAirtable(baseId, tableName) {

  const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;

  const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

  let allRecords = [];
  let offset = null;

  try {
    do {
      const res = await fetch(`${url}?${offset ? `offset=${offset}&` : ''}pageSize=100`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch data from ${tableName}: ${res.statusText}`);
      }

      const data = await res.json();
      allRecords = allRecords.concat(data.records);

      // Airtable pagination
      offset = data.offset || null;
    } while (offset);

  } catch (error) {
    console.error(`Error fetching data from Airtable table "${tableName}":`, error);
  }

  return allRecords;
}
