import React from "react";

const HomePage = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
      <div className="bg-primary-foreground rounded-lg p-4">1</div>
      <div className="bg-primary-foreground rounded-lg p-4">2</div>
      <div className="bg-primary-foreground rounded-lg p-4">3</div>
      <div className="bg-primary-foreground rounded-lg p-4">4</div>
    </div>
  );
};

export default HomePage;
