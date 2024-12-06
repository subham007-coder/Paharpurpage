import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function InitiativeModal({ initiative, onClose }) {
  const [loading, setLoading] = useState(false);

  if (!initiative) return null; // Return null if no initiative is passed

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Background Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        {/* Modal Content */}
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-6 py-8 text-left shadow-lg transition-all sm:max-w-4xl">
                {/* Close Button */}
                <div className="absolute right-4 top-4">
                  <button
                    type="button"
                    className="rounded-full bg-white p-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">Close</span>
                  </button>
                </div>

                {/* Modal Content */}
                <div>
                  {/* Title and Subtitle */}
                  <div className="mb-6">
                    <h2 className="text-[20px] italic text-[#cc6600] mb-[10px] leading-[1.2]">
                      {initiative.title}<br />
                      <span>{initiative.subtitle}</span>
                    </h2>
                  </div>

                  {/* Location and Description */}
                  <div className="text-gray-800 mb-6">
                    <p className="font-bold mb-2">Location – {initiative.location}</p>
                    <p className="mb-4">
                      <span className="font-bold">{initiative.tagline}</span>
                      <br />
                      {initiative.fullDescription || initiative.description}
                    </p>
                  </div>

                  {/* Images */}
                  <div>
                    {/* Main Image */}
                    <div className="mb-6">
                      <img
                        src={initiative.mainImage}
                        alt={initiative.title}
                        className="w-full h-[400px] rounded-lg shadow-md object-cover"
                      />
                    </div>

                    {/* Gallery */}
                    {initiative.gallery && initiative.gallery.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {initiative.gallery.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${initiative.title} gallery ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg shadow-sm"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default InitiativeModal;
