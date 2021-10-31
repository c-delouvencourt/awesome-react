import axios from "axios";

export default class NpmAPI {

    static getPackages(page){
        return axios.get('https://api.npms.io/v2/search?q=react-component+not:deprecated,insecure+keywords:-react-native+keywords:-vue+keywords:-angular+boost-exact:false&from=' + (100 * page) + '&size=' + 100);
    }

    static getPackageInfo(name){
        let strLink = name.replace('https://www.npmjs.com/package/', '');

        return axios.get('https://api.npms.io/v2/package/' + strLink);
    }

    static searchPackage(search){
        return axios.get('https://api.npms.io/v2/search?q=' + search + '+not:deprecated,insecure+keywords:-react-native+keywords:-vue+keywords:-angular+boost-exact:false&size=' + 100);
    }

}
