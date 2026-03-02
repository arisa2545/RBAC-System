import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function GlobalAuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleAuthError = (event: Event) => {
      const customEvent = event as CustomEvent<{ status: number }>;
      setErrorStatus(customEvent.detail.status);
      setIsOpen(true);
    };

    window.addEventListener('auth-error', handleAuthError);
    return () => window.removeEventListener('auth-error', handleAuthError);
  }, []);

  const handleClose = () => {
    setIsOpen(false);

    if (errorStatus === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('profile');
      queryClient.clear();
      navigate({ to: '/login' });
    } else if (errorStatus === 403) {
      navigate({ to: '/dashboard' });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-700 font-extrabold">
            {errorStatus === 401 ? 'Session Expire!' : 'Permission not Allow!'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {errorStatus === 401 
              ? 'กรุณาเข้าสู่ระบบใหม่อีกครั้งเพื่อความปลอดภัย'
              : 'คุณไม่มีสิทธิ์ในการเข้าถึงข้อมูลหรือจัดการส่วนนี้'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClose} className='cursor-pointer'>
            {errorStatus === 401 
              ? 'Go to Login Page'
              : 'Go to Dashboard Page'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}