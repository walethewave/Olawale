import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.'
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.'
    }),
  email: z
    .string({
      required_error: 'Please enter a valid email.'
    })
    .email(),
  message: z.string().max(380).min(4)
});

export type ContactForm = z.infer<typeof ContactFormSchema>;

export const ContactActionSchema = ContactFormSchema.extend({
  // Optional: only required when Turnstile is configured (see contactSubmit's middleware).
  token: z.string().optional()
});

export type ContactAction = z.infer<typeof ContactActionSchema>;
