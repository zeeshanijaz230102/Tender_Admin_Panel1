import React, { Component, Fragment } from "react";
import Modal from "react-modal";
import FAQTable from "./FAQTable";
import SaveFAQModal from "./SaveFAQModal";
import { billingApiServices } from '../../services/BillingApiService';
import "./FAQ.css";


class FAQDetails extends Component {
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

  getFAQDetails() {
    billingApiServices
      .getAllFAQs()
      .then((response) => {

        this.setState({ gridData: response?.data?.data, loading: false });
      });
  }

  componentDidMount() {
    this.getFAQDetails();
  }


  reloadData = () => {
    this.setState({ loading: true })
    this.getFAQDetails();
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
    return (
      <>
        <div style={{ textAlign: "end", marginTop: '5px' }}>
          <button id="new-report" className="btn-style"
            onClick={() => this.setState({ showModal: true })} > Add New
          </button>
        </div>
        <FAQTable
          gridData={this.state.gridData}
          loading={this.state.loading}
          reloadData={() => this.reloadData()}
        />

        {this.state.showModal && (
          <SaveFAQModal
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
      </>
    );
  }
}

export default FAQDetails;