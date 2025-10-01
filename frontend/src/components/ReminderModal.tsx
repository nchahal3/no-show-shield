import React from 'react';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    date: string;
    time: string;
    customerName: string;
  };
}

const ReminderModal: React.FC<ReminderModalProps> = ({ isOpen, onClose, bookingDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Reminder</h2>
        <p className="mt-4">You have an upcoming booking:</p>
        <p className="mt-2">Customer: {bookingDetails.customerName}</p>
        <p className="mt-2">Date: {bookingDetails.date}</p>
        <p className="mt-2">Time: {bookingDetails.time}</p>
        <div className="mt-4 flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => {
              // Logic to handle rescheduling
              onClose();
            }}
          >
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;