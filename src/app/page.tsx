import { ThemeToggle } from '@/components/themeToggle';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { SignOut } from './(auth)/login/_components/SignOut';
import Link from 'next/link';

export default async function Home() {

    const session = await auth.api.getSession({
      headers : await headers()
    })
  return (
    <main>
      <h1>Better Auth - Home Page</h1>
      <div className=''>
        {session ? (
          <div>{session.user.name}
          <SignOut/>
          </div>
        ) : (
          <Button variant={'outline'}>
            <Link href={'/login'}>LOGIN</Link>
          </Button>
        )}
      </div>
      <ThemeToggle />
    </main>
  );
}
