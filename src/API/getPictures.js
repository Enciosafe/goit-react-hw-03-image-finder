import axios from "axios";

const API_KEY = '21129448-e17c8b1f4b436f5a4360c1592'
const URL = 'https://pixabay.com/api/'


const fetchOn = ({queryWord = '', pageNumber = 1, itemsPerPage = 12}) => {
    return axios.get
    (`${URL}?q=${queryWord}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${itemsPerPage}`)
        .then(response => response.data)
}

export default {fetchOn}