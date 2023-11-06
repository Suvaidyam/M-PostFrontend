import { FC, useContext, useState, Fragment } from 'react';
import { MyContext } from '../../../Context/Context';
// =========== Term ==============

interface SteeperProps {
  activeStep: any,
  steps: any
}


const Step = ({ number, active, completed }: any) => {
  return (
    <div className={`relative group ${active ? 'text-blue-500' : 'text-white'}`}>
      <div className={`w-10 h-10 ${completed ? 'bg-blue-600' : 'bg-gray-200'} cursor-default rounded-full flex items-center justify-center transition duration-300`}>
        {completed ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          number
        )}
      </div>
    </div>
  );
};

const Steeper: FC<SteeperProps> = ({ activeStep, steps }) => {
  const { setStatus, setMsg, setError, } = useContext(MyContext);

  return (
    <>
      <div className="w-full max-w-md mx-auto py-2 flex">
        {steps.map((step: any, index: number) => (
          <div key={index} className='flex flex-col'>
            <div className="flex items-center">
              <Step
                number={index + 1}
                active={index === activeStep}
                completed={step.completed}
              />
              <div className={`${index < 2 ? 'block' : 'hidden'} h-1 ${(index) < activeStep ? 'bg-blue-600' : 'bg-gray-200'} w-[100px] sm:w-[200px] self-center`}></div>
            </div>
            <div className="block"><p className='text-black'>{step.title}</p></div>
          </div>
        ))
        }
      </div>
    </>
  );
}

export default Steeper;


