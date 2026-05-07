/// <reference path="../.astro/types.d.ts" />

// Define types for Astro.locals (used by middleware)
declare namespace App {
  interface Locals {
    requestId: string;
    requestTime: number;
    user: {
      id: string;
      name: string;
      role: 'admin' | 'user' | 'guest';
    };
  }
}