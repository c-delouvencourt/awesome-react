import axios from "axios";

export default class GithubAPI {

    static getREADME(repo){
        return axios.get('https://raw.githubusercontent.com/' + repo + '/master/README.md', {transformResponse: undefined});
    }

    static renderReadme(readme){
        return axios.post('https://api.github.com/markdown', {text: readme},{transformResponse: undefined});
    }

}
