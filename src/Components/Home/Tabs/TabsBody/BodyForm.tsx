import { useContext, type FC, useEffect } from 'react';
import { MyContext } from '../../../../Context/Context';
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

interface BodyFromProps { }

const BodyFrom: FC<BodyFromProps> = () => {
    const { tabData, setJsonText, currentActive ,formData} = useContext(MyContext);
    const locTabList = JSON.parse(localStorage.getItem('tabsList') as string)
    const activeData = locTabList.filter((e: any) => e._id === currentActive)
    const data = tabData?.details?.body || activeData[0]?.details?.body;
    const myTheme = createTheme({
        theme: 'light',
        settings: {},
        styles: [
            { tag: [t.string, t.special(t.brace)], color: '#CD4B16' }
        ]
    });

    useEffect(() => {
        return () => {
            setJsonText(data);
        }
    }, [])

    const handleChange = (newCode: string) => {
        try {
            let newCodee = JSON.parse(newCode);
            setJsonText(newCodee);
        } catch (error) { }
    };

    return (
        <div className=" mb-2 font-mono  scrollbar-hide  bg-white  ">
            <CodeMirror
                theme={myTheme}
                height="127px"
                value={JSON.stringify(data, 0 as any, 3)}
                extensions={[javascript({ jsx: true })] as any}
                onChange={handleChange}
                
            />
        </div>
    );
}

export default BodyFrom;


