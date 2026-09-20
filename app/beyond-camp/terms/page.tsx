import type { Metadata } from 'next'
import TermsAndConditions from './TermsAndConditions'

export const metadata: Metadata = {
  title: 'Terms and Conditions | Beyond Camp',
  description:
    'The terms that apply to every Beyond Camp programme: our mission and values, fees and payment, and our refund policy.',
}

export default function TermsPage() {
  return <TermsAndConditions />
}