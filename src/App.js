import React from "react";
import s from "./App.module.css"
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Loader from "react-loader-spinner";
import fetchOn from "./API/getPictures";
import PropTypes from "prop-types";


export default class App extends React.Component {

  state = {
    isLoading: false,
    showModal: false,
    queryWord: '',
    itemsPerPage: 12,
    pageNumber: 1,
    bigPicUrl: '',
    data: []
  }

  getData = async () => {
    const { queryWord, pageNumber, itemsPerPage } = this.state;
    const options = { queryWord, pageNumber, itemsPerPage };
    try {
      this.setState({ isLoading: true });
      const data = await fetchOn(options);
      this.setState((prevState) => ({
        data: [...prevState.data, ...data.hits],
        smallPickList: data.hits.map((hit) => hit.webformatURL),
        pageNumber: prevState.pageNumber + 1,
      }));
    } catch (error) {
      throw(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toggleModal = () => {
    this.setState (({ showModal }) => ({
      showModal: !showModal,
    }))
  }

  openModal = (e) => {
    e.preventDefault()
    let imgObj = {}
    const targetEl = e.target
    if (targetEl.nodeName === 'IMG') {
      imgObj = this.state.data.find(({webformatURL}) => webformatURL === e.target.src )
    }
    this.setState(() => ({
      bigPickUrl: imgObj.largeImageURL
    }))
    this.toggleModal()
  }


  handleChange = e => {
    const { value } = e.currentTarget
    this.setState({queryWord: value, pageNumber: 1, data: []})
  }

  onSearch = e => {
    e.preventDefault()
    this.setState({[this.state.queryWord]: e.currentTarget.value})
    this.getData()
  }

  loadMoreButton = async (e) => {
    e.preventDefault();
    await this.getData();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };


  render () {
    const {showModal, isLoading} = this.state
    return <div className={s.app}>
      <Searchbar handleChange={this.handleChange}
                 onSearch={this.onSearch}
                 state={this.state}/>
      {isLoading && <div className={s.loader}>
        <Loader
            type="Puff"
            color="#3f51b5"
            height={100}
            width={100}
            timeout={1000} //3 secs
        />
      </div>}

      <ImageGallery state={this.state}
                    toggleModal={this.toggleModal} openModal={this.openModal}/>

      {showModal && <Modal onClose={this.toggleModal}
                           data={this.state.data}
                           bigPickUrl={this.state.bigPickUrl}>
      </Modal>}

      {this.state.data.length > 0
      && !this.state.isLoading
      && <Button loadMoreButton={this.loadMoreButton}/>}
    </div> ;
  }
}

App.propTypes = {
  bigPickUrl: PropTypes.string,
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
  )
};

