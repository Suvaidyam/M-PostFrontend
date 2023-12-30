import { type FC, useContext } from 'react';
import { MyContext } from '../../../Context/Context';
import CollectionBody from './CollectionBody/CollectionBody';
import ApiBody from './ApiBody/ApiBody';
import EnvironmentBody from './EnvironmentBody/EnvironmentBody';
import HistoryBody from './HistoryBody/HistoryBody';

interface LeftBodyProps { }

const LeftBody: FC<LeftBodyProps> = () => {
    const { currentNav } = useContext(MyContext);
    return (
        <>
            {/* <BodyHead /> */}
            {currentNav === "Collection" && <CollectionBody />}
            {currentNav === "APIs" && <ApiBody />}
            {currentNav === "Environment" && <EnvironmentBody />}
            {currentNav === "History" && <HistoryBody />}
        </>
    );
}

export default LeftBody;
