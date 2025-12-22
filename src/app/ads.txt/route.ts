export async function GET() {
  const content = 'google.com, pub-4234312634957489, DIRECT, f08c47fec0942fa0';
  
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
