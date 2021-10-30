export default class StringUtils {

    static filterKeywords(keywords){
        let blockedKeywords = [
            "react", "reactjs", "rx", "rxjs", "react-component", "react-native-component", "react-native"
        ];

        return keywords.filter(item => !blockedKeywords.includes(item));
    }

    static getRepo(url){
        const regex = /(?:git@|https:\/\/)github.com[:\/](.*)/gm;
        let match = regex.exec(url);

        return match[1];
    }

}
