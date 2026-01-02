export interface GeneratorOptions {
  methods: {
    GET: boolean;
    POST: boolean;
    PUT: boolean;
    DELETE: boolean;
    PATCH: boolean;
  };
  features: {
    includeZod: boolean;
    includeTryCatch: boolean;
    includeComments: boolean;
    dynamicRoute: boolean;
  };
}

export interface GeneratorState extends GeneratorOptions {
  setMethod: (method: keyof GeneratorOptions['methods'], value: boolean) => void;
  setFeature: (feature: keyof GeneratorOptions['features'], value: boolean) => void;
}
