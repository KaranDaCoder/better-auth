"use client"
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

export const SignOut = () => {
  const router = useRouter();
   async function signOut() {
     await authClient.signOut({
       fetchOptions: {
         onSuccess: () => {
           toast.success('Signed Out Successfully')
           router.push('/'); // redirect to login page
         },
       },
     });
   }

  return (
    <Button variant={'destructive'} onClick={signOut}>
      LOGOUT
    </Button>
  );
}

