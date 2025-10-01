import { useState } from 'react';
import BookingForm from '../components/BookingForm';
import { useRouter } from 'next/router';

const BookingPage: React.FC = () => {
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const router = useRouter();

  const handleBookingSuccess = () => {
    setIsBookingConfirmed(true);
    // Optionally redirect or show a success message
    // router.push('/some-success-page');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Book Your Appointment</h1>
      {isBookingConfirmed ? (
        <div className="text-green-500">Your booking has been confirmed!</div>
      ) : (
        <BookingForm onBookingSuccess={handleBookingSuccess} />
      )}
    </div>
  );
};

export default BookingPage;