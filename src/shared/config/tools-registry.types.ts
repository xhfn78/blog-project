import React from "react";

export interface ToolRegistration {
  slug: string;
  name: string;
  description: string;
  category: "utility" | "converter" | "generator" | "formatter" | "claude"; 
  tags: string[];
  author: string;
  component?: React.ComponentType<any>; 
  featured?: boolean;
}

export type ToolConfig = Omit<ToolRegistration, 'component'>;