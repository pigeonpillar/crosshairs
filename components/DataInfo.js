export const DataInfo = ({
  features
}) => {

  if (features.length === 0) return null;

  return <div style={{ backgroundColor: 'white', position: 'absolute', top: 0, right: 0, bottom: 0, width: '200px', zIndex: 1000 }}>
    {features.map(feature => <div key={feature.properties.id} style={{ fontSize: '10px', width: '200px', margin: '10px' }}>{feature.properties.description}</div>)}
  </div>;


};