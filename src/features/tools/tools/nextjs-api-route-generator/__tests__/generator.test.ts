import { describe, it, expect } from 'vitest';
import { generateApiRoute } from '../lib/generator';
import { GeneratorOptions } from '../model/types';

describe('API Route Generator', () => {
  const defaultOptions: GeneratorOptions = {
    methods: {
      GET: true,
      POST: false,
      PUT: false,
      DELETE: false,
      PATCH: false,
    },
    features: {
      includeZod: false,
      includeTryCatch: false,
      includeComments: false,
      dynamicRoute: false,
    },
  };

  it('generates basic GET request', () => {
    const code = generateApiRoute(defaultOptions);
    expect(code).toContain('export async function GET(request: NextRequest) {');
    expect(code).toContain('NextResponse.json');
  });

  it('includes Zod import when enabled', () => {
    const options = {
      ...defaultOptions,
      features: { ...defaultOptions.features, includeZod: true },
    };
    const code = generateApiRoute(options);
    expect(code).toContain('import { z } from "zod";');
    expect(code).toContain('const bodySchema = z.object');
  });

  it('includes try-catch block when enabled', () => {
    const options = {
      ...defaultOptions,
      features: { ...defaultOptions.features, includeTryCatch: true },
    };
    const code = generateApiRoute(options);
    expect(code).toContain('try {');
    expect(code).toContain('} catch (error) {');
    expect(code).toContain('status: 500');
  });

  it('handles multiple methods', () => {
    const options = {
      ...defaultOptions,
      methods: { ...defaultOptions.methods, POST: true, DELETE: true },
    };
    const code = generateApiRoute(options);
    expect(code).toContain('export async function GET');
    expect(code).toContain('export async function POST');
    expect(code).toContain('export async function DELETE');
  });
});
