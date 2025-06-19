'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { GithubIcon, PersonStandingIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';

export const LoginForm = () => {
  const router =  useRouter();
  const [email, setEmail] = useState("")
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed in Successfully with Github');
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      });
    });
  }

  async function signInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: 'sign-in',
        fetchOptions : {
          onSuccess : () => {
           
            router.push(`/verify-request?email=${email}`)
          },
          onError : (e) => {
            toast.error(e.error.message);
          }
        }
      })
    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center text-2xl'>
          Welcome to Better Auth
        </CardTitle>
        <CardDescription>Login with Google or Github</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col space-y-4'>
        <Button className='w-full'>
          <PersonStandingIcon className='size-6' />
          <span>Google</span>
        </Button>

        <Button
          onClick={signInWithGithub}
          disabled={githubPending}
          className='w-full'
        >
          <GithubIcon className='size-6' />
          <span>Github</span>
        </Button>
        <span className='text-center'>OR</span>
        <div className='space-y-3'>
          <Label>Email</Label>
          <Input
          placeholder='test@example.com'
          type='email'
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          />
          <Button
          className='w-full'
          onClick={signInWithEmail}
          disabled={emailPending || email.length < 1}
          >Continue with Email</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// export loginForm;
