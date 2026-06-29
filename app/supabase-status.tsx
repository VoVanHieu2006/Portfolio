export default function SupabaseStatus() {
  // Check if environment variables are configured
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  const isConfigured = !!(url && key && 
    !url.includes('[INSERT') && 
    !key.includes('[INSERT') &&
    !url.startsWith('https://example') &&
    !key.startsWith('[INSERT'));

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-amber-800 mb-3">
        Supabase Configuration Status
      </h3>
      
      {!isConfigured ? (
        <div>
          <p className="text-amber-700 mb-4">
            ❌ Supabase is not properly configured. This is causing the fetch error.
          </p>
          
          <div className="bg-white rounded p-4 font-mono text-sm mb-4">
            <div>NEXT_PUBLIC_SUPABASE_URL = {url}</div>
            <div>NEXT_PUBLIC_SUPABASE_ANON_KEY = {key ? '***' + key.slice(-10) : 'NOT SET'}</div>
          </div>
          
          <p className="text-sm text-amber-600 mb-2">
            The error <code className="bg-gray-200 px-1 rounded">hnzjinaurvzmhvkhsekp.supabase.co</code> 
            suggests these placeholder values are being used.
          </p>
          
          <p className="text-sm text-amber-600 mb-2">
            Please update your <code className="bg-gray-200 px-1 rounded">.env.local</code> file with your actual:
          </p>
          
          <div className="bg-gray-100 rounded p-3 text-sm mt-3">
            <div className="font-semibold mb-2">Copy these from your Supabase project:</div>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Go to <a href="https://supabase.com/dashboard" className="text-blue-600 hover:underline">https://supabase.com/dashboard</a></li>
              <li>Select your project</li>
              <li>Go to Settings → API</li>
              <li>Copy the <code className="bg-white px-1 rounded">Project URL</code></li>
              <li>Copy the <code className="bg-white px-1 rounded">anon key</code></li>
            </ol>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-green-700 mb-2">
            ✅ Supabase is configured correctly!
          </p>
          <p className="text-sm text-green-600">
            URL: {url}
          </p>
        </div>
      )}
    </div>
  );
}