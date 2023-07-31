import type { FC } from 'react';

interface RegisterProps { }

const Register: FC<RegisterProps> = () => {
    return (
        <>
            <div className='w-full h-screen'>
                <div className='w-full h-full flex'>
                    <div className='w-[60%] bg-red-500'>

                    </div>
                    <div className='w-[40%] bg-blue-600'>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
