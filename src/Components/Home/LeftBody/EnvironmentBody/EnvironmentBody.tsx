import { FC, useContext, useState, useEffect } from 'react';
import { MyContext } from '../../../../Context/Context';
import http from '../../../../Service/http';
import { array } from 'yargs';
import BodyHead from '../../BodyHead/BodyHead';

interface EnvironmentBodyProps { }

const EnvironmentBody: FC<EnvironmentBodyProps> = () => {
    const [newEnvironment, setNewEnvironment] = useState<any>([]);
    const global_variable = newEnvironment?.filter((e: { name: string; }) => e.name === 'Globals');
    const local_variable = newEnvironment?.filter((e: { name: string; }) => e.name !== 'Globals');
    const { setLoader } = useContext(MyContext);

    // Get Environment Data
    const getData = () => {
        setLoader(true)
        let workSpace_Id = JSON.parse(localStorage.getItem('workSpace') ?? '');
        http({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/environment/${workSpace_Id?._id}`,
        })
            .then((res) => {
                console.log(res)
                // setTimeout(() => {
                //     setLoader(false);
                // }, 1000);
                setNewEnvironment(res.data.environment);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // 

    const postData = () => {
        let workSpace_Id = JSON.parse(localStorage.getItem('workSpace') ?? '');
        http({
            url: `${process.env.REACT_APP_BASEURL}/environment`,
            method: "post",
            data: {
                name: 'New Environment',
                workspace_id: workSpace_Id._id
            }
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            });
    };

    useEffect(() => {
        return () => {
            getData();
        }
    }, [])


    return (
        <>
            <BodyHead {...{ postData, title: "Create environment" }}/>
        </>
    );
}

export default EnvironmentBody;
