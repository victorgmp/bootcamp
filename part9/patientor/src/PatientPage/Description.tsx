import React from 'react';

interface DescriptionProps {
  children: React.ReactNode;
}

const Description: React.FC<DescriptionProps> = ({ children }) => (
  <span>{children}</span>
);

export default Description;
