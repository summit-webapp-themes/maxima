import React from 'react';

interface Props {
  value: any;
}

const IndianNumber: React.FC<Props> = ({ value }) => {
  const formattedValue = value?.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    useGrouping: true,
  });

  return <span>{formattedValue}</span>;
};

export default IndianNumber;