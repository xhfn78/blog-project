"use client";

import { Suspense, LazyExoticComponent } from "react";
import React from 'react';

interface ClientToolRendererProps {
  ToolComponent: LazyExoticComponent<() => React.JSX.Element>; // JSX.Element -> React.JSX.Element
}

export default function ClientToolRenderer({ ToolComponent }: ClientToolRendererProps) {
  return (
    <Suspense fallback={<div>Loading tool...</div>}>
      <ToolComponent />
    </Suspense>
  );
}
