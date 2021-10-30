import './styles/App.css';
import Nav from "./components/NavComponent";
import {Spinner, Text, useColorModeValue, useDisclosure, VStack} from "@chakra-ui/react";
import LibraryComponent from "./components/LibraryComponent";
import {useEffect, useState} from "react";
import NpmAPI from "./api/npmAPI";
import InfiniteScroll from "react-infinite-scroll-component";
import PackageViewComponent from "./components/PackageViewComponent";

function App() {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [packages, setPackages] = useState([]);
    const [packagesNumber, setPackagesNumber] = useState(0);

    // Modal Package view
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [packageSelected, setPackageSelected] = useState(undefined);

    useEffect(() => {
        NpmAPI.getPackages(page).then(r => {
            setPackages(r.data.results);
            setPackagesNumber(r.data.total);
            setLoading(false);
        });
    }, []);

    let textColor = useColorModeValue('grey.400', 'grey.400');

    return (
        <div className="App">
            <Nav onSearch={(t) => {
                setLoading(true);
                if(t == ''){
                    NpmAPI.getPackages(page).then(r => {
                        setPackages(r.data.results);
                        setPackagesNumber(r.data.total);
                        setLoading(false);
                    });
                }else{
                    NpmAPI.searchPackage(t).then(r => {
                        setPackages(r.data.results);
                        setPackagesNumber(r.data.total);
                        setLoading(false);
                    });
                }
            }} isLoading={loading}/>

            <div style={{paddingTop: 75}}>
                {!loading && (
                    <Text fontSize="sm" textColor={textColor}>Approximately {packagesNumber} results</Text>
                )}

                <InfiniteScroll
                    dataLength={packages.length}
                    next={() => {
                        NpmAPI.getPackages(page + 1).then(r => {
                            setPackages([...packages, ...r.data.results]);
                            setPage(page + 1);
                        });
                    }}
                    hasMore={true}
                    loader={<Spinner marginTop={10} />}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all 🥱</b>
                        </p>
                    }
                >
                    {packages.map((p, k) => (
                        <LibraryComponent key={k} package={p} onClick={() => {
                            setPackageSelected(p.package);
                            onOpen()
                        }}/>
                    ))}
                </InfiniteScroll>
            </div>

            {packageSelected !== undefined && (
                <PackageViewComponent onOpen={onOpen} onClose={() => {
                    onClose();
                    setTimeout(() => {
                        setPackageSelected(undefined);
                    }, 200);
                }} isOpen={isOpen} package={packageSelected}/>
            )}
        </div>
    );
}

export default App;
