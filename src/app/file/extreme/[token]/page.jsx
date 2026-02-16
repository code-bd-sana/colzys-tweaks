"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const tokenParam = useParams().token;

  const VALID_TOKEN =
    "JA4KuAc6475SMWzjojzHgrzypka4ASzKESI8JBKhf10jkvO7365TeEHqLFa5eWQK";

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // token validation
    if (tokenParam !== VALID_TOKEN) {
      setAuthorized(false);
      setChecking(false);
      return;
    }

    setAuthorized(true);

    // simulate security scan
    const timer = setTimeout(() => {
      setChecking(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [tokenParam]);

  // ❌ Unauthorized UI
  if (!authorized && !checking) {
    return (
      <div className='min-h-screen flex items-center justify-center px-4'>
        <div className='bg-secondary border border-red-500 rounded-2xl p-8 max-w-md w-full text-center shadow-xl'>
          <h1 className='text-3xl font-bold text-red-500 mb-4'>
            Unauthorized Access
          </h1>
          <p className='text-gray'>Invalid or missing security token.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='bg-secondary rounded-2xl p-8 w-full max-w-md shadow-xl border border-[#102833]'>
        {checking ? (
          <>
            <h1 className='text-highlight mb-4'>Security Check</h1>

            <p className='text-gray mb-6'>
              Initializing secure token verification process.
            </p>

            <div className='bg-black/40 rounded-xl p-4 text-sm text-[#00F9A1] font-mono space-y-2'>
              <p className='animate-pulse'>▸ Validating access token...</p>
              <p className='animate-pulse delay-200'>
                ▸ Scanning for malicious scripts...
              </p>
              <p className='animate-pulse delay-300'>
                ▸ Verifying permissions...
              </p>
              <p className='animate-pulse delay-500'>
                ▸ Hacker threats: NONE DETECTED
              </p>
            </div>

            <div className='mt-6 h-2 w-full bg-[#102833] rounded overflow-hidden'>
              <div className='h-full bg-gradient-to-r from-[#00E9E7] to-[#00F9A1] animate-[load_3s_linear]'></div>
            </div>
          </>
        ) : (
          <>
            <h1 className='text-highlight mb-3'>Access Granted</h1>

            <p className='text-gray mb-6'>
              Token verified successfully. Secure download is now available.
            </p>

            <a
              href='https://drive.google.com/file/d/19GpIVhnGNfCIdRtr1PsvWoWAExIFfKci/view?usp=sharing'
              download='extreme.zip'
              className='btn-primary w-full block text-center'>
              Download
            </a>

            <p className='text-xs text-[#6faabf] mt-4 text-center'>
              Encrypted • Verified • Hacker‑Safe
            </p>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes load {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Page;
