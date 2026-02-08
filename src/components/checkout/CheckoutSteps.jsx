import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, name: 'Cart', path: '/cart' },
    { id: 2, name: 'Information', path: '/checkout/information' },
    { id: 3, name: 'Shipping', path: '/checkout/shipping' },
    { id: 4, name: 'Payment', path: '/checkout/payment' },
    { id: 5, name: 'Review', path: '/checkout/review' },
  ];

  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-center">
        {steps.map((step, index) => (
          <li key={step.id} className={`relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
            {/* Step Content */}
            <div className="flex items-center">
              {/* Step Number/Icon */}
              {step.id < currentStep ? (
                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
              ) : step.id === currentStep ? (
                <div className="h-8 w-8 rounded-full border-2 border-primary-600 flex items-center justify-center">
                  <Circle className="h-5 w-5 text-primary-600" />
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  <Circle className="h-5 w-5 text-gray-300" />
                </div>
              )}

              {/* Step Name */}
              <div className="ml-4">
                <div className={`text-sm font-medium ${
                  step.id <= currentStep ? 'text-primary-600' : 'text-gray-500'
                }`}>
                  Step {step.id}
                </div>
                <div className={`text-sm font-medium ${
                  step.id <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.name}
                </div>
              </div>
            </div>

            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute top-4 left-8 h-0.5 w-16 sm:w-32 ${
                  step.id < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                }`}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CheckoutSteps;