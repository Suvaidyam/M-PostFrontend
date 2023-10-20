import type { FC } from 'react';
import BodyHead from '../../BodyHead/BodyHead';

interface ApiBodyProps { }

const ApiBody: FC<ApiBodyProps> = () => {
    return (
        <>
            <BodyHead postData={undefined} {...{ title: "Create API" }} />
            <div className='w-full h-full flex items-center justify-center'>
                ApiBody
            </div>
        </>
    );
}

export default ApiBody;
