import React, { Component, Fragment } from "react";
import Modal from "react-modal";
import CategoriesTable from "./CategoriesTable";
import SaveCategoryModal from "./SaveCategoryModal";
import { billingApiServices } from '../../services/BillingApiService';


class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorySearch: "",
      showModal: false,
      gridData: [],
      interface: "",
      loading: true,
      activeTab: 1,
      clearSearch: false,
    };

  }

  getCatgeoriesDetails() {
    billingApiServices
      .getCategoriesDetails()
      .then((response) => {

        this.setState({ gridData: response?.data?.data, loading: false });
      });
  }

  componentDidMount() {
    this.getCatgeoriesDetails();
  }


  reloadData = () => {
    this.setState({ loading: true })
    this.getCatgeoriesDetails();
  }

  getShowModal = (modal) => {
    this.setState({ showModal: modal });
  };

  categoryData = (categories_data) => {
    this.setState({
      gridData: categories_data,
    });
  };

  render() {
    Modal.setAppElement("#root");
    return (
      <Fragment>


        <div className="d-flex justify-content-start " style={{  marginTop: "5px"  }}>
          <button id="new-report" className="btn-style position-relative z-1 p-2 d-flex align-items-center gap-1"
            onClick={() => this.setState({ showModal: true })} > 
             <i className="fa-regular fa-circle-plus" style={{fontSize:"20px"}}></i> Add New
          </button>
        </div>


        <CategoriesTable
          gridData={this.state.gridData}
          loading={this.state.loading}
          reloadData={() => this.reloadData()}
        />

        {this.state.showModal && (
          <SaveCategoryModal
            modalopen={this.state.showModal}
            isEditMode={false}
            categoryData={(categories_data) =>
              this.categoryData(categories_data)
            }
            onClose={() =>
              this.setState({ showModal: false })
            }
            reloadData={() => this.reloadData()}
          />
        )}
      </Fragment>
    );
  }
}

export default Categories;
