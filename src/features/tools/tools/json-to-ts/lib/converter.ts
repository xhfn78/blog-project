export type ConversionOptions = {
  rootName: string;
  useTypeAlias: boolean;
  generateZod: boolean;
};

export function convertJsonToTs(jsonString: string, options: ConversionOptions): string {
  try {
    const json = JSON.parse(jsonString);
    const interfaces: string[] = [];
    const zodSchemas: string[] = [];
    const NEW_LINE = String.fromCharCode(10);
    
    // Helper to capitalize first letter
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    // Recursively parse and generate types
    function parse(obj: any, name: string): string {
      if (obj === null) return 'null';
      if (typeof obj === 'undefined') return 'undefined';
      if (typeof obj === 'string') return 'string';
      if (typeof obj === 'number') return 'number';
      if (typeof obj === 'boolean') return 'boolean';
      
      if (Array.isArray(obj)) {
        if (obj.length === 0) return 'any[]';
        // Check if all items are same type
        const firstType = parse(obj[0], name); // Keep name singular?
        // Simple check: assume array is uniform for now
        // For objects in array, we want to extract the interface
        if (typeof obj[0] === 'object' && obj[0] !== null) {
             const interfaceName = capitalize(name) + 'Item';
             parse(obj[0], interfaceName); // recursive call to generate interface
             return `${interfaceName}[]`;
        }
        return `${firstType}[]`;
      }

      if (typeof obj === 'object') {
        const interfaceName = capitalize(name);
        const entries: string[] = [];
        const zodEntries: string[] = [];
        
        Object.entries(obj).forEach(([key, value]) => {
          const type = parse(value, key);
          
          // TS Interface Key
          // If key has spaces or special chars, quote it
          const validKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
          entries.push(`  ${validKey}: ${type};`);

          // Zod Schema Key
          if (options.generateZod) {
             let zodType = 'z.any()';
             if (type === 'string') zodType = 'z.string()';
             else if (type === 'number') zodType = 'z.number()';
             else if (type === 'boolean') zodType = 'z.boolean()';
             else if (type === 'null') zodType = 'z.null()';
             else if (type.endsWith('[]')) {
                 const baseType = type.slice(0, -2);
                 if (['string', 'number', 'boolean'].includes(baseType)) {
                     zodType = `z.array(z.${baseType}())`;
                 } else {
                     // Array of objects
                     zodType = `z.array(${baseType}Schema)`;
                 }
             } else {
                 // Object reference
                 zodType = `${type}Schema`;
             }
             zodEntries.push(`  ${validKey}: ${zodType},`);
          }
        });

        // Add to extracted interfaces if not already added (simple dedupe by name might be needed)
        // For this simple version, we just append.
        
        const typeKeyword = options.useTypeAlias ? 'type' : 'interface';
        const separator = options.useTypeAlias ? ' = ' : ' ';
        
        interfaces.push(
`${typeKeyword} ${interfaceName}${separator}{
${entries.join(NEW_LINE)}
}
${options.useTypeAlias ? ';' : ''}`
        );

        if (options.generateZod) {
            zodSchemas.push(
`export const ${interfaceName}Schema = z.object({
${zodEntries.join(NEW_LINE)}
});`
            );
        }

        return interfaceName;
      }

      return 'any';
    }

    parse(json, options.rootName);

    let result = interfaces.reverse().join(NEW_LINE + NEW_LINE); // Reverse so dependent types come first usually
    
    if (options.generateZod) {
        result += NEW_LINE + NEW_LINE + '// --- Zod Schemas ---' + NEW_LINE + 'import { z } from "zod";' + NEW_LINE + NEW_LINE + zodSchemas.reverse().join(NEW_LINE + NEW_LINE);
    }

    return result;

  } catch (e) {
    return `Error: Invalid JSON\n${(e as Error).message}`;
  }
}