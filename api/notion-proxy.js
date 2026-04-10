/**
 * Vercel Serverless Function: Notion API Proxy
 *
 * Routes all Notion API requests through this backend endpoint to avoid CORS issues.
 * The client (browser) sends: { apiKey, notionPath, method, body }
 * This function proxies to Notion's API server-side.
 *
 * Usage:
 *   POST /api/notion-proxy
 *   Body: { apiKey: "secret_...", notionPath: "/databases/{id}/query", method: "POST", body: {...} }
 */

export default async function handler(req, res) {
  // Only POST requests allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { apiKey, notionPath, method = 'GET', body } = req.body;

  // Validate required fields
  if (!apiKey || !notionPath) {
    return res.status(400).json({
      error: 'Missing required fields: apiKey, notionPath',
    });
  }

  try {
    // Fetch from Notion API server-side (no CORS issues)
    const notionRes = await fetch(`https://api.notion.com/v1${notionPath}`, {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // Parse response
    const data = await notionRes.json();

    // Return Notion's response status and data back to client
    return res.status(notionRes.status).json(data);
  } catch (error) {
    console.error('[notion-proxy] Error:', error);
    return res.status(500).json({
      error: 'Failed to proxy request to Notion API',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
