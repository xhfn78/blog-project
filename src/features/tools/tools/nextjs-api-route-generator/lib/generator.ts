import { GeneratorOptions } from '../model/types';

export function generateApiRoute(options: GeneratorOptions): string {
  const imports = ['import { NextRequest, NextResponse } from "next/server";'];
  if (options.features.includeZod) {
    imports.push('import { z } from "zod";');
  }

  const parts: string[] = [];
  
  // Imports
  parts.push(imports.join('\n'));
  parts.push('');

  // Zod Schema (if enabled)
  if (options.features.includeZod) {
    parts.push('// Request Body Validation Schema');
    parts.push('const bodySchema = z.object({');
    parts.push('  // TODO: Define your schema here');
    parts.push('  name: z.string(),');
    parts.push('  email: z.string().email(),');
    parts.push('});');
    parts.push('');
  }

  // Methods
  Object.entries(options.methods).forEach(([method, enabled]) => {
    if (!enabled) return;

    if (options.features.includeComments) {
      parts.push(`// GET /api/resource` + (options.features.dynamicRoute ? '/[id]' : ''));
    }

    const paramsArg = options.features.dynamicRoute 
      ? ', { params }: { params: { id: string } }' 
      : '';

    parts.push(`export async function ${method}(request: NextRequest${paramsArg}) {`);
    
    if (options.features.includeTryCatch) {
      parts.push('  try {');
    }

    const indent = options.features.includeTryCatch ? '    ' : '  ';

    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      parts.push(`${indent}const body = await request.json();`);
      
      if (options.features.includeZod) {
        parts.push(`${indent}const validatedData = bodySchema.parse(body);`);
      }
    }

    if (options.features.dynamicRoute) {
       parts.push(`${indent}const id = params.id;`);
    }

    parts.push(`${indent}// TODO: Implement your logic here`);
    
    parts.push(`${indent}return NextResponse.json({ success: true, message: "${method} request processed" });`);

    if (options.features.includeTryCatch) {
      parts.push('  } catch (error) {');
      parts.push('    return NextResponse.json(');
      parts.push('      { success: false, error: "Internal Server Error" },');
      parts.push('      { status: 500 }');
      parts.push('    );');
      parts.push('  }');
    }

    parts.push('}');
    parts.push('');
  });

  return parts.join('\n');
}
