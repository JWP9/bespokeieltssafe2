import ContactForm from '../components/ContactForm';

interface ContactProps {
  onNavigate?: (page: string) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <ContactForm isModal={false} onNavigate={onNavigate} />
    </div>
  );
}
