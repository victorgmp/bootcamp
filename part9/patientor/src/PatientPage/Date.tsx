import React from 'react';

interface DateProps {
  children: React.ReactNode;
}

const Date: React.FC<DateProps> = ({ children }) => (
  <span>{children}</span>
);

export default Date;
