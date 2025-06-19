'use client';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { authClient } from '@/lib/auth-client';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';


function SuspenseVerifyRequest() {
 const router = useRouter();
  const [otp, setOtp] = useState('');
  const [emailVerify, startEmailVerifyTransition] = useTransition();
  const params = useSearchParams();
  const email = params.get('email') as string;
  const isCompleted = otp.length === 6;

  function verifyOtp() {
    startEmailVerifyTransition(async () => {
      await authClient.signIn.emailOtp({
        email: email,
        otp: otp,
        fetchOptions: {
         onSuccess : () => {
          toast.success('Signed in Successfully with Email');
          router.push('/')
         },
         onError : (e) => {
          toast.error(e.error.message)
         }
        }
      });
    });
  }
  return (
    <div className=''>
      <Suspense>

      <InputOTP value={otp} onChange={(value) => setOtp(value)} maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button disabled={emailVerify || !isCompleted} onClick={verifyOtp}>
        Verify
      </Button>
      </Suspense>
    </div>
  );
};



function VerifyRequest() {
    return (
      <Suspense>
        <SuspenseVerifyRequest/>
      </Suspense>
    )
}
export default VerifyRequest;
