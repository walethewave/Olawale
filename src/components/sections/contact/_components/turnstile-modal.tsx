import { Button } from '@/components/ui/button';
import {
  Credenza as Dialog,
  CredenzaContent as DialogContent,
  CredenzaDescription as DialogDescription,
  CredenzaFooter as DialogFooter,
  CredenzaHeader as DialogHeader,
  CredenzaTitle as DialogTitle,
  CredenzaTrigger as DialogTrigger
} from '@/components/ui/credenza';

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useTheme } from 'next-themes';
import { useRef, useState } from 'react';
import { LoaderCircleIcon, RotateCwIcon } from 'lucide-react';

interface TurnstileModalProps {
  open: boolean;
  callback: (token?: string) => void;
}

export function TurnstileModal({ open, callback }: TurnstileModalProps) {
  const { theme } = useTheme();
  const turnstileRef = useRef<TurnstileInstance>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [turnstileStatus, setTurnstileStatus] = useState<
    'success' | 'error' | 'expired' | 'required'
  >('required');

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) callback();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verify Your Identity</DialogTitle>
          <DialogDescription>
            Before submitting the form, we need to confirm that you&apos;re not
            a robot.
          </DialogDescription>
        </DialogHeader>
        <div className="relative flex flex-col py-4 md:py-0">
          <div className={'z-10 px-4 md:px-0'}>
            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onWidgetLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setTurnstileStatus('error');
              }}
              onExpire={() => setTurnstileStatus('expired')}
              options={{
                action: 'submit-form',
                theme: theme === 'light' || theme === 'dark' ? theme : 'auto',
                size: 'flexible'
              }}
              onSuccess={(token) => {
                setTurnstileStatus('success');
                callback(token);
              }}
            />
          </div>
          {isLoading && (
            <div className={'z-1 absolute h-[65px] w-full px-4 md:px-0 md:py-0'}>
              <div
                className={
                  'flex h-[65px] w-full items-center justify-between rounded-md border border-border border-muted-foreground/50 bg-muted px-4'
                }
              >
                <div className={'flex items-center justify-center gap-2'}>
                  <div
                    className={
                      'inline-flex h-[30px] w-[30px] items-center justify-center rounded-full bg-background p-1'
                    }
                  >
                    <LoaderCircleIcon className="h-7 w-7 animate-spin" />
                  </div>
                  Loading
                </div>
                <div>
                  <p className={'max-w-[60px] text-xs font-semibold'}>
                    Cloudflare Turnstile
                  </p>
                </div>
              </div>
            </div>
          )}
          {(turnstileStatus === 'error' || turnstileStatus === 'expired') && (
            <button
              type="button"
              onClick={() => {
                setIsLoading(true);
                setTurnstileStatus('required');
                turnstileRef.current?.reset();
              }}
              className={
                'z-20 mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm text-destructive'
              }
            >
              <RotateCwIcon className="h-4 w-4" />
              {turnstileStatus === 'expired'
                ? 'Verification expired — tap to retry'
                : "Verification failed — tap to retry"}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
