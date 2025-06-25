// import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
// import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
// import { ZoneContextManager } from '@opentelemetry/context-zone';
// import { registerInstrumentations } from '@opentelemetry/instrumentation';
// import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
// import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
// import { resourceFromAttributes } from '@opentelemetry/resources';
// import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
// import { trace } from '@opentelemetry/api';

// export class TracingService {
//   static initTracing(): void {
//     const exporter = new OTLPTraceExporter({
//       url: 'http://localhost:4318/v1/traces',
//     });

//     const resource = resourceFromAttributes({
//       [ATTR_SERVICE_NAME]: 'angular-frontend'
//     });

//     const provider = new WebTracerProvider({ resource });

//     (provider as any).addSpanProcessor(new BatchSpanProcessor(exporter));

//     provider.register({
//       contextManager: new ZoneContextManager(),
//     });
//      const tracer = trace.getTracer('angular-tracer');
//      const span = tracer.startSpan('angular-frontend-manual-test-span');
//     setTimeout(() => {
//       span.end(); //  Very important: without .end(), it will not be exported
//       console.log('[OTEL] Manual span ended');
//     }, 2000);


//     registerInstrumentations({
//       instrumentations: [
//         new FetchInstrumentation({
//           ignoreUrls: [/localhost:4200\/assets/],
//         }),
//         new XMLHttpRequestInstrumentation(),
//       ],
//     });

//     console.log('[OTEL] Tracing initialized');
//   }
// }

import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { resourceFromAttributes } from '@opentelemetry/resources';

export class TracingService {
  static initTracing(): void {
    const exporter = new OTLPTraceExporter({
      // Tempo exposes the OTLP HTTP receiver on port 4318 by default. The
      // exporter was mistakenly configured to use port 8080, which does not
      // accept trace data. Update the endpoint so traces are sent to Tempo.
      url: 'http://localhost:4318/v1/traces',
    });

     const resource = resourceFromAttributes({
      [ATTR_SERVICE_NAME]: 'angular-frontend'
    });
    const provider = new WebTracerProvider({
      spanProcessors: [new BatchSpanProcessor(exporter)],
    });

    provider.register({
      contextManager: new ZoneContextManager(),
    });

    registerInstrumentations({
      instrumentations: [
        new FetchInstrumentation(),
        new XMLHttpRequestInstrumentation(),
      ],
    });

    console.log(' OpenTelemetry tracing initialized (no deprecation)');
  }
}
