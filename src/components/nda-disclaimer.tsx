import { ShieldIcon } from 'lucide-react';

export default function NdaDisclaimer() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-muted-foreground/20 bg-muted/40 p-4 text-sm text-muted-foreground">
      <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        This project was built for a client engagement under a
        non-disclosure agreement. The client&apos;s name and other
        identifying details have been withheld — the write-up below covers
        the technical work, my role, and the solution architecture only. No
        source code or live demo is shared here for confidentiality reasons.
      </p>
    </div>
  );
}
