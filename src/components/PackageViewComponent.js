import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Spinner,
    useColorModeValue,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import NpmAPI from "../api/npmAPI";
import GithubAPI from "../api/GithubAPI";
import "../styles/Markdown.css";
import "../styles/Markdown_dark.css";

export default function PackageViewComponent(props) {

    const [loading, setLoading] = useState(true);
    const [packageInfo, setPackageInfo] = useState(undefined);
    const [readMe, setReadMe] = useState('');

    useEffect(() => {
        NpmAPI.getPackageInfo(props.package.links.npm).then(r => {
            setPackageInfo(r.data);
            GithubAPI.renderReadme(r.data.collected.metadata.readme).then(r => {
                setLoading(false);
                setReadMe(r.data);
            }).catch(e => {
                setLoading(false);
                setReadMe("<p>ReadMe not available !</p>");
            })
        });
    }, []);

    let markdownCSS = useColorModeValue("markdown-body", "markdown-body-dark");

    return (
        <Drawer
            isOpen={props.isOpen}
            placement="bottom"
            onClose={props.onClose}
            isFullHeight
        >
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader>{props.package.name}</DrawerHeader>

                <DrawerBody>
                    {loading ? (
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Spinner/>
                        </div>
                    ) : (
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <div dangerouslySetInnerHTML={{__html: readMe}} className={markdownCSS}></div>
                        </div>
                    )}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}
