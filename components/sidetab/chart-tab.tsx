import React from "react";

type Props = {};
const isData = true;
const ChartTab = (props: Props) => {
  return (
    <div className="p-4">
      {isData ? (
        <p>chart tab</p>
      ) : (
        <p>You have&apos;t uploaded any data for this project.</p>
      )}
    </div>
  );
};

export default ChartTab;
